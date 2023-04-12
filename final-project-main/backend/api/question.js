const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const enums = require('../modules/enums')
const { param, sanitizeParam, body } = require('express-validator')
const { answerQuestion } = require('../handlers/question')

/**
 * Answer question
 */

router.post('/:questionId',
    param('questionId').isInt(),
    body('userId').isInt(),
    body('answer').isArray(),
    async (req, res, next) => {
        try {
            res.json({ data: await answerQuestion(req, res) })
        } catch (e) {
            next(e)
        }
    })

/**
 * Get question
 */
router.get('/:questionId', async (req, res) => {
    let questionId = req.params.questionId
    let question = await prisma.question.findFirst({
        where: {
            id: BigInt(questionId)
        },
        select: { id: true, title: true, desciption: true, question: true, objective_options: true }
    })
    res.send(question)
})

/**
 * Get list question by course
 * path: /questions?courseId=123
 */
router.get('/', async (req, res, next) => {
    try {
        let courseId = req.query.courseId
        let questions = await prisma.questions.findMany({
            where: {
                course_id: BigInt(courseId)
            },
            select: { id: true, title: true, desciption: true }
        })
        res.send(questions)
    } catch (e) {
        next(e)
    }
})

router.get('/:questionId/answer', async (req, res, next) => {
    let questionId = req.params.questionId
    let answer = await prisma.questions.findFirst({
        where: {
            id: BigInt(questionId)
        },
        select: {
            id: true, keys: true
        }
    })
    res.send(answer)
})

/**
 * Answer question
 * Body: {answer: answer}
 */

router.post('/:questionId/answer', async (req, res, next) => {
    try {
        res.json({data: await answerQuestion(req, res)})
    }   catch (e) {
        next(e)
    }
})
// router.post('/:questionId/answer', async (req, res, next) => {
//     let questionId = req.params.questionId
//     let userAnswer = req.body.answer
//     let userId = req.user.id
//
//     // Lấy câu trả lời của câu hỏi
//     let answer = await prisma.questions.findFirst({
//         where: {
//             id: BigInt(questionId)
//         },
//         select: {
//             keys: true
//         }
//     })
//     let isTrue = false
//     if (userAnswer.toString().trim().toLowerCase() == answer.keys.toString().trim().toLowerCase()) isTrue = true
//
//     let oldAnswer = await prisma.user_question.findFirst({
//         where: {
//             question_id: BigInt(questionId),
//             user_id: BigInt(userId)
//         }
//     })
//     if (!oldAnswer) {
//         let data = {
//             user_id: userId,
//             question_id: BigInt(questionId),
//             answer: userAnswer,
//             status: isTrue ? enums.AnswerStatus.TRUE : enums.AnswerStatus.FALSE
//         }
//         await prisma.user_question.create({ data })
//     } else {
//         oldAnswer.answer = userAnswer
//         oldAnswer.status = isTrue ? enums.AnswerStatus.TRUE : enums.AnswerStatus.FALSE
//         await prisma.user_question.update({
//             where: {
//                 id: oldAnswer.id
//             },
//             data: oldAnswer
//         })
//     }
//
//     // trả về true false
//     res.send(isTrue)
// })

module.exports = router
