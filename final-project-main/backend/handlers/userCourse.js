const prisma = require('../modules/database')
function listUserCoursesByUserId(userId) {
    return prisma.userCourse.findMany({
        where: {
            userId
        },
        include: {
            course: true
        }
    }).catch(e => {
        throw e
    })
}

async function registerUserToCourse(user, course) {
    console.log(`register user ${user.id} to course ${course.id}`)
     const userCourse = await prisma.userCourse.create({
         data: {
             courseId: course.id,
             userId: user.id,
             status: 0,
             isBookmarked: false,
             isRegistered: true,
         },
         include: {
             user: true,
             course: {
                 include: {
                     courseSections: true
                 }
             },
         }
     })
    
    let userSections = []
    await prisma.courseSection.findMany({
        where: {
            courseId: course.id,
        }
    }).then( sections => {
        sections.forEach(section => {
            userSections.push({ courseSectionId: section.id, userCourseId: userCourse.id, isCompleted: false })
        })
    })
    
    await prisma.userCourseSection.createMany({
        data: userSections
    })
    
    return userCourse
}

function listUserCourseSections(userCourse) {
    return prisma.userCourseSection.findMany({
        where: {
            userCourseId: userCourse.id,
        }
    })
    
}

module.exports = {listUserCoursesByUserId, registerUserToCourse}
