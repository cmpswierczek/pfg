import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col, Tab, Nav } from "react-bootstrap"

import styles from "./Preparation.module.scss"
import Button from "../Button/Button"

interface Props {}

interface PreparationProps {
  name: string
  text: string
  order: number
}

const TabComponent = (props: PreparationProps) => {
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

const Preparation = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          preparations {
            nodes {
              name
              text
              order
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.preparations.nodes
  return (
    <div className={styles.tabs}>
      <Tab.Container id="specs" defaultActiveKey="0">
        <Row>
          <Col md={4} sm={12}>
            <Nav variant="pills" className={styles.nav}>
              {data
                .sort(
                  (a: PreparationProps, b: PreparationProps) =>
                    a.order - b.order
                )
                .map((a: PreparationProps, i: number) => (
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
                internalLink={"/#patient"}
                className={styles.backBtn}
              />
            </div>
          </Col>
          <Col md={8}>
            <Tab.Content>
              {data.map((a: PreparationProps, i: number) => (
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

export default Preparation
