const express = require('express');
const { validationResult, ValidationChain } = require('express-validator');
// can be reused by many routes

function handleInputErrors(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    } else {
        next()
    }
}

module.exports = {handleInputErrors}
