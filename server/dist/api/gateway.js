"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../db/models');
async function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        const realUser = await User.findByPk(req.user.id);
        if (realUser) {
            next();
        }
        else {
            res.status('403').send('user is not an admin and is not in database');
        }
    }
    else {
        res.status('403').send('user is not an admin');
    }
}
function getRoute(req) {
    const routeParts = req.baseUrl.split('/');
    return routeParts[routeParts.length - 1];
}
function isCorrectUser(req, res, next) {
    const requesterId = req.user ? req.user.id : null;
    const requestedId = req.params.id;
    if (requesterId === requestedId) {
        next();
    }
    else {
        res
            .status('403')
            .send(`user is not allowed to access another users ${getRoute(req)}`);
    }
}
function isSession(req, res, next) {
    if (req.sessionID) {
        // more likely to have come from browser
        next();
    }
    else {
        res
            .status('403')
            .send(`non-browser is not allowed to access route ${getRoute(req)}`);
    }
}
module.exports = { isAdmin, isCorrectUser, isSession };
