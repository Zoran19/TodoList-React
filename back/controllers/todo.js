const Todo = require('../models/todo');

exports.createTodo = (req, res, next) => {
    const todoObject = req.body.todo;
    delete todoObject._id;
    const todo = new Todo({
        ...todoObject,
        userId:req.userId,
    });
    todo.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneTodo = (req, res, next) => {
    Todo.findOne({
        _id: req.params.id,userId:req.userId
    }).then(
        (todo) => {
            res.status(200).json(todo);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyTodo = (req, res, next) => {
    const todoObject = req.body.todo
    Todo.updateOne({ _id: req.params.id, userId:req.userId }, { ...todoObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteTodo = (req, res, next) => {
    Todo.deleteOne({ _id: req.params.id, userId:req.userId })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(500).json({ error: error.toString() }));
};

exports.getAllTodo = (req, res, next) => {
    Todo.find({userId:req.userId}).then(
        (todos) => {
            res.status(200).json(todos);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};