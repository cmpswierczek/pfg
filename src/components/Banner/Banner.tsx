import React from "react"
import Img from "gatsby-image"
import { Container, Row, Col } from "react-bootstrap"
import cx from 'classnames'

import { useStaticQuery, graphql } from "gatsby"
import styles from "./Banner.module.scss"
import Button from "../Button/Button"

interface Props {}
interface Info {
  image: string
  name: string
  text: string
  section: string
}

const Banner = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          infos {
            nodes {
              image
              name
              text
              section
            }
          }
        }
        file(relativePath: { eq: "teaser_glowny.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.infos.nodes.filter(
    (i: Info) => i.section === "główny"
  )
  return (
    <>
      {data.map((i: Info, index: number) => (
        <Row className={styles.banner} key={index}>
        <div className={styles.circles}></div>
          <Col className={styles.bannerContent} md={6} sm={12}>
            <Row>
              <h2 className={styles.title}>{i.name}</h2>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: i.text.replace(/\n/g, "<br />") }}
              ></div>
            </Row>
            <Row className={cx(styles.row, styles['no-gutters'])}>
              <Col lg={4} md={6} xs={6}>
                <Button
                  label="Zapisz się"
                  link={"https://pfg.medsoft.pl/WyszukajTermin"}
                  primary={true}
                  className={styles.btn}
                />
              </Col>
              <Col lg={4} md={6} xs={6}>
                <Button
                  label="Nasze usługi"
                  internalLink={"/#services"}
                  secondary={true}
                  className={styles.btn}
                />
              </Col>
            </Row>
          </Col>
          <Col md={6} xs={12} className={styles.imgCol}>
            <Img fluid={queryResult.file.childImageSharp.fluid} className={styles.img} alt={i.name} loading="eager" />
          </Col>
        </Row>
      ))}
    </>
  )
}

export default Banner
