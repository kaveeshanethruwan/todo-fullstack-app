import { createTodo, getTodos, resetTodos } from '../services/todoService';

describe('getTodos function', () => {
    let initialTodos: any[];

    beforeEach(() => {
        initialTodos = [
            { id: 1, task: 'Task 1', completed: false },
            { id: 2, task: 'Task 2', completed: true },
            { id: 3, task: 'Another Task', completed: false },
        ];
        resetTodos();
        initialTodos.forEach(todo => createTodo(todo.task, todo.completed));
    });

    it('should return all todos when no search term is provided', () => {
        expect(getTodos()).toEqual(initialTodos);
    });

    it('should return filtered todos when a search term is provided', () => {
        const searchTerm = 'task';
        const filtered = initialTodos.filter(todo =>
            todo.task.toLowerCase().includes(searchTerm.toLowerCase())
        );
        expect(getTodos(searchTerm)).toEqual(filtered);
    });

    it('should return an empty array when no todos match the search term', () => {
        const searchTerm = 'non-existent task';
        expect(getTodos(searchTerm)).toEqual([]);
    });
});
