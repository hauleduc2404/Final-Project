const prisma = require('../modules/database')
const { Prisma } = require('@prisma/client')

async function findUserById(userId) {
    return await prisma.user.findFirstOrThrow({
        where: {
            id: userId,
        }
    }).catch(e => {
        if (e instanceof Prisma.NotFoundError) {
            throw Error(`Không tồn tại người dùng với id ${userId}`)
        } else {
            throw e
        }
    })
}

module.exports = {
    findUserById,
}
