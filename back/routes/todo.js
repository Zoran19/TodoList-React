const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const todoCtrl = require('../controllers/todo');


router.get('/', auth, todoCtrl.getAllTodo);
router.post('/', auth, todoCtrl.createTodo);
router.get('/:id', auth, todoCtrl.getOneTodo);
router.put('/:id', auth, todoCtrl.modifyTodo);
router.delete('/:id', auth, todoCtrl.deleteTodo);

module.exports = router;