import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import axios from "axios";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      todos: [],
      error: false,
      remainingTodos: 0
    };

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleCompleteTodo = this.handleCompleteTodo.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/todos")
      .then(({ data }) => {
        this.setState({
          todos: data,
          remainingTodos: data.filter(c => !c.isComplete).length
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  handleInputUpdate(inputText) {
    this.setState({ inputText });
  }

  handleTodoSubmit(e) {
    e.preventDefault();
    const newTodo = {
      name: this.state.inputText,
      isComplete: false
    };
    axios
      .post("http://localhost:3030/api/todos", newTodo)
      .then(({ data }) => {
        this.setState({
          todos: [...this.state.todos, data],
          inputText: ""
        });
      })
      .catch(err => {
        console.log(`Error posting todo: ${err}`);
        this.setState({ error: true });
      });
  }

  handleDeleteTodo(id) {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        this.setState({ todos: this.state.todos.filter(c => c.id != id) });
      })
      .catch(err => {
        console.log("err: ", err);
        this.setState({ error: true });
      });
  }

  handleCompleteTodo(id) {
    axios
      .put(`/api/todos/${id}`)
      .then(({ data }) => {
        this.setState({
          todos: data,
          remainingTodos: data.filter(c => !c.isComplete).length
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error && <span className="error">Oh No! Error!</span>}
            <TodoForm
              handleTodoSubmit={this.handleTodoSubmit}
              handleInputUpdate={this.handleInputUpdate}
              inputText={this.state.inputText}
            />
          </header>
          <section className="main">
            <TodoList
              handleCompleteTodo={this.handleCompleteTodo}
              handleDeleteTodo={this.handleDeleteTodo}
              todos={this.state.todos}
            />
          </section>
          <Footer remainingTodos={this.state.remainingTodos} />
        </div>
      </Router>
    );
  }
}
