import React from "react"

import { Row, Col } from "react-bootstrap"

import styles from "./Maps.module.scss"
import { useStaticQuery, graphql } from "gatsby"

interface Props {}

interface MapProps {
  name: string
  address: string
  hours: string
  phone: string
  fax: string
  email: string
  google_maps_link: string
  info: string;
}

const Map = (props: MapProps) => {
  return (
    <Row className={styles.map}>
      <Col lg={8} md={12}>
        <iframe
          src={props.google_maps_link}
          width="100%"
          height="345"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          loading="lazy"
        ></iframe>
        <div className={styles.additionalInfo}>{props.info}</div>
      </Col>
      <Col lg={4} md={12} className={styles.col}>
        <div className={styles.title}>{props.name}</div>
        <div className={styles.info}>
          <div className={styles.pinIcon}></div>
          <div className={styles.text}>
            <div dangerouslySetInnerHTML={{ __html: props.address }}></div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.clockIcon}></div>
          <div className={styles.text}>
            Godziny otwarcia:
            <br />
            <div dangerouslySetInnerHTML={{ __html: props.hours }}></div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.phoneIcon}></div>
          <div className={styles.text}>
            <a href={`tel:${props.phone.replace(/ /g, '')}`}>tel. {props.phone}</a>
            <br />
            fax {props.fax}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.mailIcon}></div>
          <div className={styles.text}><a href={`mailto:${props.email}`}>{props.email}</a></div>
        </div>
      </Col>
    </Row>
    <h2 className={styles.title}>Nasi Partnerzy</h2>
    <Row className={styles.map}>
      <Col lg={4} md={6}>
        <img src="https://gastro111.home.pl/wp/Centrum_Mikrobioty_logo.png" />
      </Col>
    </Row>
  )
}

const Maps = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          locs {
            nodes {
              name
              address
              email
              fax
              google_maps_link
              hours
              phone
              info
            }
          }
        }
      }
    `
  )
  return (
    <>
      {queryResult.wpgraphql.locs.nodes.map((l: MapProps, i: number) => (
        <Map
          address={l.address}
          name={l.name}
          email={l.email}
          fax={l.fax}
          google_maps_link={l.google_maps_link}
          hours={l.hours}
          phone={l.phone}
          key={i}
          info={l.info}
        />
      ))}
    </>
  )
}

export default Maps
