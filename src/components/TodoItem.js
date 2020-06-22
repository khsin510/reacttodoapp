import React, { Component } from "react";

class TodoItem extends Component {
	static defaultProps = { task: {} };
	state = {
    editing: false,
    todo: ""
	  };

	handleRemove = () => {
		const { task, onRemove } = this.props;
		onRemove(task.id);
	};

	handleToggleEdit = () => {
		const { editing } = this.state;
		this.setState({ editing: !editing });
	};
	handleChange = e => {
		this.setState({
			todo: e.target.value
		});
	};
	
componentDidUpdate(prevProps, prevState) {
   

    const { task, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
     
      this.setState({
        todo: task.todo
      });
    }

    if (prevState.editing && !this.state.editing) {
     
      onUpdate(task.id, {
        todo: this.state.todo
      });
    }
  }
 
  render() {
	
	
	const {todo} = this.props.task;
	const {editing} =this.state;
    return (
		<li className="list-item">
			{editing ? (
			<input className="edit-input" value={this.state.todo} onChange={this.handleChange} /> ) : (
			<span>{todo}</span>
			)}

			<div>
				<button className="btn-delete task-btn" onClick={this.handleRemove}>
					<i className="fas fa-trash-alt" />
				</button>
				<button className="btn-edit task-btn" onClick={this.handleToggleEdit}>
					<i className="fas fa-pen" />
				</button>
			</div>
		</li> );
  }
}

export default TodoItem;