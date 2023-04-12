const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')
const {
    listCategories,
    createCategory,
    editCategory,
    deleteCategory,
    addCourseToCategory, removeCourseFromCategory, listCoursesByCategoryId, findCategoryById, findCategoryBySlug
} = require('../handlers/category')
const { handleInputErrors } = require('../modules/middleware')
const prisma = require('../modules/database')
const { Prisma } = require('@prisma/client')

router.get('/', async (req, res, next) => {
    try {
        res.json({ data: await listCategories() })
    } catch (e) {
        next(e)
    }
})

router.get('/:categoryId',
    param('categoryId').exists().isString().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            res.json({ data: await findCategoryById(BigInt(req.params.categoryId)) })
        } catch (e) {
            next(e)
        }
    }
)

router.post('/',
    body(['title', 'description']).exists().isString(),
    body(['slug']).optional().isSlug(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const duplicateCategory = await prisma.category.findFirst({
                where: {
                    slug: req.body.slug
                }
            })
            if (duplicateCategory) {
                throw Error(`Đã tồn tại chuyên mục với slug ${req.body.slug}.`)
            }
            res.json({
                data: await createCategory({
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                })
            })
        } catch (e) {
            next(e)
        }
    }
)

router.put('/:categoryId',
    body('title').exists().withMessage('').isString().withMessage(''),
    body('slug').exists().withMessage('').isString().withMessage(''),
    body('description').optional().isString().withMessage(''),
    async (req, res, next) => {
        try {
            const categoryId = BigInt(req.params.categoryId)
            const duplicateCategory = await prisma.category.findFirst({
                where: {
                    id: {
                        not: categoryId
                    },
                    slug: req.body.slug
                }
            })
            if (duplicateCategory) {
                throw Error(`Đã tồn tại chuyên mục với slug ${req.body.slug}.`)
            }
            res.json({
                data: await editCategory({
                    id: categoryId,
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                })
            })
        } catch (e) {
            next(e)
        }

    }
)

router.get('/:categoryId/courses',
    param('categoryId')
        .exists().withMessage('Vui lòng chọn chuyên mục').bail()
        .isNumeric().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const categoryId = BigInt(req.params.categoryId)
            await findCategoryById(categoryId)
            res.json({ data: await listCoursesByCategoryId(categoryId) })
        } catch (e) {
            next(e)
        }
    }
)

// Add course to category
router.post('/:categoryId/courses',
    body('courseId')
        .exists().withMessage('Vui lòng lựa chọn chuyên mục').bail()
        .isNumeric().bail(),
    handleInputErrors,
    async (req, res, next) => {
        try {
            const categoryId = BigInt(req.params.categoryId)
            const courseId = BigInt(req.body.courseId)
            await findCategoryById(categoryId)
            const duplicateCourseCategory = await prisma.courseCategory.findFirst({
                where: {
                    categoryId: categoryId,
                    courseId: courseId
                }
            })
            if (duplicateCourseCategory) {
                next(new Error(`Khoá học đã tồn tại trong chuyên mục`))
            }
            await addCourseToCategory(req, res)
        } catch (e) {
            next(e)
        }

    }
)

// Remove course from category
router.delete('/:categoryId/courses',
    body('courseId')
        .exists().withMessage('Vui lòng lựa chọn khoá học').bail()
        .isNumeric().bail(),
    param('categoryId').exists().withMessage('Vui lòng chọn chuyên mục').bail()
        .isNumeric().bail(),
    async (req, res, next) => {
        const courseCategory = await prisma.courseCategory.findFirst({
            where: {
                categoryId: BigInt(req.params.categoryId),
                courseId: BigInt(req.body.courseId),
            },
        })

        if (!courseCategory) {
            next(new Error(`Không tồn tại khoá học trong chuyên mục với id ${req.params.categoryId}`))
        }

        await removeCourseFromCategory(req, res)
    }
)

router.delete('/:categoryId',
    async (req, res) => {
        const category = await prisma.category.findFirst({
            where: {
                id: BigInt(req.params.categoryId)
            }
        })

        if (!category) {
            res.status(400)
            res.json({ message: `Không tìm thấy chuyên mục với id ${req.params.categoryId}.` })
            return
        }

        await deleteCategory(req, res)
    })

router.get('/:categoryId/courses', async (req, res) => {
    let categoryId = req.params.categoryId
    let courseIds = await prisma.courseCategory.findMany({
        where: {
            categoryId: BigInt(categoryId)
        },
        select: {
            courseId: true
        }
    })

    let courses = await prisma.course.findMany({
        where: {
            id: {
                in: courseIds.map(item => item.course_id)
            }
        }
    })

    res.send(courses)
})

module.exports = router
