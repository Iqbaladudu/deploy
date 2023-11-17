"use client";

import { Button as BaseButton } from "react-bootstrap";
import styles from "./styles.module.css";

function Button({ children, variants }) {
  return (
    <>
      <style type="text/css">
        {`
                .btn-primary {
                    color: #F5D9D9;
                    font-size: 16px;
                }
                .btn-primary:hover {
                    color: #F5D9D9;
                    background-color: #E84D4D
                }
                .btn-secondary {
                    color: #FBF2DA
                }
            `}
      </style>
      <BaseButton variants={variants} className={styles.primaryactv}>
        {children}
      </BaseButton>
    </>
  );
}

export default Button;
