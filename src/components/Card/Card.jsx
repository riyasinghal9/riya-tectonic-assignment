import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Tag from '../Tags/Tag'
import './Card.css'
import CardDetails from './CardDetails/CardDetails'
const Card = (props) => {
    const [dropdown, setDropdown] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    return (
        <Draggable
            key={props.id.toString()}
            draggableId={props.id.toString()}
            index={props.index}
        >
            {(provided) => (
                <>
                    {modalShow && (
                        <CardDetails
                            updateCard={props.updateCard}
                            onClose={setModalShow}
                            card={props.card}
                            bid={props.bid}
                            removeCard={props.removeCard}
                        />
                    )}

                    <div
                        className="card"
                        onClick={() => {
                            setModalShow(true)
                        }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="card-text">
                            <p>{props.title}</p>
                            <button
                                onClick={() =>
                                    props.removeCard(props.bid, props.id)
                                }
                            >
                                X
                            </button>
                        </div>

                        <div className="card-tags">
                            {props.tags?.map((item, index) => (
                                <Tag
                                    key={index}
                                    tagName={item.tagName}
                                    color={item.color}
                                />
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    )
}

export default Card
