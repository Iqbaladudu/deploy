import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="primary" />
    </div>
  }