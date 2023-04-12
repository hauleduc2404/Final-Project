const express = require('express')
const router = express.Router()
const { body, param, sanitizeBody, oneOf } = require('express-validator')
const { handleInputErrors } = require('../modules/middleware')
const prisma = require('../modules/database')
const { createCourseReview, viewCourseReview } = require('../handlers/courseReview')


router.post('/',
    oneOf([
        body('userId').exists().isInt(),
        body('courseId').exists().isInt(),
        body('review').optional().isString(),
        body('rating').exists().isInt(),
        body('title').optional().isInt(),
    ]),
    async (req, res, next) => {
       try {
           let courseId = BigInt(req.body.courseId)
           let userId = BigInt(req.body.courseId)
           const courseReview = await prisma.courseReview.findFirst({
               where: {
                   courseId,
                   userId
               }
           })
           
           if(courseReview) {
               next(new Error('Không thể đánh giá do tồn tại đánh giá sản phẩm của người dùng này.'))
           }
           
           res.json({ data: await createCourseReview(req) })
       } catch (e) {
           next(e)
       }
    }
)

router.get('/:courseReviewId',
    body('courseReviewId')
        .exists().bail()
        .isInt().bail()
        .custom((value, { req }) => value === req.body.password),
    handleInputErrors,
    async (req, res, next) => {
        try {
            res.json({ data: await viewCourseReview(req , res) })
        } catch (e) {
            next(e)
        }
    }
)


module.exports = router
