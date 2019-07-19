import React, {Component} from 'react'
import './search-bar.css'

export default class SearchBar  extends Component {
    state = {
        term:''
    }

    onSearch = ( event ) => {
        const term = event.target.value;
        this.setState({
            term
        });
        this.props.onSearchChange(term);
    }   

    render(){

        return (
        <div>
            <input type="text" placeholder="Search" className="form-control search-input"
            onChange={this.onSearch}
            value={this.state.term}></input>
        </div>
     );
    }   
}