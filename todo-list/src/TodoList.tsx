import { FC } from 'react';
import TodoItem, { TodoListItem } from './TodoItem';

type TodoListProps = {
  todos: TodoListItem[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const TodoList: FC<TodoListProps> = ({ todos, removeTodo, toggleTodo }) => (
  <div className='todo-items'>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    ))}
  </div>
);

export default TodoList;
