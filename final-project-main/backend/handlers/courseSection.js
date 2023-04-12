const prisma = require('../modules/database')
const { CourseSectionType } = require('../modules/enums')

async function viewCourseSection(req, res) {
    await prisma.courseSection.findFirstOrThrow({
        where: {
            id: BigInt(req.params.courseSectionId)
        },
        include: {
            question: true,
            lecture: true,
        },
    }).then(courseSection => {

        // If section is a question, transform string from database to array
        if(courseSection.type === CourseSectionType.QUESTION) {
            courseSection.question.keys = courseSection.question.keys.split(',')
            courseSection.question.options = courseSection.question.options.split(',')
        }

        res.json({ data: courseSection })
    }).catch(e => {
        res.status(400)
        res.json({ message: e })
    })
}

async function createCourseSection(req, res) {
    const body = req.body
    let courseSection = {
        data: {
            courseId: body.courseId,
            title: body.title,
            type: body.type,
            order: body.order,
        }
    }

    if (req.body.type === CourseSectionType.QUESTION) {
        let question = body.content
        courseSection.data.question = {
            create: {
                type: question.type,
                options: question.options.toString(),
                keys: question.keys.toString(),
                prompt: question.prompt,
            }
        }
        courseSection.include = {
            question: true
        }
    } else if (req.body.type === CourseSectionType.LECTURE) {
        let lecture = body.content
        courseSection.data.lecture = {
            create: {
                content: lecture.content
            }
        }
        courseSection.include = {
            lecture: true
        }
    }

    return prisma.courseSection.create(courseSection)
}

async function editCourseSection(req, res) {
    await prisma.courseSection.update({
        where: {
            id: BigInt(req.params.courseSectionId)
        },
        data: {
            content: req.body.content,
            title: req.body.title,
        }
    }).then(courseSection => {
        res.json({ data: courseSection })
    })
}

async function deleteCourseSection(req, res) {
    await prisma.courseSection.delete({
        where: {
            id: BigInt(req.params.courseSectionId)
        }
    }).then(courseSection => {
        res.json({ data: courseSection })
    })
}

module.exports = { editCourseSection, viewCourseSection, createCourseSection, deleteCourseSection }
