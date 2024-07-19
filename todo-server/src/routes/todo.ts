import express, { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const search = req.query.search as string;
    try {
        const filteredTodos = getTodos(search);
        res.status(200).json(filteredTodos);
    } catch (error) {
        res.status(500).send('Failed to fetch data');
    }
});

router.post('/', (req: Request, res: Response) => {
    const { task, completed } = req.body;
    try {
        const newTodo = createTodo(task, completed);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).send('Failed to create todo');
    }
});

router.patch('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { completed } = req.body;
    try {
        const updatedTodo = updateTodo(id, completed);
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).send('TODO not found');
        }
    } catch (error) {
        res.status(500).send('Failed to update todo');
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const deletedTodo = deleteTodo(id);
        if (deletedTodo) {
            res.status(200).json(deletedTodo);
        } else {
            res.status(404).send('TODO not found');
        }
    } catch (error) {
        res.status(500).send('Failed to delete todo');
    }
});

export default router;
