import React from 'react'
import Form from './Form'
import TodoList from './TodoList'

import axios from 'axios'

//declare a base url so that code remains dry
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleteds: true
    }

  
  fetchAllTodos = () => {
        axios.get(URL)
              .then(res => {
                this.setState({...this.state, todos: res.data.data})
              } )
              .catch(this.setAxiosResponseError) 
    }

  componentDidMount() {
    //fetch all todos from server
    console.log('component did mount')
    this.fetchAllTodos()
  }

  handleChange = (e) => {
    const {value} = e.target
    this.setState({...this.state, todoNameInput: value})

  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = (err) => {
    this.setState({...this.state, error: err.response.data.message })
  }
  
  postNewTodo = () => { 
    axios.post(URL, { name: this.state.todoNameInput  }  )
          .then(res => {
            this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
            this.resetForm()
          })
          .catch(this.setAxiosResponseError) 


  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
        .then(res => {
          this.setState({...this.state, todos: this.state.todos.map(todo => {
            if(todo.id !== id) {
              return todo
            }  return res.data.data
          })
          })
        })
        .catch(this.setAxiosResponseError) 
  }

  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds})
  }

  onTodoFormSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo()
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList 
        todos={this.state.todos}
        displayCompleteds={this.state.displayCompleteds}
        toggleCompleted={this.toggleCompleted}
        
        />
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        todoNameInput={this.state.todoNameInput}
        handleChange={this.handleChange} 
        toggleDisplayCompleteds={this.toggleDisplayCompleteds}
        displayCompleted={this.state.displayCompleteds}
        />
      </div>
    )
  }
}
