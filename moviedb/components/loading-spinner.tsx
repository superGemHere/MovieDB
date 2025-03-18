import styles from "./loading-spinner.module.css"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  text?: string
  fullPage?: boolean
}

export default function LoadingSpinner({
  size = "medium",
  text = "Loading...",
  fullPage = false,
}: LoadingSpinnerProps) {
  const sizeClass = styles[size]

  if (fullPage) {
    return (
      <div className={styles.fullPage}>
        <div className={styles.container}>
          <div className={`${styles.spinner} ${sizeClass}`}></div>
          {text && <p className={styles.text}>{text}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${sizeClass}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  )
}

