import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoriesProvider" 
import "./Categories.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Category } from "@material-ui/icons";

export const CategoriesList = (props) => {
    const { categories, getAllCategories } = useContext(CategoryContext)

    useEffect(() => {
        getAllCategories()
    }, [])

    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "white",
                margin: 0
            },
            },
            primary: {
            '& > *': {
                color: "black"
            },
        },

    }));

    const classes = useStyles()

    return (
        <>
        <section className="CategoryList">
            <article>
                <div><h2 className="categoryPageTitle">ALL CATEGORIES</h2></div>
            </article>

            <article className="categoriesContainer">
                {
                    categories.map(c => {
                        return <section key={c.id} className="categories">
                                    <div className="categoryLabel"> {c.label} </div>
                                </section>                           
                    })
                }
            </article>
        </section>
        </>
    )
}

export default CategoriesList