import { useNavigate } from "react-router-dom";

import ProjectForm from "../project/ProjectForm";
import styles from "./newproject.module.css";

function NewProject() {

const navigate = useNavigate() // permite redirecionar para outra pagina dentro do nosso sistema

    function createpost(project) { // função que vai inserir o projeto no banco de dados

        // initialize costs and services 
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project) // enviando os dados do projeto para o banco de dados
        }).then((resp) => resp.json())
        .then((data) => {
            // redirect to projects page
            navigate("/projects", {state:{ message: "Sucessfully created a new project" }}) // redirecionando para a pagina de projetos caso tenha sucesso na cricao de projeto
        })
        .catch((err) => {
             console.log(err)
         })
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Create a Project</h1>
            <p>Create your project and then add the services</p>
            <ProjectForm  handleSubmit={createpost} btnText="Create project"/>
        </div>
    )
}

export default NewProject