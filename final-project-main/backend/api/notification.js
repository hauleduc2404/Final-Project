const express = require('express')
const router = express.Router()
const { body, param, sanitizeBody } = require('express-validator')
const { handleInputErrors } = require('../modules/middleware')
const prisma = require('../modules/database')
const { listUserNotifications } = require('../handlers/user')

router.get('/', async (req, res) => {
   await listUserNotifications()
})
