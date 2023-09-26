import React from 'react';

export default class TodoList extends React.Component {



    render() {
        return (
           
        <div id="todos">
          <h2>Todos:</h2>
           { this.props.todos.reduce(( acc, todo ) => {
            
              if(this.props.displayCompleteds || !todo.completed) {
                return acc.concat(<div onClick={this.props.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? " ✔" : ''}</div>)
              } return acc
             
           } , [])
           


              //  return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name}{todo.completed ? " ✔" : ''}</div>
            }
        </div>
            
        )
    }
}