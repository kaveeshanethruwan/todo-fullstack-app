import { createTodo, updateTodo, resetTodos, getTodos } from '../services/todoService';

describe('updateTodo function', () => {
    beforeEach(() => {
        resetTodos();
    });

    it('should update the completed status of an existing todo', () => {
        const newTodo = createTodo('Task 1', false);
        const updatedTodo = updateTodo(newTodo.id, true);

        expect(updatedTodo).toBeDefined();
        expect(updatedTodo?.completed).toBe(true);

        const todos = getTodos();
        const todoInList = todos.find(todo => todo.id === newTodo.id);
        expect(todoInList?.completed).toBe(true);
    });

    it('should return undefined when trying to update a non-existent todo', () => {
        expect(() => updateTodo(999, true)).toThrow(`Couldn't find the item`);
        const todos = getTodos();
        expect(todos).toHaveLength(0);
    });
});
