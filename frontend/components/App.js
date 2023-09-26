import React from 'react'



import axios from 'axios'

//declare a base url so that code remains dry
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    state = {
      todos: [],
      error: '',
      todoNameInput: '',

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

  toggleCompleted = id => (e) => {
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
           { this.state.todos.map(todo => {
                return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? " ✔" : ''}</div>
            })}
          <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
            <input value={this.state.todoNameInput} onChange={this.handleChange} type="text" placeholder="Type todo" />
            <input type="submit"></input>
            <button>Clear Completed</button>
          </form>
        </div>
      </div>
    )
  }
}
