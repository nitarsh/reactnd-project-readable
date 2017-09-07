import React from 'react'

export function Score({ id, value, onClickFn }) {
    return (
        <div className="container column">
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