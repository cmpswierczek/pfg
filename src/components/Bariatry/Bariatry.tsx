import React from "react"

import styles from "./Bariatry.module.scss"
import { Tab, Row, Col, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"
import Button from "../Button/Button"

interface Props {}

interface TabProps {
  name: string
  text: string
  order: number
}

const TabComponent = (props: TabProps) => {
  return (
    <Row>
      <Col md={12}>
        <div className={styles.title}>{props.name}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text.replace(/\n/g, "<br />"),
          }}
          className={styles.text}
        ></div>
      </Col>
    </Row>
  )
}

const Bariatry = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          bariatries {
            nodes {
              name
              text
              order
            }
          }
        }
        file(relativePath: { eq: "about.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.bariatries.nodes.sort(
    (a: TabProps, b: TabProps) => a.order - b.order
  )
  return (
    <div className={styles.tabs}>
      <Tab.Container id="specs" defaultActiveKey="0">
        <Row>
          <Col md={4} sm={12}>
            <Nav variant="pills" className={styles.nav}>
              {data.map((a: TabProps, i: number) => (
                <Nav.Item className={styles.navItem}>
                  <Nav.Link eventKey={i} className={styles.btn}>
                    {a.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div>
              <Button
                label="Wróć"
                secondary={true}
                internalLink={"/#specs"}
                className={styles.backBtn}
              />
            </div>
          </Col>
          <Col md={8}>
            <Tab.Content>
              {data.map((a: TabProps, i: number) => (
                <Tab.Pane eventKey={i}>
                  <TabComponent name={a.name} text={a.text} order={a.order} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Bariatry
