import {Link} from "react-router-dom"

import styles from "../project/ProjectCard.module.css"

import { BsFillTrashFill, BsPenFill } from "react-icons/bs"

function ServiceCard({ id, name, cost, description, handleRemove}) {

    const remove = (e) => {
       e.preventDefault()
       handleRemove(id, cost)
    }


    return (
        <div className={styles.project_card}>
          <h4>{name}</h4>
          <p>
            <span>Total cost:</span> £{cost}
          </p>
          <p>{description}</p>
          <div className={styles.project_card_actions}>
            <Link to={`/services/${id}`}>
                <BsPenFill/>
                Edit
            </Link>
             <button onClick={remove}>
                <BsFillTrashFill />
                Delete
             </button>
          </div>
        </div>
    )
}

export default ServiceCard;