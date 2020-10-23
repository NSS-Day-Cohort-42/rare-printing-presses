import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoriesProvider"
import "./Categories.css"


export const CategoryForm = (props) => {
    const { addCategory, categories, getAllCategories } = useContext(CategoryContext)

    // Component state
    const [category, setCategory] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newCategory = Object.assign({}, category)
        newCategory[event.target.label] = event.target.value
        setCategory(newCategory)
    }

    // Get categories from API when component initializes
    useEffect(() => {
        getAllCategories()
    }, [])



    const constructNewCategory = () => {
                addCategory({
                    label: category.label,
                })
                    .then(() => props.history.push("/categories"))
            }


    return (
        <form className="categoryForm">
            <h2 className="categoryForm__title">Create A Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Category name </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Category name"
                        defaultValue={category.label}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewCategory()
                }}
                className="btn btn-primary">
                Save
            </button>
        </form>
    )
}