import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { TodoListItem } from './TodoItem';

function App() {
  const [todos, setTodos] = useState<TodoListItem[]>([]);
  const [input, setInput] = useState<string>('');

  const handleAddTodo = useCallback(() => {
    if (!input.trim()) return;

    const newTodo: TodoListItem = {
      title: input.trim(),
      done: false,
      id: Math.random() * 1000 + todos.length,
    };

    const newTodosList = [...todos, newTodo];
    setTodos(newTodosList);
    localStorage.setItem('todos', JSON.stringify(newTodosList));
    setInput('');
  }, [input, todos]);

  const removeTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    [todos]
  );

  const toggleTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    [todos]
  );

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  return (
    <div className='todo-list'>
      <div className='todo-input'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a todo'
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
