import React, {Component}  from 'react';
import firebase from '../Fire';


class TodoLogin extends Component{

	state = {
		username:"",
		password:""
	}
	onChangeHandler = e =>{
		const {name , value} =e.target;
		this.setState({
			[name]:value
		})
	}
	onClickHandler = e =>{
		e.preventDefault();
		firebase.doSigninWithEmailAndPassword(this.state.username, this.state.password).then(r=>{console.log(r)
																								this.props.login()})
			
	}
	
	render(){
		
		const {username, password} = this.state;
		return(
			<div className="app-wrapper">
			<div className="header">
				<h1>Login</h1>
			</div>
				<div className="main">
					<form className="form">
						<input className="login-input" name="username" type="text"  onChange=								{this.onChangeHandler} placeholder="Email" />
						
						<input  className="login-input" name="password" type="password"  onChange=								{this.onChangeHandler} placeholder="Password" />
						<button onClick={this.onClickHandler} className="add-task-btn">Sign In</button>
					</form>
				</div>
			
				</div>)
	}
}

export default TodoLogin;
