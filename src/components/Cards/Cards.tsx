import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import styles from "./Cards.module.scss"
import { Row, Col } from "react-bootstrap"

interface Props {}

interface CardProps {
  name: string
  icon: string
  order: number
  url: string
}

const Card = (props: CardProps) => {
  return (
    <a href={props.url} className={styles.card}>
      <img src={props.icon} className={styles.img} alt={props.name} loading="lazy" />
      <div className={styles.cardTitle}>{props.name}</div>
    </a>
  )
}

const Cards = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          patients {
            nodes {
              name
              icon
              order
              url
            }
          }
        }
      }
    `
  )
  const data = queryResult.wpgraphql.patients.nodes.sort(
    (a: CardProps, b: CardProps) => a.order - b.order
  )
  return (
    <div className={styles.cards}>
      <h2 className={styles.title}>Dla pacjenta</h2>
      <Row>
        {data.map((p: CardProps, i: number) => (
          <Col md={4} key={i}>
            <Card name={p.name} icon={p.icon} order={p.order} url={p.url} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cards
