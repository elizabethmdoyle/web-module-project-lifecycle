import React from 'react'
import TodoList from './TodoList'
import Form from './Form'

import axios from 'axios'

//declare a base url so that code remains dry
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    state = {
      todos: []
    }

  
  fetchAllTodos = () => {
      axios.get(URL)
            .then(res => {
             // this.setState({...this.state, todos: res.data})
             console.log(res.data)
            })
            .catch(err => console.log(error, `error: fetchAllTodos`))
    }

  componentDidMount() {
    //fetch all todos from server
    console.log('conponent did mount')
    this.fetchAllTodos
   

  }
  
  render() {
    return (
      <div>
        <div id="error">Error: no error here </div>
        <div id="todos"></div>
          <h2>Todos:</h2>
          <div>Walk the dog</div>
          <div>Learn React</div>
          <form id="todoForm">
            <input type="text" placeholder="Type todo" />
            <input type="text" placeholder="Type todo" />
            <button>Clear Completed</button>
          </form>
        {/* <Form /> */}
      <TodoList />
      </div>
    )
  }
}
