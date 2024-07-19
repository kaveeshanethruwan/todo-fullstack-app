import { createTodo, resetTodos, getTodos } from '../services/todoService';

describe('createTodo function', () => {
    beforeEach(() => {
        resetTodos();
    });

    it('should create a new todo and add it to the todos array', () => {
        const task = 'New Task';
        const completed = false;

        const newTodo = createTodo(task, completed);

        expect(newTodo).toEqual(expect.objectContaining({
            id: expect.any(Number),
            task,
            completed,
        }));

        const todos = getTodos();
        expect(todos).toHaveLength(1);
        expect(todos[0]).toEqual(newTodo);
    });

    it('should increment the id for each new todo created', () => {
        const task1 = 'Task 1';
        const task2 = 'Task 2';
        const completed = false;

        const todo1 = createTodo(task1, completed);
        const todo2 = createTodo(task2, completed);

        expect(todo1.id).toBe(1);
        expect(todo2.id).toBe(2);
    });
});
