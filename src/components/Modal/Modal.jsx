import React from 'react'
import './Modal.css'
const Modal = (props) => {
    return (
        <div className="modal-container" onClick={() => props.onClose(false)}>
            <div
                className="content"
                onClick={(event) => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    )
}

export default Modal
