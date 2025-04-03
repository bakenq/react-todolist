import React from 'react'

export default function TodoCard(props) {
    const { children, handleEditTodos, handleDeleteTodos, id } = props;

    return (
        <div className='todoItem'>
            {children} 
            <div className='actionsContainer'>
                <button onClick={() => { handleEditTodos(id) }}>
                    <i className="fa-regular fa-pen-to-square fa-2x"></i>
                </button>
                <button onClick={() => { handleDeleteTodos(id) }}>
                    <i className="fa-regular fa-trash-can fa-2x"></i>
                </button>
            </div>
        </div>
    )
}
