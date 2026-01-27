import React, { useState } from 'react'

export default function TodoList() {
    type Todo = {
        id: number
        text: string
        completed: boolean
    }

    const [todos, setTodos] = useState<Todo[]>([])
    const [text, setText] = useState('')

    const updateTodo = (text: string) => {
        const newTodo: Todo = {
            id: todos.length + 1,
            text: text,
            completed: false,
        }
        setTodos([...todos, newTodo])
        setText('')
    }

    const square = (n) => n * n
    const double = (x) => x * 2

    const greet = (name) => 'Hello ' + name

    // const toggleTodo = (todo: Todo) => {
    //     setTodos(
    //         todos.map(t =>
    //         t.id === todo.id
    //             ? { ...t, completed: !t.completed }
    //             : t
    //         )
    //     );
    // };

    const toggleTodo = (todoToToggle: Todo) => {
        const updatedTodos: Todo[] = []

        for (const todo of todos) {
            if (todo.id === todoToToggle.id) {
                updatedTodos.push({
                    ...todo,
                    completed: !todo.completed,
                })
            } else {
                updatedTodos.push(todo)
            }
        }

        setTodos(updatedTodos)
    }

    return (
        <div>
            <h1>Todo List Component</h1>

            <input
                type="text"
                placeholder="New Todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={() => updateTodo(text)}> Add Todo </button>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text} {todo.completed ? '(Completed)' : '(Pending)'}
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
