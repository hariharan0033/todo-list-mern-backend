const todoItemModel = require('../models/todoItemModel')

const getTodoItems = async(request, response) => {
    try{
        const todoItems = await todoItemModel.find()

        if (todoItems)
        {
            return response.status(200).json(todoItems)
        }

        response.status(204).json({message : `Your todo list is empty`})
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const addTodoItem = async(request, response) => {

    const {todoItem} = request.body;
    try{
        const existingTodoItem = await todoItemModel.findOne({todoItem : todoItem})
        if (!existingTodoItem)
        {
            const todoItemToBeAdded = await todoItemModel.insertMany({todoItem : todoItem})
            return response.status(201).json(todoItemToBeAdded)
        }
        response.status(409).json({message : `Same todoItem can't be added twice.`})     
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const updateTodoItem = async(request, response) => {
    const {id} = request.params;
    try{
        const todoItemToBeUpdated = await todoItemModel.findByIdAndUpdate({_id:id}, {done : true})
        response.status(200).json(todoItemToBeUpdated)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const deleteTodoItem = async(request, response) => {
    const {id} = request.params;
    try{
        const todoItemToBeDeleted = await todoItemModel.findByIdAndDelete({_id:id})
        response.status(200).json(todoItemToBeDeleted)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

module.exports = {addTodoItem, getTodoItems, updateTodoItem, deleteTodoItem}