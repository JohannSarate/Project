import styles from "./Project.module.css"

import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../project/ProjectForm"
import Message from "../layout/Message"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function Project() {

    let { id } = useParams() // assim ele sabe que vamos pegar o id que esta vindo da url

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("success") 

    useEffect(() => {

       setTimeout(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
       }, 500)
        
    },[id])

    function editPost(project) {
        setMessage("")
        // BUDGET VALIDATION
        if (project.budget < project.cost) {
            setMessage("Budget cannot be negative")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) // enviando os dados do projeto para o banco de dados
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage("Project updated successfully")
            setType("success")
        })
        .catch((err) => console.log(err))
     }

     function createService(project) {
        setMessage("")

        // last service
        const lastService = project.services[project.services.length - 1]
        
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = Number(project.cost) + Number(lastServiceCost)
        
        
        // maximum value validation
        if (newCost > Number(project.budget)) {
            setMessage("Maximum value reached")
            setType('error')
            project.services.pop()
            return false
          }
        
          project.cost = newCost

          //update project
          fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project) // enviando os dados do projeto para o banco de dados
          })
          .then((resp) => resp.json())
          .then((data) => {
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage("Service added successfully")
            setType("success")
           
          })
          .catch((err) => console.log(err))
          
}
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {

        const servicesUpdated = services.filter((service) => service.id !== id ) // vamos tirar o servico que tem o id igual ao que vamos passar no argumento

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = Number(projectUpdated.cost) - Number(cost)

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated) // enviando os dados do projeto para o banco de dados
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage("Service removed successfully")
            setType("success")
        })
        .catch((err) => console.log(err))
    }


    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                   <Container customClass="column">
                    {message && <Message type={type} msg={message} /> }
                    <div className={styles.details_container}>
                         <h1>Project: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? "Edit Project" : "Cancel"}
                        </button>
                             {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Category:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Budget:</span> £{project.budget}
                            </p>
                            <p>
                                <span>Value Used :</span> £{project.cost}
                            </p>
                        </div>
                    ):(
                        <div className={styles.project_info}>
                            < ProjectForm 
                             handleSubmit={editPost}
                              btnText="Update" 
                              projectData={project}
                              />
                        </div>
                    )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Add a service</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? "Add Service" : "Cancel"}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && <ServiceForm 
                            handleSubmit={createService}
                            btnText="Add Service" 
                            projectData={project}
                            />}
                        </div>
                    </div>
                    <h2>Services</h2>
                    <Container customClass="start">
                        {services.length > 0 && 
                        services.map((service)=> (
                            < ServiceCard 
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                            />
                        ))
                        
                        }
                        {services.length === 0 && <p>No services added yet</p>}
                    </Container>
                </Container> 
                </div>
                
            ) : (
                < Loading />
            )}
        </>
    )
}

export default Project