const prisma = require('../modules/database')

async function createCourseReview(req, res) {
    return prisma.courseReview.create({
        data: {
            courseId: req.body.courseId,
            userId: req.body.userId,
            review: req.body.review,
            rating: req.body.rating,
            title: req.body.title,
        }
    })
}

async function viewCourseReview(req, res) {
    await prisma.courseReview.findFirstOrThrow({
        where: {
            id: req.param.courseReviewId
        }
    }).then(courseReview => {
        res.json({ data: courseReview })
    }).catch(e => {
        res.status(400)
        res.json({ message: e })
    })
}

async function listReviewsByCourseId(req, res) {

}

async function editCourseReview(req, res) {

}

async function deleteCourseReview(req, res) {

}

module.exports = { viewCourseReview, createCourseReview, listReviewsByCourseId, editCourseReview, deleteCourseReview }
