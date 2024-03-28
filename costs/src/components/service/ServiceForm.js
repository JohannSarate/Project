import { useState } from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"

import styles from "../project/projectform.module.css"

function ServiceForm ( { handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
       

        setService({...service, [e.target.name]: e.target.value }) // criamos um novo array e adiconados os dados que vem do input
    }

    return (
       <form onSubmit={submit} className={styles.form}>
        <Input 
          type="text"
          text="Service Name"
          name="name"
          placeholder="Fill service name"
          hanleOnChange={handleChange}
        />
        <Input 
          type="number"
          text="Cost of Service"
          name="cost"
          placeholder="Fill service the cost" 
          hanleOnChange={handleChange}
        />
        <Input 
          type="text"
          text="Description"
          name="description"
          placeholder="Fill description" 
          hanleOnChange={handleChange}
        />
        < SubmitButton text={btnText}/>
       </form>
    )
}

export default ServiceForm