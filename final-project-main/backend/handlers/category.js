const prisma = require('../modules/database')
const { Prisma } = require('@prisma/client')

async function findCategoryById(categoryId) {
    return prisma.category.findFirstOrThrow({
        where: {
            id: categoryId,
        }
    }).catch(e => {
        if (e instanceof Prisma.NotFoundError) {
            throw Error(`Không tồn tại chuyên mục với id ${categoryId}`)
        } else {
            throw e
        }
    })
}

async function listCategories(req, res) {
    return prisma.category.findMany({})
}

async function listCoursesByCategoryId(categoryId) {
    return prisma.courseCategory.findMany({
        where: {
            categoryId: categoryId
        },
        include: {
            course: true
        }
    }).then(categories => {
        return categories.map(category => category.course)
    })
}

async function findCategoryBySlug(slug) {
    return prisma.category.findFirstOrThrow({
        distinct: {
            slug
        }
    }).catch(e => {
        if (e instanceof Prisma.NotFoundError) {
            throw Error('Không tìm thấy chuyên mục')
        } else {
            throw e
        }
    })
}

async function createCategory(data) {
    return prisma.category.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
        }
    })
}

async function editCategory(data) {
    return prisma.category.update({
        where: {
            id: BigInt(data.id)
        },
        data: {
            title: data.title,
            description: data.description,
            slug: data.slug,
        }
    })
}

async function deleteCategory(req, res) {
    await prisma.category.delete({
        where: {
            id: BigInt(req.params.categoryId)
        },
    }).then(category => {
        res.json(category)
    })
}

async function addCourseToCategory(req, res) {
    const courseCategory = await prisma.courseCategory.create({
        data: {
            categoryId: BigInt(req.params.categoryId),
            courseId: BigInt(req.body.courseId),
        }
    })
    res.json({ data: courseCategory })
}

async function removeCourseFromCategory(req, res) {
    const courseCategory = await prisma.courseCategory.delete({
        where: {
            categoryId_courseId: {
                categoryId: BigInt(req.params.categoryId),
                courseId: BigInt(req.body.courseId),
            }
        }
    })
    res.json({ data: courseCategory })
}

async function checkDuplicateCategorySlug(slug, { req }) {
    const categoryId = req.params.categoryId
    const course = await prisma.course.findFirst({
        where: {
            slug: slug,
            id: {
                not: categoryId ? BigInt(categoryId) : undefined
            }
        },
    })
    if (course) {
        throw Error(`Đã tồn tại chuyên mục với slug ${slug}.`)
    }
    // Indicates the success of this synchronous custom validator
    return true
}

module.exports = {
    findCategoryBySlug,
    findCategoryById,
    listCoursesByCategoryId,
    addCourseToCategory,
    removeCourseFromCategory,
    listCategories,
    createCategory,
    editCategory,
    deleteCategory
}
