import React from 'react'
import Form from './Form'


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
        <div id="todos">
          <h2>Todos:</h2>
           { this.state.todos.reduce(( acc, todo ) => {
            
              if(this.state.displayCompleteds || !todo.completed) {
                return acc.concat(<div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? " ✔" : ''}</div>)
              } return acc
             
           } , [])
           


              //  return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? " ✔" : ''}</div>
            }
        </div>
        <Form />
      </div>
    )
  }
}
