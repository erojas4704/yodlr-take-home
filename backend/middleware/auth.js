"use strict";

const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

async function requireLogin(req, res, next) {
    try {
        if (!req.cookies['session']) throw new Error("No authorization.");
        const sessionCookie = String(req.cookies['session']).replace(/['"]+/g, '');
        const token = jwt.verify(sessionCookie, SECRET_KEY);

        req.session = {
            sessionId: token.sessionId,
            username: token.username,
            userId: token.userId
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = { requireLogin }