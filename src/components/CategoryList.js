import React from 'react'
import { Link } from 'react-router-dom'

function CategoryList({ categories }) {
    return (
        <div className="category-list-wrapper">
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.name}>
                        <Link to={"/" + category.name} className="post-link">
                            <span>{category.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default CategoryList