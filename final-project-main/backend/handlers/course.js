const prisma = require('../modules/database')
const { Prisma } = require('@prisma/client')
const { param, body } = require('express-validator')
const { findUserById } = require('./user')
const { registerUserCourse } = require('./userCourse')

function listCourses(query = {limit: 10, offset: 0}) {
    return prisma.course.findMany({
        take: query.limit,
        skip: query.offset * query.limit,
        include: {
            courseCategories: {
                include: {
                    category: true
                }
            }
        },
    })
}

function listPopularCourses(query = {limit: 10, offset: 0}) {
    return prisma.course.findMany({
        take: query.limit,
        skip: query.offset * query.limit,
        include: {
            courseCategories: {
                include: {
                    category: true
                }
            }
        },
        orderBy: {
            userCourses: {
                _count: 'desc',
            },
        }
    })
}

function listLatestCourses(query = {limit: 10, offset: 0}) {
    return prisma.course.findMany({
        take: query.limit,
        skip: query.offset * query.limit,
        // orderBy: {
        //     createdAt: 'desc'
        // },
        include: {
            courseCategories: {
                include: {
                    category: true
                }
            }
        },
    })
}

async function findCourseById(courseId) {
    return await prisma.course.findFirstOrThrow({
        where: {
            id: courseId
        },
        include: {
            courseReviews: true,
        }
    }).catch(e => {
        if (e instanceof Prisma.NotFoundError) {
            throw Error(`Không tìm thấy khoá học với id ${courseId}.`)
        } else {
            throw e
        }
    })
}

async function createCourse(req, res) {
    return prisma.course.create({
        data: {
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
        }
    })
}

async function editCourse(req) {
    return prisma.course.update({
        where: {
            id: BigInt(req.params.courseId)
        },
        data: {
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
        }
    })
}

async function deleteCourse(req, res) {
    let courseId = req.params.courseId
    await prisma.course.delete({
        where: {
            id: BigInt(courseId)
        }
    }).then(course => {
        res.send({ data: course })
    }).catch(() => {
        res.status(400)
        res.json({ message: `Không tìm thấy khoá học với id ${courseId}.` })
    })
}

async function listCourseSections(req, res) {
    await prisma.courseSection.findMany({
        where: {
            courseId: BigInt(req.params.courseId)
        }
    }).then(courseSections => {
        res.json({ data: courseSections })
    })
}

async function checkDuplicateCourseSlug(slug, { req }) {
    const courseId = req.params.courseId
    const course = await prisma.course.findFirst({
        where: {
            slug: slug,
            id: {
                not: courseId ? BigInt(courseId) : undefined
            }
        },
    })
    if (course) {
        throw Error(`Đã tồn tại khoá học với slug ${slug}.`)
    }
    // Indicates the success of this synchronous custom validator
    return true
}



module.exports = {
    listCourses,
    listCourseSections,
    editCourse,
    createCourse,
    findCourseById,
    deleteCourse,
    checkDuplicateCourseSlug,
    listLatestCourses,
    listPopularCourses,
}
