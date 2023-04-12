const express = require('express')
const router = express.Router()
const { body, param, query } = require('express-validator')
const { handleInputErrors } = require('../modules/middleware')
const {
    createCourse,
    checkDuplicateCourseSlug,
    findCourseById,
    deleteCourse,
    editCourse,
    listCourseSections, editCourseById, listCourses, listPopularCourses, listLatestCourses
} = require('../handlers/course')
const prisma = require('../modules/database')
const { findCategoryBySlug } = require('../handlers/category')
const { findUserById } = require('../handlers/user')
const { registerUserCourse, registerUserToCourse } = require('../handlers/userCourse')

router.get('/',
    query('limit').customSanitizer((value, { req }) => {
        return value ? Number.parseInt(value) : 10
    }),
    query('offset').customSanitizer((value, { req }) => {
        return value ? Number.parseInt(value) : 0
    }),
    async function (req, res, next) {
    try {
        console.log(req.query)
        res.json({ data: await listCourses(req.query), limit: req.query.limit, offset: req.query.offset, total: await prisma.course.count() })
    } catch (e) {
        next(e)
    }
})

router.get('/popular-courses',
    async function (req, res, next) {
        try {
            res.json({ data: await listPopularCourses() })
        } catch (e) {
            next(e)
        }
    })

router.get('/lastest-courses',
    async function (req, res, next) {
        try {
            res.json({ data: await listLatestCourses() })
        } catch (e) {
            next(e)
        }
    })

router.get('/:courseId', async function (req, res, next) {
    try {
        const courseId = BigInt(req.params.courseId)
        res.json({ data: await findCourseById(courseId) })
    } catch (e) {
        next(e)
    }
})

router.delete('/:courseId', async function (req, res, next) {
    await deleteCourse(req, res)
})

router.put('/:courseId',
    body('title')
        .exists().bail()
        .isString().bail(),
    body('slug')
        .exists().bail().withMessage('Trường thông tin là bắt buộc')
        .isSlug().bail().withMessage('Cần điền trường thông tin hợp lệ')
        .custom(checkDuplicateCourseSlug).bail(),
    body('description')
        .optional().bail()
        .isString().bail(),
    handleInputErrors,
    async function (req, res, next) {
        try {
            res.json({ data: await editCourse(req) })
        } catch (e) {
            next(e)
        }
    })

router.post('/',
    body('title')
        .exists().bail()
        .isString().bail(),
    body('slug')
        .exists().bail().withMessage('Trường thông tin là bắt buộc')
        .isSlug().bail().withMessage('Cần điền trường thông tin hợp lệ')
        .custom(checkDuplicateCourseSlug).bail(),
    body('description')
        .optional().bail()
        .isString().bail(),
    handleInputErrors,
    async function (req, res, next) {
        try {
            // const duplicateCourse = findCategoryBySlug(req.body.slug)
            // if (duplicateCourse) {
            //     throw Error(`Đã tồn tại khoá học với slug ${req.body.slug}`)
            // }
            res.json({ data: await createCourse(req, res) })
        } catch (e) {
            next(e)
        }
    })

router.get('/:courseId/course-sections',
    param('courseId')
        .exists().bail()
        .isNumeric().bail(),
    async (req, res) => {
        await prisma.course.findFirstOrThrow({
            where: {
                id: BigInt(req.params.courseId)
            }
        }).then(async () => {
            await listCourseSections(req, res)
        }).catch(e => {
            res.status(400)
            res.json({ message: e.message })
        })
    }
)

router.post('/:courseId/users',
    body('userId').exists().bail().isInt(),
    param('courseId').exists().bail().isInt(),
    async (req, res, next) => {
        try {
            const user = await findUserById(BigInt(req.body.userId))
            const course = await findCourseById(BigInt(req.params.courseId))
    
            const userCourse = await prisma.userCourse.findFirst({
                where: {
                    userId: user.id,
                    courseId: course.id
                },
                include: {
                    user: true,
                    course: {
                        include: {
                            courseSections: true
                        }
                    },
                }
            })
    
            if(userCourse) {
                res.json({ data: userCourse })
            }
    
            res.json({ data: await registerUserToCourse(user, course) })
        } catch (e) {
            next(e)
        }
    }
)

module.exports = router
