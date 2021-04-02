import React from "react"
import { Row, Col } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import styles from "./Teaser.module.scss"

interface Props {}
interface Info {
  image: string
  name: string
  text: string
  section: string
}

const Teaser = (props: Props) => {
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
        file(relativePath: { eq: "teaser_o_przychodni.png" }) {
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
    (i: Info) => i.section === "o przychodni"
  )
  return (
    <>
      {data.map((i: Info, index: number) => (
        <Row className={styles.teaser} key={index}>
          <Col lg={5} md={12}>
            <Img fluid={queryResult.file.childImageSharp.fluid} className={styles.img} alt={i.name} loading="lazy" imgStyle={{objectFit: 'contain', objectPosition: 'center'}} />
          </Col>
          <Col lg={1}></Col>
          <Col lg={6} md={12} className={styles.content}>
            <h2>{i.name}</h2>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: i.text.replace(/\n/g, "<br />") }}
            ></div>
          </Col>
        </Row>
      ))}
    </>
  )
}

export default Teaser
