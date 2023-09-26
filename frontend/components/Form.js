import React from 'react'

export default class Form extends React.Component {


    render() {
        return (
            <div>
                <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
                    <input value={this.props.todoNameInput} 
                    onChange={this.props.handleChange} 
                    type="text" 
                    placeholder="Type todo" />
                    <input type="submit"></input>
                </form>
                <button 
                onClick={this.props.toggleDisplayCompleteds}
                    >
                    {this.props.displayCompleteds ? 'Hide' : "Show"} Completed
                    </button>
          </div>
        )
    }
}