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
    ],
    term: '',
    filter: 'all'
    }

    filter ( items, filter ) {
      switch (filter) {
        case 'all' :return items;
        case 'active': 
         return items.filter((item)=> !item.done);
        case 'done': 
        return items.filter((item)=> item.done);  
        default: return items;
      }
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

    toggleProperty( arr, id, propName) {
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

    search = (items, term) => {
     if (term === '') return items;

    return items.filter( (item)=> {
      return item.text.toLowerCase().indexOf(term.toLowerCase()) > -1;
     })
      
    }

    onToggleImportant = (id) => {
      this.setState( ({ todoData }) => {
         return  {
           todoData: this.toggleProperty(todoData, id, 'important')
         };
      });
    } 

    onToggleDone = (id) => {
      this.setState( ({ todoData }) => {
         return  {
           todoData: this.toggleProperty(todoData, id, 'done')
         };
      });
    }

    onSearchChange = ( term ) => {
      this.setState({
        term
      })
    }

    onFilterChange = (filter) => {
      this.setState({filter})
    }

    render (){
      const { todoData, term , filter } = this.state;
      const visibleTodo = this.filter(this.search(todoData, term), filter);
      const doneCount = todoData.filter( (el) => el.done === true).length;
      const todoCount = todoData.length - doneCount;
    return (
        <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchBar
          onSearchChange = {this.onSearchChange}
          />
          <ItemStatusFilter filter={filter} 
          onFilterChange= {this.onFilterChange}/>
        </div>
  
        <TodoList todos={visibleTodo}
        onDelete={ this.deleteItem } 
        onToggleDone={this.onToggleDone}
        onToggleImportant={this.onToggleImportant}
        />

        <CreateForm onItemAdded={ this.addItem }/>
      </div>
    );
    }
};
