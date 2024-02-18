import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Board.css'
import Editable from '../Editable/Editable'
import { Droppable } from 'react-beautiful-dnd'
export default function Board(props) {
    const [show, setShow] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        document.addEventListener('keypress', (e) => {
            if (e.code === 'Enter') setShow(false)
        })
        return () => {
            document.removeEventListener('keypress', (e) => {
                if (e.code === 'Enter') setShow(false)
            })
        }
    })

    return (
        <div className="board">
            <div className="top">
                {show ? (
                    <div>
                        <input
                            className="input"
                            type={'text'}
                            defaultValue={props.name}
                            onChange={(e) => {
                                props.setName(e.target.value, props.id)
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <p
                            onClick={() => {
                                setShow(true)
                            }}
                            className="board-title"
                        >
                            {props?.name || 'Name of Board'}
                            <span className="total-cards">
                                {props.card?.length}
                            </span>
                        </p>
                    </div>
                )}
                <button
                    onClick={() => {
                        setDropdown(true)
                    }}
                >
                    X
                </button>
                {dropdown && (
                    <p
                        onClick={() => props.removeBoard(props.id)}
                        className="delete-column"
                    >
                        Delete Column
                    </p>
                )}
            </div>
            <Droppable droppableId={props.id.toString()}>
                {(provided) => (
                    <div
                        className="cards"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.card?.map((items, index) => (
                            <Card
                                bid={props.id}
                                id={items.id}
                                index={index}
                                key={items.id}
                                title={items.title}
                                tags={items.tags}
                                updateCard={props.updateCard}
                                removeCard={props.removeCard}
                                card={items}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="footer">
                <Editable
                    name={'Add Task'}
                    btnName={'Add Task'}
                    placeholder={'Enter title'}
                    onSubmit={(value) => props.addCard(value, props.id)}
                    bid={props.id}
                />
            </div>
        </div>
    )
}
