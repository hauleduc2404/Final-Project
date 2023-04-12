const prisma = require('../modules/database')
const { Prisma } = require('@prisma/client')


async function savePushSubscription() {

}
async function listNotificationsByUserId(userId) {
    return await prisma.notification.findMany({
        where: {
            userId: userId
        }
    }).catch(e => {
        throw e
    })
}

async function createNotification(req) {
    return prisma.notification.create({
        data: {
            userId: BigInt(req.params.userId),
            title: req.body.title,
            message: req.body.message
        }
    })
}

async function deleteNotificationByIds(ids) {
    return prisma.notification.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })
}

async function markNotificationAsReadByIds(ids) {
    return prisma.notification.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            readAt: new Date(),
        }
    })
}

module.exports = {deleteNotificationByIds, listNotificationsByUserId, createNotification, markNotificationAsReadByIds}
