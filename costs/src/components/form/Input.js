import styles from "./input.module.css"

function Input ({type, text, name, placeholder, hanleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type}
             name={name} 
             id={name}
             placeholder={placeholder} 
             onChange={hanleOnChange}
             value={value} 
            />
        </div>
    )
}

export default Input