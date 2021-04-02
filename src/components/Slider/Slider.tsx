import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Button from "../Button/Button"
import { Row, Col, Carousel } from "react-bootstrap"
import styles from "./Slider.module.scss"
import slugify from "slugify"
import Img from "gatsby-image"

interface Props {}

interface SlideProps {
  icon: string
  name: string
  description: string
  order: number
  image: string
}

const Slide = (props: SlideProps) => {
  return (
    <Row>
      <Col lg={3} md={2}></Col>
      <Col lg={6} md={8} className={styles.slide}>
        <img
          src={props.icon}
          className={styles.icon}
          alt={props.name}
          loading="lazy"
        />
        <div className={styles.title}>{props.name}</div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
        <Row className={styles.buttons}>
          <Col md={3} xs={8}>
            <Button
              label="O nas"
              internalLink={"/#about"}
              secondary={true}
              className={styles.btn}
            />
          </Col>
          <Col md={5} xs={8}>
            <Button
              label="Specjaliści / usługi"
              internalLink={`/konsultacje/${slugify(props.name, {
                lower: true,
              })}`}
              secondary={true}
              className={styles.btn}
            />
          </Col>
          <Col md={4} xs={8}>
            <Button
              label="Strefa Pacjenta"
              internalLink={"/#patient"}
              secondary={true}
              className={styles.btn}
            />
          </Col>
        </Row>

        <div className={styles.btnContainer}>
          {props.name === "Bariatria" && (
            <Button
              label="Dowiedz się więcej"
              internalLink={"/bariatria/"}
              primary={true}
              className={styles.bariatriaBtn}
            />
          )}
        </div>
      </Col>
      <Col lg={3} md={8}></Col>
    </Row>
  )
}

const Slider = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          specs {
            nodes {
              description
              icon
              name
              order
              image
            }
          }
        }
        file(relativePath: { eq: "sliderimg.jpeg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.specs.nodes.sort(
    (a: SlideProps, b: SlideProps) => a.order - b.order
  )
  return (
    <div className={styles.container}>
      <Img
        fluid={queryResult.file.childImageSharp.fluid}
        className={styles.image}
        loading="lazy"
        style={{position: "absolute"}}
      />
      <Carousel
        className={styles.slider}
        indicators={false}
        nextIcon={<span aria-hidden="true" className={styles.arrowRight} />}
        prevIcon={<span aria-hidden="true" className={styles.arrowLeft} />}
      >
        {data.map((s: SlideProps, i: number) => (
          <Carousel.Item key={i}>
            <Slide
              name={s.name}
              description={s.description}
              icon={s.icon}
              order={s.order}
              image={s.image}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
