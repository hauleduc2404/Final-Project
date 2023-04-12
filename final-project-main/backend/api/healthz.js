const express = require('express');
const router = express.Router();
const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* GET home page. */
router.get('/healthz', function(req, res, next) {
  res.send('test success');
});

module.exports = router;
