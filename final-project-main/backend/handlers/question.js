const prisma = require('../modules/database')
async function answerQuestion(req, res) {
     let question = await findQuestionById(BigInt(req.params.questionId))

      let user = await  prisma.user.findFirstOrThrow({
           where: {
                id: BigInt(req.body.userId),
           }
      }).catch(() => {
           throw new Error('Không tìm thấy người dùng')
      })
     
     const userCourse = await prisma.userCourse.findFirst({
          where: {
               userId: user.id,
               courseId: question.courseSection.courseId
          }
     })
     console.log(user.id, question.courseSection.id)
     const section = await prisma.userCourseSection.findFirst({
          where: {
               userCourseId: userCourse.id,
               courseSectionId: question.courseSectionId,
          }
     })
     console.log(section)
     await prisma.userCourseSection.update({
          where: {
               id: section.id
          },
          data: {
               isCompleted: true,
          }
     })

     let answer = req.body.answer

     let isAnswerCorrect = true

     question.keys.forEach(key => {
          console.log(key)
          if(answer.indexOf(key) < 0) isAnswerCorrect = false
     })

     // Find or create new user question answer and then return it
     let userAnswer = await prisma.userQuestionAnswer.findFirst({
          where: {
               userId: BigInt(user.id),
               questionId: BigInt(question.id),
          }
     })

     if(userAnswer) {
          return prisma.userQuestionAnswer.update({
               where: {
                    id: userAnswer.id,
               },
               data: {
                    answer: answer.toString(),
                    isCorrect: isAnswerCorrect,
               },
          })
     } else {
          return prisma.userQuestionAnswer.create({
               data: {
                    userId: BigInt(user.id),
                    questionId: BigInt(question.id),
                    answer: answer.toString(),
                    isCorrect: isAnswerCorrect,
               },
          })
     }


}

function findQuestionById(id) {
     return prisma.question.findFirstOrThrow({
          where: {
               id: id,
          },
          include: {
               courseSection: true,
          }
     }).then(question => {
          question.keys = question.keys.split(',').map(key => Number.parseInt(key))
          question.options = question.options.split(',')
          return question
     }).catch(() => {
          throw new Error('Không tìm thấy câu hỏi')
     })
}

module.exports = { answerQuestion }
