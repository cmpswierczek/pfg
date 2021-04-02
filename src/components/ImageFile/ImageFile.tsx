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

import styles from "./ImageFile.module.scss"

interface Props {}

interface TabProps {
  image: string
  file: string
  title: string
  order: number
}

const Tab = (props: TabProps) => {
  return (
    <Row className={styles.slide}>
      <Col lg={12} md={12}>
        <a className={styles.link} href={props.file} target="_blank">
          <img
            src={props.image}
            className={styles.img}
            alt={props.title}
            loading="lazy"
          />
        </a>
      </Col>
    </Row>
  )
}

const ImageFile = (props: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      {
        wpgraphql {
          imageFiles {
            nodes {
              title
              file
              image
              order
            }
          }
        }
      }
    `
  )
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
  const data = queryResult.wpgraphql.imageFiles.nodes.sort(
    (a: TabProps, b: TabProps) => a.order - b.order
  )
  return (
    <div className={styles.imageFile}>
      <Carousel
        className={styles.slider}
        responsive={responsive}
        customRightArrow={<CustomRightArrow onClick={() => {}} />}
        customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
        showDots={true}
      >
        {data.map((d: TabProps, i: number) => (
          <Tab
            title={d.title}
            image={d.image}
            file={d.file}
            key={i}
            order={d.order}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ImageFile
