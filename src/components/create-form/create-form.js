import React, {Component} from 'react'

 export default class CreateForm extends Component {

    state = {
        text: ''
    }

    onTextChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }


    onSubmit = (event) => {
        event.preventDefault();
        this.props.onItemAdded(this.state.text);
        this.setState({
            text: ''
        })
    }

    render () {
        return (
            <form className="d-flex mt-4"
            onSubmit={this.onSubmit}
            >
                <input type="text"
                className="form-control mr-3"
                onChange={this.onTextChange}
                placeholder="What needs to be done"
                value={this.state.text}
                >

                </input>
                <button className="btn btn-outline-info float-right">Add todo</button>
            </form>
        )
    }
}