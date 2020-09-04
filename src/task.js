import React from 'react';
import './index.css';
export {Task};


class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: null, title: null }

        this.sendDelete = this.sendDelete.bind(this)
        this.sendModalEdit = this.sendModalEdit.bind(this)
        //this.setState({value: props})
        //this.state = {value: null}
        //console.log(props)

    }


    componentDidMount() {
        //console.log(this.props)
        this.setState({ id: this.props.value.id, title: this.props.value.title })
        //console.log(this.state)
        //console.log(this.props.value)
    }

    sendModalEdit() {
        //console.log('soso: ', this.props)
        this.props.modal(this.props.value.id, this.props.value.title)
    }



    async sendDelete() {
        //console.log('deleting: ', this.props.value.id, '==', this.state.id)

        let response = await fetch("https://test.megapolis-it.ru/api/list/" + this.props.value.id, { method: 'delete' })
        if (response.ok) {
            await response.text();
            //this.setState({ items: json });
            //this.setState({ isLoaded: true });
            //console.log(text);
        }

        //console.log('this.props ', this.props)
        //console.log('this.state ', this.state)

        this.props.callback(this.props.value.id)
        //this.setState(null)
        //this.setState({ id: 777, title: 888 })

    }



    render() {
        //this.state.setState
        //console.log('render task row', JSON.stringify(this.state))

        return (

            <div className="row">
                <div className="number">{this.props.value.id}</div>
                <div className="description">{this.props.value.title}</div>
                <div className="toolbar">
                    <button className="edit-button" onClick={this.sendModalEdit}>E</button>
                    <button className="remove-button" onClick={this.sendDelete}>X</button>
                </div>
            </div>


        );
    }
}