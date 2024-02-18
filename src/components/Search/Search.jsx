import React, { useState, useEffect } from 'react'
import './Search.css'

const Search = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchStr, setSearchStr] = useState('')

    useEffect(() => {
        props.onSearchCb({
            searchStr: searchStr.toLowerCase(),
            selectedCategory,
        })
    }, [searchStr, selectedCategory])

    return (
        <>
            <h3>Search issues</h3>

            <div className="d-flex">
                <select
                    value={selectedCategory}
                    class="form-select form-select-sm"
                    aria-label="Default select example"
                    onChange={(ev) => setSelectedCategory(ev.target.value)}
                >
                    <option selected disabled>
                        Select search type
                    </option>
                    <option value="title">Title</option>
                    <option value="issueType">Type</option>
                    <option value="description">Description</option>
                    <option value="assignee">Assignee</option>
                    <option value="tags">Tags</option>
                </select>
                <input
                    type="text"
                    value={searchStr}
                    onChange={(ev) => setSearchStr(ev.target.value)}
                    placeholder="Enter title, issue types, description, assignee, tags to search"
                    className="search-input"
                />
            </div>
        </>
    )
}

export default Search
