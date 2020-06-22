import React, {Component} from 'react';

import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoLogin from "./components/TodoLogin";

import firebase from './Fire';


class App extends Component {
	
	constructor(props){
		super(props);
		this.state={
			 tasks: [],
        login: true
		}
		if(firebase.auth.currentUser===null){
			this.state.login=false;
		}
	}
   
componentDidMount() {
	console.log(firebase.firestore);
    const tasks = [...this.state.tasks];

    firebase.firestore.collection("tasks")
      .get()
      .then(docs => {
        docs.forEach(doc => {
          tasks.push({
            todo: doc.data().todo,
            id: doc.id
           
          });
        });
        this.setState({ tasks: tasks });
      }).catch(e=> console.log(e));
  }

    handleCreate = data => {
        const {tasks} = this.state;
		firebase.firestore.collection("tasks").add({
			todo:data.todo
		}).then(docRef=>{
			this.setState({
				 tasks: [
                ...tasks, {
                    id: docRef.id,
                    todo: data.todo
                }
            ]
			})
		})
       
    };
    handleDelete = id => {
     firebase.firestore.collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({
          tasks
        });
      });
    }
	handleUpdate = (id, data) => {
    const { tasks } = this.state;
	firebase.firestore.collection("tasks").doc(id).update({todo:data.todo}).then(()=>{
		this.setState({
      tasks: tasks.map(
        task =>
          id === task.id
            ? { ...task, todo: data.todo } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
            : task // 기존의 값을 그대로 유지
      )
    });
	})
    
  };

checkLogin = ()=>{
	if(firebase.auth.currentUser!==null){
		this.setState({
			login:true
		})
	}
}
    render() {
        const {tasks, login} = this.state;
       
            return (
                <div className="container">
					{login ? <div className="app-wrapper">
                        <div className='header'>
                            <h1>ToDo Manager</h1>
                        </div>

                        <div className="main">
                            <TodoForm onCreate={this.handleCreate}/>

                            <TodoList data={tasks} onRemove={this.handleDelete}  onUpdate={this.handleUpdate}/>
                        </div>

                    </div>: <TodoLogin login={this.checkLogin}></TodoLogin>}
                    
                </div>
            );
        }

       

    }


export default App;
