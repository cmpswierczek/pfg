import React from "react"
import { Tab, Row, Col, Nav } from "react-bootstrap"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./Tabs.module.scss"
import Button from "../Button/Button"
import slugify from "slugify"

interface TabProps {
  name: string
  image: string
  subservices: string
  order: number
  slug: string
}

interface Props {}

const TabComponent = (props: TabProps) => {
  const items = props.subservices.split(",")
  const length = items.length
  const list1 = items.slice(0, length / 2)
  const list2 = items.slice(length / 2)
  return (
    <Row className={styles.slide}>
      <Col md={4} className={styles.col}>
        <img
          src={props.image}
          className={styles.img}
          alt={props.name}
          loading="lazy"
        />
      </Col>
      <Col md={6} xs={12} className={styles.content}>
        <Row>
          <Col md={12} xs={12}>
            <div className={styles.subtitle}>
              {props.slug === "program-badan-przesiewowych"
                ? "ZADBAJ O SIEBIE"
                : props.slug === "nfz"
                ? "Świadczenia medyczne wykonywane w ramach kontraktu z NFZ"
                : props.name}
            </div>
            <div className={styles.line}></div>

            {props.slug === "program-badan-przesiewowych" && (
              <div>
                Zapraszamy do wykonania kolonoskopii w ramach Programu Badań
                Przesiewowych raka jelita grubego.
              </div>
            )}
            {props.slug === "nfz" && (
              <div>
                Szanowni Pacjenci, uprzejmie informujemy, że w 2022 roku Pracownia Endoskopii nie realizuje kontraktu z NFZ.
              </div>
            )}
            <Row>
              <Col md={5} sm={12}>
                <ul className={styles.items}>
                  {list1.map((el, i) => (
                    <li className={styles.item} key={i}>
                      <a
                        href={`/${props.slug}/${slugify(el, {
                          lower: true,
                        })}`}
                      >
                        {el}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={1}></Col>
              <Col md={6} sm={12}>
                <ul className={styles.items}>
                  {list2.map((el, i) => (
                    <li className={styles.item} key={i}>
                      <a
                        href={`/${props.slug}/${slugify(el, {
                          lower: true,
                        })}`}
                      >
                        {el}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
            {props.slug === "program-badan-przesiewowych" && (
              <div>
                <Button
                  label="Dowiedz się więcej"
                  secondary={true}
                  internalLink={`/${props.slug}/o-programie`}
                  className={styles.btnMore}
                />
              </div>
            )}
            {props.slug === "nfz" && (
              <div>
                <Button
                  label="Dowiedz się więcej"
                  secondary={true}
                  internalLink={`#nfz`}
                  className={styles.btnMore}
                />
              </div>
            )}
          </Col>
        </Row>
      </Col>
      <Col md={2} sm={12} className={styles.columnDots}>
        <div className={styles.dots}></div>
      </Col>
    </Row>
  )
}

const Tabs = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          services {
            nodes {
              image
              name
              subservices
              order
              slug
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.services.nodes.sort(
    (a: TabProps, b: TabProps) => a.order - b.order
  )
  return (
    <div className={styles.tabs}>
      <Tab.Container id="specs" defaultActiveKey="0">
        <Row>
          <Col lg={3} md={12}>
            <h2 className={styles.title}>Nasze usługi</h2>
          </Col>
          <Col lg={9} md={12}>
            <Nav variant="pills" className={styles.nav}>
              {data.map((s: TabProps, i: number) => (
                <Nav.Item className={styles.navItem} key={i}>
                  <Nav.Link eventKey={i} className={styles.btn}>
                    {s.name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row className={styles.slides}>
          <Col md={12} xs={8}>
            <Tab.Content>
              {queryResult.wpgraphql.services.nodes.map(
                (s: TabProps, i: number) => (
                  <Tab.Pane eventKey={i} key={i}>
                    <TabComponent
                      name={s.name}
                      image={s.image}
                      subservices={s.subservices}
                      order={s.order}
                      slug={
                        s.slug ||
                        slugify(s.name, {
                          lower: true,
                        })
                      }
                    />
                  </Tab.Pane>
                )
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Tabs
