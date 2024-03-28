import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from "./projects.module.css"
import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/Linkbutton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

function Projects () {

    const [removeloading, setRemoveloading] = useState(false)
    const [projects, setProjects] = useState([]) // armazena os projetos do banco de dados
    const [projectmessage, setProjectmessage] = useState("")

    const location = useLocation() 
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
     
        setTimeout(() => {
        
     
        fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((resp) => resp.json())
        .then((data) =>{
            setProjects(data)
            setRemoveloading(true)
        })
        .catch((err) => console.error(err))
    }, 500); 
    }, [])

    function removeproject (id) {
        setProjectmessage("")

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id ))
            setProjectmessage("Successfully deleted project ")
        })
        .catch((err) => console.error(err))
    } 
 
    return (
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>
                <h1>Ours Projects</h1>
                < LinkButton to="/newproject" text="Create a project"/> 
            </div>
            { message && < Message type="success" msg={message} /> } 
            { projectmessage && < Message type="success" msg={projectmessage} /> } 
            <Container customClass="start">
               {projects.length > 0 && 
                projects.map((project) => (
                    < ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeproject}
                    />
                ))}
                {!removeloading && <Loading />}
                { removeloading && projects.length === 0 && (
                    <p>You don't have any registered projects</p>
                )}
            </Container>
        </div>
    )
}

export default Projects

