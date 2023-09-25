import React from 'react'



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
                this.setState({...this.state, todos: res.data.data})
              } )
              .catch(err => {
                err, `fetchAllTodos: error`
              })
    }

  componentDidMount() {
    //fetch all todos from server
    console.log('component did mount')
    this.fetchAllTodos()
  }
  
  render() {
    return (
      <div>
        <div id="error">Error: no error here </div>
        <div id="todos"></div>
          <h2>Todos:</h2>
         { this.state.todos.map(todo => {
          return <div>{todo.name}</div>
         })}
          <form id="todoForm">
            <input type="text" placeholder="Type todo" />
            <button>Add Todo</button>
            <button>Clear Completed</button>
          </form>
       
      </div>
    )
  }
}
