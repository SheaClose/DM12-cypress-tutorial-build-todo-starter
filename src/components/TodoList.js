import React from "react";

const TodoItem = props => {
  return (
    <li className={props.isComplete ? "completed" : null}>
      <div className="view">
        <input
          onClick={() => props.handleCompleteTodo(props.id)}
          className="toggle"
          type="checkbox"
          readOnly
          checked={props.isComplete}
        />
        <label>{props.name}</label>
        <button
          className="destroy"
          onClick={() => props.handleDeleteTodo(props.id)}
        />
      </div>
    </li>
  );
};

export default props => {
  return (
    <ul className="todo-list">
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          handleCompleteTodo={props.handleCompleteTodo}
          handleDeleteTodo={props.handleDeleteTodo}
          {...todo}
        />
      ))}
    </ul>
  );
};
