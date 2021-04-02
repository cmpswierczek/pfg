import React, { FunctionComponent } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import Img from "gatsby-image"

import styles from "./Service.module.scss"
import Button from "../Button/Button"
import slugify from "slugify"
import cn from "classnames"
import Layout from "../Layout/Layout"
import SEO from "../SEO"

interface Props {
  pathContext: {
    items: ServiceProps[]
    title: string
    item: ServiceProps
    slug: string
    parent: string
    subCategory: string
  }
}

interface Doctor {
  specs: string
  spec?: string
  name: string
  medTitle: string
  photo: string
  order: string
}

interface ServiceProps {
  name: string
  text: string
  doctors: Doctor[]
  cat: string
}

const Doctor = (props: Doctor) => {
  return (
    <Row className={styles.slide}>
      <Col lg={6} md={12}>
        <img
          src={props.photo}
          className={styles.img}
          alt={props.name}
          loading="lazy"
        />
      </Col>
      <Col lg={6} md={12} className={styles.doc}>
        <div className={styles.docTitle}>{props.medTitle}</div>
        <div className={styles.docName}>{props.name}</div>
        <div className={styles.docSpec}>
          Specjalizacja: <span>{props.specs}</span>
        </div>
        <div className={styles.btns}>
          <Button
            label="Grafik"
            primary={true}
            className={styles.btnTerm}
            internalLink="/"
          />
          <Button
            label="Więcej"
            secondary={true}
            internalLink={`/${slugify(props.name, {
              lower: true,
            })}/`}
          />
        </div>
      </Col>
    </Row>
  )
}

const TabComponent = (props: ServiceProps) => {
  return (
    <Row>
      <Col md={12}>
        <div className={styles.title}>{props.name}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
          className={styles.text}
        ></div>
        <Row className={styles.doctors}>
          {props.doctors.map((d: Doctor, i: number) => (
            <Col lg={6} md={6} sm={6} xs={12} className={styles.doctor}>
              <Doctor
                key={i}
                name={d.name}
                medTitle={d.medTitle}
                photo={d.photo || "/img/doctor_placeholder.png"}
                specs={d.specs}
                order={d.order}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

const Service: FunctionComponent<Props> = props => {
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
          doctors(first: 100) {
            nodes {
              name
              medTitle
              description
              photo
              specs
              hours
              spec
            }
          }
        }
        file(relativePath: { eq: "service.jpeg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  const doctors = queryResult.wpgraphql.doctors.nodes
  const items = props.pathContext.items.filter(
    item => !props.pathContext.parent ? item.cat === props.pathContext.item.cat : item.cat === props.pathContext.parent
  )
  const subItems = props.pathContext.items.filter(
    item => !props.pathContext.parent ? item.cat === props.pathContext.item.name.toLowerCase() : item.cat === props.pathContext.item.cat
  )
  return (
    <Layout>
      <SEO
        title={props.pathContext.item.name}
        description={props.pathContext.item.text}
      />
      <div className={styles.tabs}>
        <Img
          fluid={queryResult.file.childImageSharp.fluid}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.content}>
          <Tab.Container id="specs" defaultActiveKey={dI === -1 ? 0 : dI}>
            <Row>
              <Col md={4} sm={12}>
                <h1 className={styles.subtitle}>{props.pathContext.title}</h1>
                <Nav variant="pills" className={styles.nav}>
                  {items.map((a: ServiceProps, i: number) => (
                    <Nav.Item className={styles.navItem} key={i}>
                      <Link
                        to={`/${props.pathContext.slug}/${slugify(a.name, {
                          lower: true,
                        })}`}
                        className={cn(styles.btn, {
                          [styles.active]:
                            a.name === props.pathContext.item.name,
                        })}
                      >
                        {a.name}
                      </Link>
                      {((!props.pathContext.parent && a.name === props.pathContext.item.name) || a.name.toLowerCase() === props.pathContext.subCategory) && (
                        <div className={styles.subitems}>
                          {subItems.map((a: ServiceProps, i: number) => (
                            <Nav.Item className={styles.navItem} key={i}>
                              <Link
                                to={`/${
                                  props.pathContext.slug
                                }/${a.cat}/${slugify(a.name, { lower: true })}`}
                                className={cn(styles.btn, {
                                  [styles.active]:
                                    a.name === props.pathContext.item.name,
                                })}
                              >
                                {a.name}
                              </Link>
                            </Nav.Item>
                          ))}
                        </div>
                      )}
                    </Nav.Item>
                  ))}
                </Nav>
                <div>
                  <Button
                    label="Wróć"
                    secondary={true}
                    internalLink={"/#services"}
                    className={styles.backBtn}
                  />
                </div>
              </Col>
              <Col md={8}>
                <Tab.Content>
                  {props.pathContext.items.map((a: ServiceProps, i: number) => (
                    <Tab.Pane eventKey={i} key={a.name}>
                      <TabComponent
                        name={a.name}
                        text={a.text}
                        cat={a.cat}
                        doctors={doctors.filter(
                          (d: any) =>
                            d.spec
                              .toLowerCase()
                              .trim()
                              .indexOf(a.name.toLowerCase().trim()) !== -1
                        )}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </Layout>
  )
}

export default Service
