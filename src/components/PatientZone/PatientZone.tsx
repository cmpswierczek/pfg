import React, { FunctionComponent } from "react"

import styles from "./PatientZone.module.scss"
import { Tab, Row, Col, Nav } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import Button from "../Button/Button"
import slugify from "slugify"
import cn from "classnames"
import Layout from "../Layout/Layout"
import SEO from "../SEO"

interface Props {
  pathContext: {
    items: TabProps[]
    title: string
    item: TabProps
  }
}

interface TabProps {
  name: string
  text: string
  order?: number
  anchor?: string
}

const TabComponent = (props: TabProps) => {
  return (
    <Row>
      <Col md={12}>
        <h2 className={styles.title}>{props.name}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
          className={styles.text}
        ></div>
      </Col>
    </Row>
  )
}

const PatientZone: FunctionComponent<Props> = props => {
  const dI = props.pathContext.items.findIndex(
    (el: any) =>
      slugify(el.name, {
        lower: true,
      }) === slugify(props.pathContext.item.name, { lower: true })
  )

  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          patientZones {
            nodes {
              name
              text
              order
              anchor
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
  const data = queryResult.wpgraphql.patientZones.nodes.sort(
    (a: TabProps, b: TabProps) => a.order && b.order && a.order - b.order
  )
  return (
    <Layout>
      <SEO
        title={props.pathContext.item.name}
        description={props.pathContext.item.text}
      />
      <div className={styles.tabs}>
        <Tab.Container id="specs" defaultActiveKey={dI === -1 ? 0 : dI}>
          <Row>
            <Col lg={5} md={6} sm={12}>
              <Nav variant="pills" className={styles.nav}>
                {data.map((a: TabProps, i: number) => (
                  <Nav.Item className={styles.navItem} key={i}>
                    <Link
                      to={`/strefa-pacjenta/${slugify(a.name, {
                        lower: true,
                      })}`}
                      className={cn(styles.btn, {
                        [styles.active]: a.name === props.pathContext.item.name,
                      })}
                    >
                      {a.name}
                    </Link>
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
            <Col lg={7} md={6}>
              <Tab.Content>
                {data.map((a: TabProps, i: number) => (
                  <Tab.Pane eventKey={i}>
                    <TabComponent name={a.name} text={a.text} />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Layout>
  )
}

export default PatientZone
