interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

let todos: Todo[] = [{
    id: 1,
    task: 'Create todo list',
    completed: true
}];

export const resetTodos = (): void => {
    todos = [];
};

export const getTodos = (search?: string): Todo[] => {
    let filteredTodos = [...todos];
    if (search) {
        filteredTodos = todos.filter(todo =>
            todo.task.toLowerCase().includes(search.toLowerCase())
        );
    }
    return filteredTodos;
};

export const createTodo = (task: string, completed: boolean): Todo => {
    const newTodo: Todo = {
        id: todos.length + 1,
        task,
        completed,
    };
    todos.push(newTodo);
    return newTodo;
};

export const updateTodo = (id: number, completed: boolean): Todo | undefined => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], completed };
        return todos[todoIndex];
    }
    throw new Error(`Couldn't find the item`)
};

export const deleteTodo = (id: number): Todo | undefined => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        return todos.splice(todoIndex, 1)[0];
    }
    throw new Error(`Couldn't find the item`)
};
