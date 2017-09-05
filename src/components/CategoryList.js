import React from 'react'

function CategoryList({ categories }) {
    return (
        <div className="category-list-wrapper">
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.name}>{category.name}</li>
                ))}
            </ul>
        </div>
    )
}


export default CategoryList