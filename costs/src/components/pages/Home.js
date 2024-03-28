import styles from "./Home.module.css";

import savings from "../../img/savings.svg";
import LinkButton from "../layout/Linkbutton";
function Home() {
    return (
       <section className={styles.home_container}>
        <h1>Welcome to <span>Costs</span></h1>
        <p>Start managing your projects</p>
        <LinkButton to="/newproject" text="Create a new project"></LinkButton>
        <img src={savings} alt="Savings"/>
       </section>
    )
}

export default Home