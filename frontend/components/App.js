import React from 'react'
import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Form />
      <TodoList />
      </div>
    )
  }
}
