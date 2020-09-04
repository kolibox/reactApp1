import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ModalNew } from './modal_add_new.js';
import { ModalEdit } from './modal_edit.js';
import { Task } from './task.js';


//-------------------------------------------
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: Object,
            showModal: false,
            showEditTaskModal: false,
            editID: null,
            editValue: ''
        }
        this.deleteTask = this.deleteTask.bind(this)
        this.showEdit = this.showEdit.bind(this)
        this.addNew = this.addNew.bind(this)
        this.addTask = this.addTask.bind(this)
        this.showEditTask = this.showEditTask.bind(this)
        this.updateTask = this.updateTask.bind(this)

    }

    showEdit(id) {
        //console.log('soso', id)

        this.setState({ showModal: !this.state.showModal })


    }


    showEditTask(id, title) {
        // console.log('modal Edit: ', id, title)
        this.setState({ editID: id, editValue: title })
        // console.log('получил editID?', JSON.stringify(this.state))
        this.setState({ showEditTaskModal: !this.state.showEditTaskModal })


    }
    addTask(obj) {
        // console.log('Board addTask after fetch-post: ', obj)
        let temp = Object.assign(this.state)
        temp.items.data.push({ id: obj.id, title: obj.title })
        this.setState(temp)

    }
    updateTask(id, title) {
        console.log('updatting Task: ', id, title)
        let temp = Object.assign(this.state)
        console.log('сюда вставить?', temp.items.data)
        for (let i = 0; i < temp.items.data.length; i++)
            if (temp.items.data[i].id === id) {
                temp.items.data[i].title = title
                break
            }
        this.setState(temp)




    }
    deleteTask(id) {
        let clone = Object.assign({}, this.state)
        //console.log('deletind ID from child: ', id)
        clone.items.data = clone.items.data.filter(a => a.id !== id)
        //console.log('clone after filter : ', id, clone)
        this.setState(clone)
    }

    componentDidMount() {
        this.loadTasks();
    }

    async loadTasks() {
        let response = await fetch("https://test.megapolis-it.ru/api/list")
        if (response.ok) {
            let json = await response.json();
            this.setState({ items: json });
            this.setState({ isLoaded: true });
            //console.log('downloding: ', json, json.length);
        }
        

    }

    addNew() {
        //console.log('add new method')
        this.showEdit();
    }

    render() {

        //console.log('rendering on delete', JSON.stringify(this.state.items))
        //console.log(this.state.items)
        

        let arr = []
        //const data = this.state.items.data
        if (this.state.isLoaded) {
            arr = this.state.items.data
            //console.log('building new: ',this.state.items.data.length)
            //console.log('building new: ',this.state.items.data[0])
            let i = 0;
            arr = arr.map(a => <Task key={i} value={this.state.items.data[i++]} callback={this.deleteTask} modal={this.showEditTask}></Task>);

        }


        //ddd

        return (
            <>
            <header>
                <button className="add-button" onClick={this.showEdit} >Добавить</button>
            </header>
            <article>
                <h1>Список Задач</h1>
                {arr}
            </article>
            
            
                
            <footer>
            <ModalEdit showEditTaskModal={this.state.showEditTaskModal} editID={this.state.editID} editValue={this.state.editValue} updateTask={this.updateTask} showEditTask={this.showEditTask}></ModalEdit>
            <ModalNew showModal={this.state.showModal} addTask={this.addTask} showEdit={this.showEdit}></ModalNew>
            kolibomber	&copy;
            </footer>
            </>



        );
    }
}





ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
