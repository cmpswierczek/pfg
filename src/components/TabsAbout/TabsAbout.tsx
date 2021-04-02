import React from "react"

import styles from "./TabsAbout.module.scss"
import { Tab, Row, Col, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

interface Props {}

interface TabProps {
  name: string
  contentFirst: string
  contentSecond: string
  order: number
}

const TabComponent = (props: TabProps) => {
  return (
    <Row>
      <Col md={6}>
        <div className={styles.pageIcon}></div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.contentFirst.replace(/\n/g, "<br />"),
          }}
          className={styles.text}
        ></div>
      </Col>
      <Col md={6}>
        <div className={styles.listIcon}></div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.contentSecond.replace(/\n/g, "<br />"),
          }}
          className={styles.text}
        ></div>
      </Col>
    </Row>
  )
}

const TabsAbout = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          abouts {
            nodes {
              name
              contentFirst
              contentSecond
              order
            }
          }
        }
        file(relativePath: { eq: "about.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.abouts.nodes.sort((a: TabProps, b: TabProps) => a.order - b.order);
  return (
    <div className={styles.tabs}>
      <Tab.Container id="specs" defaultActiveKey="0">
        <Row>
          <Col md={4} sm={12}>
            <Img
              fluid={queryResult.file.childImageSharp.fluid}
              className={styles.image}
              loading="lazy"
            />
            <Nav variant="pills" className={styles.nav}>
              {data.map((a: TabProps, i: number) => (
                <Nav.Item className={styles.navItem} key={i}>
                  <Nav.Link eventKey={i} className={styles.btn}>
                    {a.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md={8}>
            <Tab.Content>
              {data.map((a: TabProps, i: number) => (
                <Tab.Pane eventKey={i} key={i}>
                  <TabComponent
                    name={a.name}
                    contentFirst={a.contentFirst}
                    contentSecond={a.contentSecond}
                    order={a.order}
                  />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default TabsAbout
