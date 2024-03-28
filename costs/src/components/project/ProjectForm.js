import { useEffect, useState } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"
import styles from "./projectform.module.css"

function ProjectForm ({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {}) // dados do projeto ou um objeto vazio 
 
    useEffect(() => {
        fetch ("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
     .then((resp) => resp.json())
     .then((data) => {
        setCategories(data)
      })
      .catch((err) => console.log(err))
    }, [])

    const submit = (e) => { // criando nosso metodo de submissão
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) { 
        setProject({...project,[e.target.name]: e.target.value // destruct o valor do input e atribuindo o novo valor
        })
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type="text" 
            placeholder="Project name" 
            name="name" text="Project name" 
            hanleOnChange={handleChange} // capturando o valor do input
            value={project.name ? project.name : ""}
            />
            <Input type="number" 
            placeholder="Total Project Budget" 
            name="budget" 
            text="Fill in the project budget" 
            hanleOnChange={handleChange}
            value={project.budget ? project.budget : ""}
            />
            <Select 
            name="category_id" 
            text="Select a category" 
            options={categories} 
            handleOnChange={handleCategory} 
            // category tem id se nao vai vazio 
            value={project.category ? project.category.id : ""} /> 
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm
