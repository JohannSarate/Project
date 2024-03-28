import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

import styles from './Footer.module.css';
function footer () {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaGithub />
                </li>
            </ul>
            <p className={styles.copyright}>
            <span>Costs</span> &copy; 2022
            </p>
            
        </footer>
    )
}

export default footer
