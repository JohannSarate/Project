import { useEffect, useState } from "react"

import styles from "./message.module.css"

function Message({ type, msg }) {

    const [ vissible, setVisible ] = useState(false)

    useEffect(() => {

        if (!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timeout = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }

    }, [msg])

    return (
        <>
          {vissible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
          )}
        </>
    )
}

export default Message;