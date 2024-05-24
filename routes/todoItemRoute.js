const express = require('express')
const router = express.Router()
const {addTodoItem, getTodoItems, updateTodoItem, deleteTodoItem} = require('../controllers/todoItemController')

router.route('/add').post(addTodoItem)
router.route('/').get(getTodoItems)
router.route('/:id').put(updateTodoItem).delete(deleteTodoItem)

module.exports = router