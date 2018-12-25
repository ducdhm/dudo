const auth = require('../auth/api');
const TodoModel = require('../models/Todo');
const logger = require('../utils/logger')('api/todo');

module.exports = app => {
    app.get('/api/todo/', auth, async (req, res, next) => {
        try {
            const todos = await TodoModel.find();
            
            res.json({
                status: true,
                todos
            });
        } catch (error) {
            next(error);
        }
    });
    
    app.get('/api/todo/:todoId', async (req, res, next) => {
        try {
            const todo = await TodoModel.findById(req.params.todoId);
            
            res.json({
                status: true,
                todo
            })
        } catch (error) {
            next(error);
        }
    });
    
    app.post('/api/todo/:todoId/toggle', async (req, res, next) => {
        try {
            const todo = await TodoModel.findById(req.params.todoId);
            await TodoModel.save(todo, {completed: !todo.completed});
            
            res.json({
                status: true
            })
        } catch (error) {
            next(error);
        }
    });
    
    app.post('/api/todo/:todoId/delete', async (req, res, next) => {
        try {
            await TodoModel.deleteById(req.params.todoId);
            
            res.json({
                status: true
            });
        } catch (error) {
            next(error);
        }
    });
    
    app.post('/api/todo/new', async (req, res, next) => {
        try {
            const todo = TodoModel.create(req.body);
            await TodoModel.save(todo);
            
            res.json({
                status: true,
                todo
            });
        } catch (error) {
            next(error);
        }
    });
    
};
