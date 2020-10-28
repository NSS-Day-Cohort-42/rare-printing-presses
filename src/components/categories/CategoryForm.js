import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoriesProvider"
import "./Categories.css"
import Button from '@material-ui/core/Button';



export const CategoryForm = (props) => {
    const { addCategory } = useContext(CategoryContext)

    // Component state
    const [category, setCategory] = useState({})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newCategory = Object.assign({}, category)
        newCategory[event.target.name] = event.target.value
        setCategory(newCategory)
    }

    // Get categories from API when component initializes



    const constructNewCategory = () => {
                addCategory({
                    label: category.label,
                })
                    .then(() => props.history.push("/categories"))
            }


    return (
        <form className="categoryForm">
            <h2 className="categoryForm__title">CREATE A CATEGORY</h2>
            <fieldset className="categoryForm__fieldset">
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Category name"
                        defaultValue={category.label}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <Button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewCategory()
                }}
                className="btn btn-primary btn-add_category">
                Save
            </Button>
        </form>
    )
}