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
            userId: token.userData.id,
            accessLevel: token.userData.accessLevel
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

async function requireAdmin(req, res, next) {
    try {
        if (!req.session || !req.session.userId) throw new Error("No authorization.");
        if (req.session.accessLevel !== "admin") throw new Error("No authorization.");
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = { requireLogin, requireAdmin };