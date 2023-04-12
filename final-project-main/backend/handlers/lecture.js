const prisma = require('../modules/database')
export function createCourseLecture(req, res) {
    return prisma.lecture.create({
        data: {
            courseSectionId: req.body.courseSectionId,
        }
    })
}
