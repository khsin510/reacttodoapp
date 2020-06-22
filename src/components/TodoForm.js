import React, { Component } from "react";

class TodoForm extends Component {
  state = {
    todo: ""
  };
  handleChange = e => {
    this.setState({
      todo: e.target.value
    });
	console.log(this.state.todo);
  };

  handleSubmit = e => {
    // 페이지 리로딩 방지
    e.preventDefault();
	

    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
	
    this.setState({
      todo: ""
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          placeholder="ToDo"
          value={this.state.todo}
          onChange={this.handleChange}
		className="task-input"
        />
        
      </form>
    );
  }
}

export default TodoForm;