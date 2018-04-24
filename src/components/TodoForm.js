import React from "react";

export default props => (
  <form onSubmit={props.handleTodoSubmit}>
    <input
      type="text"
      autoFocus
      onChange={e => props.handleInputUpdate(e.target.value)}
      value={props.inputText}
      className="new-todo"
      placeholder="What needs to be done?"
    />
  </form>
);
