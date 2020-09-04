import React from 'react';
//import './index.css';

export { ModalNew }

class ModalNew extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '', formValid: false, background: 'white' }
       
        this.inputNode = React.createRef();


    }
    componentDidUpdate(prevProps){  //Самая адсая функция. Палим изменения props и по ним меняем state. if - самое главное
        if (this.props.showModal)
            this.inputNode.current.focus();
    }



    handleChange(event) {
        this.setState({ value: event.target.value });
        
        //this.style.background = blue;
        if (event.target.value.length === 0)
            this.setState( {background: 'white'})
        else
            this.setState( {background: 'green'})

        if (event.target.value.length >= 1) this.setState({ formValid: true })
        else this.setState({ formValid: false })

    }

    async handleSubmit(event) {
        //if (this.state.value == '') return null;
        console.log('submit')
        event.preventDefault();
        let response = await fetch("https://test.megapolis-it.ru/api/list", {
            method: 'post', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ "title": this.state.value })
        })
        if (response.ok) {
            let text = await response.text();
            text = JSON.parse(text)
            //console.log('где ты ',this.props)
            this.props.addTask({ id: text.id, title: this.state.value });
        }
        else {
            console.log('bad add request')
            this.props.showEdit();
        }
    }

    close() {

        console.log('close')
    }
    render() {
        //console.log('RENDER MODAL ', this.props.modal)
        let modal = null
        if (this.props.showModal)
            modal = <div className='modal-new-task'>
                <form className='modal-new-task' onSubmit={this.handleSubmit}>
                    
                    <input placeholder="Новая задача" style={ {'background': this.state.background} } ref = {this.inputNode} className="input" type="text" value={this.state.value} onChange={this.handleChange} minLength="1" />
                    <input className="input-button" type="submit" disabled={!this.state.formValid} value="Отправить" />
                </form>
                <span className="close" onClick={this.props.showEdit}>&times;</span>
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