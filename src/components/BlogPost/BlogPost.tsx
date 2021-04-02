import React from "react"
import Layout from "../Layout/Layout"

import styles from './BlogPost.module.scss'
import Button from "../Button/Button"
import SEO from "../SEO"

interface Props {
  pathContext: {
    slug: string
    title: string
    content: string
  }
}

const BlogPost = (props: Props) => {
  return (
    <Layout>
      <SEO title={props.pathContext.title || ""} description={props.pathContext.content} lang="pl" />
        <div className={styles.blogpost}>
            <div>
              <Button
                label="Wróć"
                secondary={true}
                internalLink={"/#blog"}
                className={styles.backBtn}
              />
            </div>
            <h1 className={styles.title}>{props.pathContext.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: props.pathContext.content }}></div>
        </div>
    </Layout>
  )
}

export default BlogPost
