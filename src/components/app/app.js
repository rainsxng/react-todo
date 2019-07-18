import React , { Component } from 'react';

import SearchBar from '../search-bar'
import AppHeader from '../app-header'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import CreateForm from '../create-form'
import './app.css'

export default class  App extends Component {

    maxid = 10;

    createTodoItem(text) {
      return {
         text,
         important: false,
         done: false,
         id:this.maxid++
      }
    }

    state = {
      todoData : [
       this.createTodoItem('Drink coffee'),
       this.createTodoItem('Watch anime'),
       this.createTodoItem('Create React App'),
    ]
    }

    deleteItem = ( id ) => {
     this.setState( ({ todoData }) => {
       const idx =todoData.findIndex( (el) => el.id === id );
       const after = todoData.slice(0, idx);
       const before = todoData.slice(idx+1);
       const newState = [...before, ...after];
       return {
         todoData: newState
       }
     })
    }

    togglePropery( arr, id, propName) {
      const idx =arr.findIndex( (el) => el.id === id );
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
     return [
         ...arr.slice(0, idx),
         newItem,
         ...arr.slice(idx + 1)
        ];
    }

    addItem = ( text ) => {
       const newItem =  this.createTodoItem(text);
       this.setState( ( { todoData }) => {
         const newState = [...todoData, newItem];
         return {
           todoData: newState
         }
       });
    }

    onToggleImportant = (id) => {
      this.setState( ({ todoData }) => {
         return  {
           todoData: this.togglePropery(todoData, id, 'important')
         };
      });
    } 

    onToggleDone = (id) => {
      this.setState( ({ todoData }) => {
         return  {
           todoData: this.togglePropery(todoData, id, 'done')
         };
      });
    }

    render (){
      const { todoData } = this.state;
      const doneCount = todoData.filter( (el) => el.done === true).length;
      const todoCount = todoData.length - doneCount;
    return (
        <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchBar />
          <ItemStatusFilter />
        </div>
  
        <TodoList todos={todoData}
        onDelete={ this.deleteItem } 
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}
        />

        <CreateForm onItemAdded={ this.addItem }/>
      </div>
    );
    }
};
