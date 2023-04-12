const express = require('express')
const router = express.Router()
const { body, param, sanitizeBody, oneOf, validationResult } = require('express-validator')
const { handleInputErrors } = require('../modules/middleware')
const prisma = require('../modules/database')
const {
    createCourseSection,
    deleteCourseSection,
    viewCourseSection,
    editCourseSection
} = require('../handlers/courseSection')
const { CourseSectionType, QuestionType } = require('../modules/enums')

router.get('/:courseSectionId',
    param('courseSectionId').exists().isNumeric(),
    async (req, res) => {
        console.log(req.params.courseSectionId)
        await viewCourseSection(req, res)
    })
router.post('/',
    body('courseId')
        .exists()
        .isNumeric(),
    body('title').exists(),
    body('order').exists(),
    body('type')
        .isInt()
        .isIn(Object.values(CourseSectionType)).withMessage('Loại nội dung không hợp lệ'),
    handleInputErrors,
    async (req, res, next) => {
        try {
            switch (req.body.type) {
                case CourseSectionType.QUESTION:
                    console.log('checking =======', req.body.content)
                    await body('content.type').isInt().isIn(Object.values(QuestionType)).run(req)
                    await body('content.options').exists().bail().isArray().run(req)
                    await body('content.keysExplanation').optional({ checkFalsy: true }).isString().run(req)
                    await body('content.keys').exists().bail().isArray().custom((keys, { req }) => {
                        let question = req.body.content
                        let result = true
                        keys.forEach(key => {
                            if (!Number.isInteger(key) || key < 0 || key > question.options.length - 1) {
                                result = false
                            }
                            
                        })
                        console.log(result)
                        return result
                    }).run(req)
                    await body('content.prompt').exists().bail().isString().run(req)
                    break
                case CourseSectionType.LECTURE:
                    await oneOf([
                        body('content.content').exists().isString(),
                    ]).run(req)
                    break
                default:
                    next(new Error('Loại nội dung không hợp lệ'))
                    break
            }
            
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() })
            }
            
            const course = await prisma.course.findFirst({
                where: {
                    id: BigInt(req.body.courseId)
                }
            })
            
            if (!course) {
                next(new Error(`Không tồn tại khoá học với id ${req.body.courseId}`))
            }
            res.json({ data: await createCourseSection(req, res) })
        } catch (e) {
            next(e)
        }
    })

router.delete('/:courseSectionId',
    body('courseSectionId').exists().withMessage('Vui lòng lựa chọn mục'),
    async (req, res) => {
        const courseSection = await prisma.courseSection.findFirst({
            where: {
                id: BigInt(req.params.courseSectionId)
            }
        })
        if (!courseSection) {
            res.status(400)
            res.json({ message: `Không tồn tại mục với id ${req.params.courseSectionId}` })
            return
        }
        
        await deleteCourseSection(req, res)
    })
router.put('/:courseSectionId',
    param('courseSectionId').exists().bail(),
    body('title').exists().isString().bail(),
    body('content').exists().isString().bail(),
    async (req, res) => {
        const courseSection = await prisma.courseSection.findFirst({
            where: {
                id: BigInt(req.params.courseSectionId)
            }
        })
        if (!courseSection) {
            res.status(400)
            res.json({ message: `Không tồn tại mục với id ${req.params.courseSectionId}` })
            return
        }
        await editCourseSection(req, res)
    }
)



module.exports = router
