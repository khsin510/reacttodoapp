import React, { Component } from "react";
import TodoItem from "./TodoItem";


class TodoList extends Component {
	static defaultProps = {
    data: [],
    onRemove: () => console.warn("onRemove not defined"),
	onUpdate: () => console.warn("onUpdate not defined")
  
  };
 
  render() {
	const { data, onRemove, onUpdate } = this.props;
	console.log(data)
	const tasks = data.map(task=>(
	<TodoItem key={task.id} task={task} onRemove={onRemove} onUpdate={onUpdate}/>));
    return (
		
		<div><ul className="list">{tasks}</ul></div>
		
    );
  }
}

export default TodoList;