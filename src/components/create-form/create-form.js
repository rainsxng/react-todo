import React, {Component} from 'react'

 export default class CreateForm extends Component {
    render () {
        return (
            <div>
                <button onClick = {() => { this.props.onItemAdded("My Text")}} className="btn btn-outline-info float-right mt-4">Add todo</button>
            </div>
        )
    }
}