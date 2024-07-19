import { createTodo, deleteTodo, resetTodos, getTodos } from '../services/todoService';

describe('deleteTodo function', () => {
    beforeEach(() => {
        resetTodos();
    });

    it('should delete an existing todo', () => {
        const newTodo = createTodo('Task 1', false);
        const deletedTodo = deleteTodo(newTodo.id);

        expect(deletedTodo).toBeDefined();
        expect(deletedTodo?.task).toBe('Task 1');

        const todos = getTodos();
        const todoInList = todos.find(todo => todo.id === newTodo.id);
        expect(todoInList).toBeUndefined();
    });

    it('should return error when trying to delete a non-existent todo', () => {
        expect(() => deleteTodo(999)).toThrow(`Couldn't find the item`);
        const todos = getTodos();
        expect(todos).toHaveLength(0);
    });
});
