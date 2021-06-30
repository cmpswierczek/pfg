import React from "react"

import styles from "./YouTube.module.scss"

interface Props {}

const YouTube = (props: Props) => {
  return (
    <div className={styles.container}><iframe src="https://www.youtube-nocookie.com/embed/hXqv57GqMB4" frameborder="0" className={styles.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
  )
}

export default YouTube
