import React, { useState, useEffect } from 'react'
import Modal from '../../Modal/Modal'
import './CardDetails.css'
import { v4 as uuidv4 } from 'uuid'
import Label from '../../Label/Label'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            resolve(reader.result)
        }
        reader.onerror = reject
    })
}

const MANDATORY_FIELDS = [
    'text',
    'issueType',
    'effortEstimation',
    'priority',
    'assignee',
    'description',
    'attachments',
    'dependsOn',
    'blocks',
]

export default function CardDetails(props) {
    console.log(props.card, '[props')
    const [values, setValues] = useState({ ...(props.card || {}) })
    const [text, setText] = useState(values.title)
    const [labelShow, setLabelShow] = useState(false)
    const [issueType, setIssueType] = useState(values.issueType)
    const [effortEstimation, setEffortEstimation] = useState(
        values.effortEstimation
    )
    const [priority, setPriority] = useState(values.priority)
    const [assignee, setAssignee] = useState(values.assignee)
    const [description, setDescription] = useState(values.description)
    const [attachments, setAttachments] = useState(values.attachments)
    const [dependsOn, setDependsOn] = useState(values.dependsOn)
    const [blocks, setBlocks] = useState(values.blocks)

    useEffect(() => {
        if (props.updateCard) props.updateCard(props.bid, values.id, values)
    }, [values])

    const updateTitle = (value) => {
        setText(value)
        setValues({ ...values, title: value })
    }

    const updateIssueType = (value) => {
        setIssueType(value)
        setValues({ ...values, issueType: value })
    }

    const updateEffortEstimation = (value) => {
        const nonNegativeValue = value < 0 ? 0 : value
        setEffortEstimation(nonNegativeValue)
        setValues({ ...values, effortEstimation: nonNegativeValue })
    }
    const updatePriority = (value) => {
        setPriority(value)
        setValues({ ...values, priority: value })
    }
    const updateAssignee = (value) => {
        setAssignee(value)
        setValues({ ...values, assignee: value })
    }
    const updateDescription = (value) => {
        setDescription(value)
        setValues({ ...values, description: value })
    }
    const updateAttachments = async (event) => {
        const file = await getBase64(event.target.files[0])
        setAttachments(file)
        setValues({ ...values, attachments: file })
    }

    const updateDependsOn = (value) => {
        setDependsOn(value)
        setValues({ ...values, dependsOn: value })
    }

    const updateBlocks = (value) => {
        setBlocks(value)
        setValues({ ...values, blocks: value })
    }

    const removeTag = (id) => {
        const tempTag = values.tags.filter((item) => item.id !== id)
        setValues({
            ...values,
            tags: tempTag,
        })
    }

    const addTag = (value, color) => {
        values.tags.push({
            id: uuidv4(),
            tagName: value,
            color: color,
        })

        setValues({ ...values })
    }

    const handleCloseModal = () => {
        if (
            !text ||
            !description ||
            !issueType ||
            !effortEstimation ||
            !priority ||
            !description ||
            !assignee ||
            !attachments
        ) {
            alert('Please fill mandatory fields')
            return
        }
        props.onClose()
    }

    return (
        <Modal onClose={handleCloseModal}>
            <div>
                <div
                    className="container"
                    style={{ minWidth: '650px', position: 'relative' }}
                >
                    <div className="card-details-container">
                        <h4>Edit Issue</h4>
                        <div className="label-input-container">
                            <label>
                                Title:<span className="red">*</span>
                            </label>
                            <input
                                defaultValue={text}
                                type={'text'}
                                onChange={(ev) => updateTitle(ev.target.value)}
                                name="text"
                                style={{ marginBottom: '8px' }}
                            />
                        </div>
                        <div className="label-input-container">
                            <label>
                                Issue type:<span className="red">*</span>
                            </label>

                            <select
                                name="issueType"
                                value={issueType}
                                class="form-select form-select-sm"
                                aria-label="Default select example"
                                onChange={(ev) =>
                                    updateIssueType(ev.target.value)
                                }
                            >
                                <option value="">Select issue type</option>
                                <option value="bug">Bug</option>
                                <option value="feature">Feature</option>
                                <option value="enhancement">Enhancement</option>
                            </select>
                        </div>
                        <div className="label-input-container">
                            <label>
                                Effort estimation:<span className="red">*</span>
                            </label>

                            <input
                                name="effortEstimation"
                                type="number"
                                value={effortEstimation}
                                onChange={(ev) =>
                                    updateEffortEstimation(ev.target.value)
                                }
                                min="0"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>
                                Priority:<span className="red">*</span>
                            </label>

                            <select
                                name="priority"
                                value={priority}
                                class="form-select form-select-sm"
                                aria-label="Default select example"
                                onChange={(ev) =>
                                    updatePriority(ev.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select priority
                                </option>
                                <option value="p0">P0</option>
                                <option value="p1">P1</option>
                                <option value="p2">P2</option>
                            </select>
                        </div>
                        <div className="label-input-container">
                            <label>
                                Description:<span className="red">*</span>
                            </label>

                            <textarea
                                name="description"
                                value={description}
                                onChange={(ev) =>
                                    updateDescription(ev.target.value)
                                }
                            />
                        </div>
                        <div className="label-input-container">
                            <label>
                                Assignee:<span className="red">*</span>
                            </label>

                            <input
                                name="assignee"
                                type="text"
                                value={assignee}
                                onChange={(ev) =>
                                    updateAssignee(ev.target.value)
                                }
                            />
                        </div>
                        <div className="label-input-container">
                            <label>
                                Attachments:<span className="red">*</span>
                            </label>

                            {attachments ? (
                                <img
                                    src={attachments}
                                    width={100}
                                    height={100}
                                    accept="image/png, image/jpeg"
                                />
                            ) : null}
                            <input
                                name="attachments"
                                type="file"
                                onChange={updateAttachments}
                            />
                        </div>
                        <div className="label-input-container">
                            <label>Depends on:</label>

                            <input
                                name="dependsOn"
                                type="text"
                                value={dependsOn}
                                onChange={(ev) =>
                                    updateDependsOn(ev.target.value)
                                }
                            />
                        </div>
                        <div className="label-input-container">
                            <label>Blocks:</label>

                            <input
                                name="blocks"
                                type="text"
                                value={blocks}
                                onChange={(ev) => updateBlocks(ev.target.value)}
                            />
                        </div>
                        <div className="label-input-container">
                            <label>Tags:</label>

                            <div
                                className="d-flex label__color flex-wrap"
                                style={{ width: '500px', paddingRight: '10px' }}
                            >
                                {Array.isArray(values.tags) &&
                                values.tags?.length
                                    ? (values.tags || []).map((item) => (
                                          <div className="tag-container">
                                              <span
                                                  className="tag"
                                                  style={{
                                                      backgroundColor:
                                                          item.color,
                                                  }}
                                              >
                                                  {item.tagName?.length > 10
                                                      ? item.tagName.slice(
                                                            0,
                                                            6
                                                        ) + '...'
                                                      : item.tagName}
                                              </span>
                                              <button
                                                  onClick={() =>
                                                      removeTag(item.id)
                                                  }
                                                  className="tag-delete"
                                              >
                                                  X
                                              </button>
                                          </div>
                                      ))
                                    : null}
                            </div>

                            <button
                                onClick={() => setLabelShow(true)}
                                className="add-tag"
                            >
                                Add Tag
                            </button>
                            {labelShow && (
                                <div>
                                    <Label
                                        addTag={addTag}
                                        tags={values.tags}
                                        onClose={setLabelShow}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
