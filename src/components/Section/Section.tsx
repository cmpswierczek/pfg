import React, { FunctionComponent } from "react"

import styles from "./Section.module.scss"

interface Props {
    id: string;
}

const Section: FunctionComponent<Props> = (props) => {
  return (
    <>
      <span
        id={props.id}
        className={styles.anchor}
      ></span>
      <section>
        { props.children }
      </section>
    </>
  )
}

export default Section
