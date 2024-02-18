import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import './Label.css'

export default function (props) {
    const input = useRef()
    const [selectedColor, setSelectedColor] = useState('black')
    const [label, setLabel] = useState('')

    return (
        <div className=" ">
            <div className="header">
                <h6>
                    <b>Label</b>
                </h6>
                <span
                    className="label-close-btn"
                    onClick={() => props.onClose(false)}
                >
                    X
                </span>
            </div>
            <div className="row">
                <p
                    style={{
                        color: '#5e6c84',
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '700',
                        lineHeight: '16px',
                    }}
                    className="my-1"
                >
                    Name
                </p>
                <div className="col-12 label-input-cls">
                    <input
                        type="text"
                        ref={input}
                        defaultValue={label}
                        placeholder="Name of label"
                        onChange={(e) => {
                            setLabel(e.target.value)
                        }}
                    />
                </div>
                <p
                    style={{
                        color: '#5e6c84',
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '700',
                        lineHeight: '16px',
                    }}
                    className="my-2"
                >
                    Select color
                </p>
                <div className="d-flex justify-content-between mb-2">
                    <select
                        value={selectedColor}
                        class="form-select form-select-sm"
                        aria-label="Default select example"
                        onChange={(ev) => setSelectedColor(ev.target.value)}
                    >
                        <option selected>Select color</option>
                        <option value="red">red</option>
                        <option value="blue">blue</option>
                        <option value="green">green</option>
                    </select>
                </div>
                <div>
                    <button
                        className="create-btn"
                        onClick={() => {
                            if (label !== '') {
                                props.addTag(label, selectedColor)
                                setSelectedColor('')
                                setLabel('')
                                input.current.value = ''
                            } else return
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
