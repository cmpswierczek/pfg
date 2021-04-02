import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import slugify from "slugify"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

import Button from "../Button/Button"
import { Row, Col } from "react-bootstrap"

import styles from "./Doctors.module.scss"

interface Props {}
interface DoctorProps {
  medTitle: string
  name: string
  specs: string
  photo: string
  order: number
}

const Doctor = (props: DoctorProps) => {
  return (
    <Row className={styles.slide}>
      <Col lg={6} md={12}>
        <img src={props.photo} className={styles.img} alt={props.name} loading="lazy" />
      </Col>
      <Col lg={6} md={12} className={styles.doc}>
        <div className={styles.docTitle}>{props.medTitle}</div>
        <div className={styles.docName}>{props.name}</div>
        <div className={styles.docSpec}>Specjalizacja: <span>{props.specs}</span></div>
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

const Doctors = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      {
        wpgraphql {
          doctors(first: 100) {
            nodes {
              name
              medTitle
              description
              photo
              specs
              hours
            }
          }
        }
        file(relativePath: { eq: "doctor_placeholder.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )
  const image = queryResult.file.childImageSharp.fluid
  const CustomRightArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest
    // onMove means if dragging or swiping in progress.
    return <i onClick={() => onClick()} className={styles.arrowRight}></i>
  }
  const CustomLeftArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest
    // onMove means if dragging or swiping in progress.
    return <i onClick={() => onClick()} className={styles.arrowLeft}></i>
  }
  const data = queryResult.wpgraphql.doctors.nodes.sort((a: DoctorProps, b: DoctorProps) => a.order - b.order);
  return (
    <div className={styles.doctors}>
      <h2 className={styles.title}>Nasi lekarze</h2>
      <Carousel
        className={styles.slider}
        responsive={responsive}
        customRightArrow={<CustomRightArrow onClick={() => {}} />}
        customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
        showDots={true}
      >
        {data.map((d: DoctorProps, i: number) => (
          <Doctor
            name={d.name}
            medTitle={d.medTitle}
            photo={d.photo || image.src}
            specs={d.specs}
            order={d.order}
            key={i}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default Doctors
