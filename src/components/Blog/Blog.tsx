import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Carousel } from "react-bootstrap"

import styles from "./Blog.module.scss"
import Button from "../Button/Button"

interface Props {}

interface SlideProps {
  title: string
  slug: string
  content: string
}

const Blog = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          posts {
            nodes {
              slug
              title
              content
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.posts.nodes
  return (
    <div className={styles.blog}>
      <h2 className={styles.title}>Aktualności</h2>
      <Carousel
        className={styles.slider}
        indicators={false}
        nextIcon={<span aria-hidden="true" className={styles.arrowRight} />}
        prevIcon={<span aria-hidden="true" className={styles.arrowLeft} />}
        pause="hover"
      >
        {data.map((s: SlideProps, i: number) => (
          <Carousel.Item className={styles.carouselItem} key={i}>
            <div className={styles.post}>
              <div className={styles.postTitle}>{s.title}</div>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: `${s.content}`,
                }}
              ></div>
              <div className={styles.btnContainer}>
                <Button
                  label="Czytaj dalej"
                  internalLink={`/${s.slug}/`}
                  primary={true}
                  className={styles.btn}
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Blog
