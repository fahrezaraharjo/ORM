var express = require('express');
var router = express.Router();
var models = require('../models')
var Response = require('../helpers/Response')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const response = new Response()
  try {
    const users = await models.User.findAll({
      include: [models.Todo]
    })
    
  } catch (e) {
    response.err = true
    response.data = 'gagal menampilkan data users'
  }
  res.json(response)
});

router.post('/', async function (req, res, next) {
  const response = new Response()
  try {
    const users = await models.User.create({
      email: req.body.email
    })
 response.data = users
  } catch (e) {
    response.err = true
    response.data = 'gagal menambahkan data users'
  }
  res.json(response)
});

module.exports = router;
