import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  buttons = [
    {name:'all', label:'All'},
    {name:'active', label:'Active'},
    {name:'done', label:'done'}
  ];

  render () {
    const {filter} = this.props;
    const buttons = this.buttons.map( ( { name, label } ) => {
      const isActive = filter === name;
      const classN = isActive ? 'btn btn-info' : 'btn btn-outline-secondary'
        return (
          <button type="button" key={ name }
          className={classN} name={ name }
          onClick={() => {this.props.onFilterChange(name)}}
          >{ label }</button>
        );
    });

    return (
      <div className="btn-group">
        { buttons } 
       </div>
    );
  }
}