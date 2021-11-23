require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { requireAdmin, requireLogin } = require('../middleware/auth');
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

const WORK_FACTOR = Number(process.env.WORK_FACTOR);
const SECRET_KEY = process.env.SECRET_KEY;

var users = require('../init_data.json').data;
var curId = _.size(users);

/* GET users listing. 
  Requires admin privileges.
  */
router.get('/', requireLogin, requireAdmin, function (req, res) {
  res.json(_.toArray(users));
});

/* POST log in to user. */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = _.find(users, { email });
    await new Promise((resolve, reject) => { setTimeout(resolve, 1000) });
    if (!user) throw new Error("1. Invalid username or password");
    const match = user.password === undefined || await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({
        id: user.id,
        userData: user
      }, SECRET_KEY);

      res.cookie("session", JSON.stringify(token));
      return res.json(user); //TODO we never send passwords back to the client but for this demo why not
    }

    throw new Error("Invalid username or password");
  } catch (err) {
    return next(err);
  }
});

/* POST log out of user. */
router.post('/logout', (req, res, next) => {
  try {
    res.clearCookie("session");
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

/* Create a new user */
router.post('/', async (req, res, next) => {
  var user = req.body;
  user.id = curId++;
  let password = user.password;
  user.password = await bcrypt.hash(password, WORK_FACTOR);
  if (!user.state) {
    user.state = 'pending';
  }
  users[user.id] = user;
  log.info('Created user', user);
  res.json(user);
});

/* Get a specific user by id */
router.get('/:id', function (req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Delete a user by id */
router.delete('/:id', function (req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function (req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID parameter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});


module.exports = router;
