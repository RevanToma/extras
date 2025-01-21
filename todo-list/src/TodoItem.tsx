import { FC } from 'react';

export type TodoListItem = {
  title: string;
  done: boolean;
  id: number;
};

type TodoItemProps = {
  todo: TodoListItem;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const TodoItem: FC<TodoItemProps> = ({ todo, removeTodo, toggleTodo }) => {
  return (
    <div key={todo.id} className='todo-item'>
      <input
        type='checkbox'
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.title}</span>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
  );
};

export default TodoItem;
