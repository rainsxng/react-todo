import React from 'react'
import TodoItem from './../todo-item'
import './todo-list.css'

const TodoList = ( { todos, onDelete, onToggleImportant, onToggleDone } ) => {

    const elements = todos.map( ( item ) => {

        const { id, ...itemProps} = item;

        return (
            <li key={id} className="list-group-item">
                <TodoItem 
                onDelete = {() => onDelete(id)}
                onToggleImportant = {() => onToggleImportant(id)}
                onToggleDone= {() => onToggleDone(id)}
                {...itemProps} 
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;