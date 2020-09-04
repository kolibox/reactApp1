import React from 'react';
export {ModalEdit};

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.editValue , formValid: true}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.show = this.show.bind(this);
        this.inputNode = React.createRef();
        //this.ref = React.createRef();
        //console.log('popa', JSON.stringify(this.state))
    }

    show() {
        this.props.showEditTask('','')
    }

    componentWillUnmount(){
        console.log('unmount edit')
    }
   // componentDidMount() {
     //   this.setState({id: this.props.editID, value: this.props.editValue})
    //}
    async handleSubmit(event){  //Вот тут дофига всего надо сделать. И отправить и отобразить. Пипец
        //if (this.state.value == '') return null;
        console.log('submit')
        event.preventDefault();
    


        let response = await fetch("https://test.megapolis-it.ru/api/list/" +this.props.editID, { method: 'post', headers: {
            'Content-Type': 'application/json'
            }, body: JSON.stringify({"title": this.state.value}) } )
        if (response.ok) {
            let text = await response.text();
            text = JSON.parse(text)
            console.log('updated task: ', text)

            this.props.updateTask(this.props.editID, this.state.value);
            this.props.showEditTask(this.props.editID, this.state.value);
            //this.props.addNewTask({id: text.id, title: this.state.value});
        }
        else {
            console.log('bad update request')
            this.props.showEditTask(this.props.editID, this.state.value);
        }

    }
    
    componentDidUpdate(prevProps){  //Самая адсая функция. Палим изменения props и по ним меняем state. if - самое главное
        if (prevProps.editValue !== this.props.editValue)
            this.setState({value: this.props.editValue})
        //console.log('HERE ', this.props.modal)
        if (this.props.showEditTaskModal)
            this.inputNode.current.focus();


    }
    handleChange(event2) {
        //this.props = '666'
        //console.log(JSON.stringify(this.props))
        this.setState({value: event2.target.value});
        if (event2.target.value.length >=1) this.setState({formValid: true})
        else this.setState({formValid: false})
        
      }

    //componentWillUpdate()  {
    //    this.setState({id: this.props.editID, value: this.props.editValue})
    //}

    render() {
        //console.log('edit modal ', JSON.stringify(this.state), JSON.stringify(this.props))
        //this.setState({value: this.props.editValue})
        let modal = null
        if (this.props.showEditTaskModal)
            modal = <div className="modal-edit-task">
                <form className='modal-edit-form' onSubmit={this.handleSubmit}>
                        <p className="input-id"> {this.props.editID} </p>
                        <input ref = {this.inputNode} className="inputEdit" type="text" value={this.state.value} onChange={this.handleChange} minLength="1" />
                        <input className="input-button" type="submit" disabled={!this.state.formValid} value="Отправить" />
                </form>
            <span className="close" onClick={this.show}>&times;</span>
            
          </div>
        else       
        modal = null  
        return ( 
            <>
                {modal}
            </>
        )
    }

}