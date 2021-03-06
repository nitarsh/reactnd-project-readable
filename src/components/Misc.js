import React from 'react'

export function Score({ id, value, onClickFn }) {
    return (
        <div className="container column score-wrapper h-center">
            <i
                className="fa fa-arrow-up"
                aria-hidden="true"
                onClick={() => onClickFn(id, 1)}
            />
            <span>{value}</span>
            <i
                className="fa fa-arrow-down"
                aria-hidden="true"
                onClick={() => onClickFn(id, -1)}
            />
        </div>
    )
}

export function Sorting({ sortBy, sortFn }) {
    return (
        <div>
            <label>
                Sort By:
    <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) => sortFn(event.target.value)}
                >
                    <option value="-voteScore">Vote Score (descending)</option>
                    <option value="voteScore">Vote Score (ascending)</option>
                    <option value="-timestamp">Timestamp (descending)</option>
                    <option value="timestamp">Timestamp (ascending)</option>
                </select>
            </label>
        </div>
    )
}

export function NotFound() {
    return (
        <div className="container column">
            <h1>404 Not Found</h1>
            <p>Please go back and choose the right page</p>
        </div>
    )
}