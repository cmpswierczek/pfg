import React from "react"
import Layout from "../Layout/Layout"

import styles from "./Doctor.module.scss"
import Button from "../Button/Button"
import { Row, Col } from "react-bootstrap"
import SEO from "../SEO"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  pathContext?: {
    name?: string
    medTitle?: string
    description?: string
    photo?: string
    specs?: string
    hours?: string
  }
}

const Doctor = (props: Props) => {
  if (!props.pathContext) {
    return
  }
  const queryResult = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "doctor_placeholder.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxHeight: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  const image = queryResult.file.childImageSharp.fluid
  return (
    <Layout>
      <SEO
        title={`${props.pathContext.medTitle || ""}${
          props.pathContext.name || ""
        }`}
        description={`${props.pathContext.medTitle || ""}${
          props.pathContext.name || ""
        } - specjalizacja: ${props.pathContext.specs || ""}`}
      />
      <div>
        <Button
          label="Wróć"
          secondary={true}
          internalLink={"/#doctors"}
          className={styles.btn}
        />
      </div>
      <Row className={styles.doctor}>
        <Col lg={3}>
          <img
            src={props.pathContext.photo || image.src}
            className={styles.img}
            alt={props.pathContext.name}
            loading="lazy"
          />
          <h1 className={styles.title}>
            {props.pathContext.medTitle}{" "}
            <span className={styles.orangeTitle}>{props.pathContext.name}</span>
          </h1>
          <div>Specjalizacja: <span className={styles.spec}>{props.pathContext.specs}</span></div>
        </Col>
        <Col lg={6}>
          <div
            dangerouslySetInnerHTML={{
              __html: props.pathContext.description
                ? props.pathContext.description.replace(/\n/g, "<br />")
                : "",
            }}
            className={styles.text}
          ></div>
        </Col>
        <Col lg={3}>
          {props.pathContext.hours && (
            <div className={styles.hours}>
              <div className={styles.hoursTitle}>Godziny przyjęć</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.pathContext.hours || "",
                }}
                className={styles.text}
              ></div>
            </div>
          )}
        </Col>
      </Row>
    </Layout>
  )
}

export default Doctor
