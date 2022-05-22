var express = require('express');
var router = express.Router();
var models = require('../models')
var Response = require('../helpers/Response');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const response = new Response()
  try {
    const todos = await models.Todo.findAll()
    response.data = todos

  } catch (e) {
    response.err = true
    response.data = 'gagal menampilkan data todos'
  }
  res.json(response)
});

router.post('/', async function (req, res, next) {
  const response = new Response()
  try {
    const todo = await models.Todo.create({
      title: req.body.title,
      UserId: req.body.userid
    })
    response.data = todo
  } catch (e) {
    response.err = true
    response.data = 'gagal menambahkan data todo'
  }
  res.json(response)
});

router.put('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const todo = await models.Todo.update({
      title: req.body.title,
      complete: req.body.complete
    }, {
      where: {
        id: req.params.id
      }, 
      returning: true
    })
    response.data = todo[1][0]
  } catch (e) {
    response.err = true
    response.data = 'gagal merubah data todo'
  }
  res.json(response)
});

router.delete('/:id', async function (req, res, next) {
  const response = new Response()
  try {
    const todo = await models.Todo.destroy({
      where: {
        id: req.params.id
      }
    })
    response.data = todo
  } catch (e) {
    response.err = true
    response.data = 'gagal merubah data todo'
  }
  res.json(response)
});


module.exports = router;
