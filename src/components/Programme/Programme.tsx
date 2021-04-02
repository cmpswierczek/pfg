import React, { FunctionComponent } from "react"
import { Row, Col, Tab, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import styles from "./Programme.module.scss"
import slugify from "slugify"
import Layout from "../Layout/Layout"
import SEO from "../SEO"
import cn from "classnames"
import Button from "../Button/Button"

interface Props {
  pathContext: {
    items: TabProps[]
    title: string
    item: TabProps
    slug: string
    tabs: TabProps[]
  }
}

interface TabProps {
  title: string
  content: string
}

const TabComponent = (props: TabProps) => {
  return (
    <Row>
      <Col md={12}>
        <div className={styles.title}>{props.title}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
          className={styles.text}
        ></div>
      </Col>
    </Row>
  )
}

const Programme: FunctionComponent<Props> = props => {
  const dI = props.pathContext.items.findIndex(
    (el: any) =>
      slugify(el.title, {
        lower: true,
      }) === slugify(props.pathContext.item.title, { lower: true })
  )
  return (
    <Layout>
      <SEO
        title={props.pathContext.item.title}
        description={props.pathContext.item.content}
      />
      <div className={styles.tabs}>
        <div className={styles.content}>
          <Tab.Container defaultActiveKey={dI === -1 ? 0 : dI}>
            <Row>
              <Col md={4} sm={12}>
                <h1 className={styles.subtitle}>{props.pathContext.title}</h1>
                <Nav variant="pills" className={styles.nav}>
                  {props.pathContext.items.map((a: TabProps, i: number) => (
                    <Nav.Item className={styles.navItem} key={i}>
                      <Link
                        to={`/${props.pathContext.slug}/${slugify(a.title, {
                          lower: true,
                        })}`}
                        className={cn(styles.btn, {
                          [styles.active]:
                            a.title === props.pathContext.item.title,
                        })}
                      >
                        {a.title}
                      </Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col md={8}>
                <Tab.Content>
                  {props.pathContext.items.map((a: TabProps, i: number) => (
                    <Tab.Pane eventKey={i} key={a.title}>
                      <TabComponent title={a.title} content={a.content} />
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

export default Programme
