const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    listUserCourses,
    createUserNotification,
    deleteUserNotification, findUserById
} = require('../handlers/user')
const { body, param } = require('express-validator')
const { handleInputErrors } = require('../modules/middleware')
const prisma = require('../modules/database')
const {
    deleteNotificationByIds,
    listNotificationsByUserId,
    createNotification,
    markNotificationAsReadByIds
} = require('../handlers/notification')
const { Prisma } = require('@prisma/client')
const { listUserCoursesByUserId, registerUserCourse } = require('../handlers/userCourse')
const { findCourseById } = require('../handlers/course')
const { viewCourseReview } = require('../handlers/courseReview')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

router.post('/register',
    async (req, res, next) => {
        let { name, email, password, password2, phone } = req.body
        let errors = []
        let phone_regex = /((0)+(\d{9})\b)/g
        if (phone.length !== 10 || !phone_regex.test(phone)) {
            // user.phone = ''
            req.body.phone = ''
            errors.push({ message: 'Số điện thoại không hợp lệ.' })
        }
        if (password.length < 6) {
            errors.push({ message: 'Mật khẩu cần có ít nhất 6 ký tự.' })
        }
        
        if (password !== password2) {
            errors.push({ message: 'Mật khẩu xác nhận không khớp.' })
        }
        
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        if (!emailRegex.test(email)) {
            errors.push({ message: 'Email không hợp lệ.' })
        }
        
        if (errors.length > 0) {
            res.status(400).send(errors)
            return
        }
        
        try {
            let foundUser = await prisma.user.findFirst({ where: { email: email } })
            if (foundUser) {
                res.status(400).send([{ message: 'Email đã được đăng ký' }])
                return
            }
            let hash = await bcrypt.hash(password, 10)
            
            await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        phone: phone,
                        password: hash
                    },
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                        emailVerifiedAt: true,
                    }
                }
            ).then(user => {
                res.json({ data: user })
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }
)

router.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        const foundUser = await prisma.user.findFirst({ where: { email: email } })
        if (!foundUser) {
            res.status(400).send({ message: 'Email chưa được đăng ký.' })
            return
        }
        
        let compare = await bcrypt.compare(password, foundUser.password)
        if (!compare) {
            res.status(400).send({ message: 'Mật khẩu không đúng' })
            return
        }
        
        let token = jwt.sign({
            uid: foundUser.id.toString(),
            email: email,
            phone: foundUser.phone
        }, process.env.SECRET_KEY, { expiresIn: '3h' })
        res.json({
            accessToken: token,
            userInfo: { email: foundUser.email, name: foundUser.name, phone: foundUser.phone, id: foundUser.id }
        })
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:userId/notifications',
    param('userId').exists().bail().isInt().bail(),
    handleInputErrors,
    async (req, res) => {
        try {
            const user = await findUserById(BigInt(req.params.userId))
            res.json({ data: await listNotificationsByUserId(user.id) })
        } catch (e) {
            res.status(400)
            res.json({ message: e.message })
        }
    }
)

router.post('/:userId/notifications',
    param('userId').exists().isInt().bail(),
    body('title').exists().isString().bail(),
    body('message').exists().isString().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            await findUserById(BigInt(req.params.userId))
            res.json({ data: await createNotification(req) })
        } catch (e) {
            next(e)
        }
    }
)

router.post('/:userId/notifications/:notificationId/mark-as-read',
    param('userId').exists().isInt().bail(),
    param('notificationId').exists().isInt().bail(),
    handleInputErrors,
    async (req, res) => {
        try {
            await findUserById(BigInt(req.params.userId))
            const notification = await prisma.notification.findFirstOrThrow({
                where: {
                    userId: BigInt(req.params.userId),
                    id: BigInt(req.params.notificationId),
                }
            }).catch(e => {
                throw e
            })
            res.json({ data: await markNotificationAsReadByIds([notification.id]) })
        } catch (e) {
            res.status(400)
            res.json({ message: e.message })
        }
    }
)

router.post('/:userId/notifications/mark-as-read',
    param('userId').exists().isInt().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const user = await findUserById(BigInt(req.params.userId))
            const unreadNotifications = await prisma.notification.findMany({
                where: {
                    userId: user.id,
                    readAt: null,
                }
            }).catch(e => {
                throw e
            })
            if (unreadNotifications.length === 0) {
                res.json({ data: { count: 0 } })
                return
            }
            const notifications = await markNotificationAsReadByIds(
                unreadNotifications.map(notification => notification.id)
            )
            res.json({ data: notifications })
        } catch (e) {
            next(e)
        }
    }
)

router.delete('/:userId/notifications/:notificationId',
    param('userId').exists().bail().isInt().bail(),
    param('notificationId').exists().bail().isInt().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const notificationId = BigInt(req.params.notificationId)
            const user = await findUserById(BigInt(req.params.userId))
            await prisma.notification.findFirstOrThrow({
                where: {
                    userId: user.id,
                    id: notificationId,
                }
            }).catch(e => {
                if (e instanceof Prisma.NotFoundError) {
                    throw Error(`Người dùng không có thông báo với id ${notificationId}`)
                } else {
                    throw e
                }
            })
            res.json({ data: await deleteNotificationByIds([notificationId]) })
        } catch (e) {
            next(e)
        }
    }
)

router.get('/:userId/courses',
    async (req, res, next) => {
        try {
            const user = await findUserById(BigInt(req.params.userId))
            res.json({ data: await listUserCoursesByUserId(user.id) })
        } catch (e) {
            next(e)
        }
    }
)

router.get('/:userId/courses/:courseId/course-sections',
    param('userId')
        .exists().bail()
        .isInt().bail(),
    param('courseId')
        .exists().bail()
        .isInt().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            
            let userId = BigInt(req.params.userId)
            let courseId = BigInt(req.params.courseId)
            
            let userCourse = await prisma.userCourse.findFirst({
                where: {
                    userId, courseId
                }
            })
    
            if (!userCourse) {
                next(new Error('Không tìm thấy thông tin khoá học người dùng.'))
            }
            
            const userCourseSections = await prisma.userCourseSection.findMany({
                where: {
                    userCourseId: userCourse.id,
                },
                include: {
                    courseSection: true,
                }
            })
            
            if (userCourseSections) {
                res.json({ data: userCourseSections })
            } else {
                next(new Error('Không tìm thấy thông tin khoá học người dùng.'))
            }
            
        } catch (e) {
            next(e)
        }
    }
)

router.get('/:userId/courses/:courseId/course-review',
    param('userId')
        .exists().bail()
        .isInt().bail(),
    param('courseId')
        .exists().bail()
        .isInt().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            let userId = BigInt(req.params.userId)
            let courseId = BigInt(req.params.courseId)
            
            const userCourseReview = await prisma.courseReview.findFirst({
                where: {
                    userId,
                    courseId,
                },
                include: {
                    user: {
                        select: {
                            name: true,
                        }
                    },
                    course: true,
                }
            })
            
            if (userCourseReview) {
                res.json({ data: userCourseReview })
            } else {
                next(new Error('Không tìm thấy thông tin đánh giá.'))
            }
        } catch (e) {
            next(e)
        }
    }
)

router.post('/:userId/courses/:courseId/course-sections',
    body('userCourseSectionId').exists().isInt().bail(),
    body('isCompleted').exists().isBoolean().bail(),
    async (req, res,next) => {
        let userCourseSection = await prisma.userCourseSection.update({
            where: {
                id: BigInt(req.body.userCourseSectionId),
            },
            data: {
                isCompleted: req.body.isCompleted,
            }
        }).catch(e => next(e))
        
        res.json({ data: userCourseSection })
    })

module.exports = router
