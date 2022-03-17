import { graphql, useStaticQuery } from "gatsby"
import React, { useState, useEffect } from "react"
import { FixedObject } from "gatsby-image"
import cx from "classnames"

import styles from "./Header.module.scss"
import { Row, Col, Modal } from "react-bootstrap"
import Button from "../Button/Button"

interface Props {
  data?: {
    file: {
      childImageSharp: {
        fixed: FixedObject
      }
    }
  }
}

const Header = ({ data }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    setShowModal(!localStorage.getItem("ad-closed"));
  }, [])
  const queryResult = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxHeight: 150) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `
  )

  const handleClose = () => {
    localStorage.setItem("ad-closed", "true")
    setShowModal(false)
  }

  const navItems = [
    {
      label: "Aktualności",
      url: "/#blog",
    },
    {
      label: "O przychodni",
      url: "/#about",
    },
    {
      label: "Nasze usługi",
      url: "/#services",
    },
    {
      label: "Dla pacjenta",
      url: "/#patient",
    },
    {
      label: "Wyszukiwarka",
      url: "/wyszukiwarka"
    },
    {
      label: "Kontakt",
      url: "/#contact",
    },
  ]
  const image = queryResult.file.childImageSharp.fluid

  return (
    <>
      <Row className={styles.header}>
        <Col lg={4} md={10} sm={10} xs={10}>
          <a href="/">
            <img src="/img/logo.png" className={styles.logo} />
          </a>
        </Col>
        <Col lg={8} md={2} sm={2} xs={2}>
          <ul className={styles.nav}>
            {navItems.map((item, i) => (
              <li className={styles.navItem} key={i}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
            <li className={cx(styles.navItem, styles.btn)}>
              <Button
                label="Zapisz się"
                primary={true}
                link="https://pfg.medsoft.pl/WyszukajTermin"
              />
            </li>
            <li className={styles.navItem}>
              <a href="https://przychodniapfg.pl/"><img src="https://gastro111.home.pl/wpen/pl.png" /></a>
            </li>
            <li className={styles.navItem}>
              <a href="https://en.przychodniapfg.pl/"><img src="https://gastro111.home.pl/wpen/en.png" /></a>
            </li>
          </ul>
          <div
            className={styles.menu}
            onClick={() => setToggleMenu(!toggleMenu)}
          ></div>
        </Col>
      </Row>
      {toggleMenu && (
        <div
          className={styles.mobileMenu}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <div
            className={styles.mobileMenuBtn}
            onClick={() => setToggleMenu(!toggleMenu)}
          ></div>
          <ul className={styles.menuList}>
            {navItems.map(item => (
              <li className={styles.navItem}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
            <li className={styles.navItem}>
              <a href="https://przychodniapfg.pl/"><img src="https://gastro111.home.pl/wpen/pl.png" /></a>
            </li>
            <li className={styles.navItem}>
              <a href="https://en.przychodniapfg.pl/"><img src="https://gastro111.home.pl/wpen/en.png" /></a>
            </li>
          </ul>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className={styles.modal}>
          <div className={styles.modalImage}></div>
          <p className={styles.modalText}>
            Szanowni Pacjenci,
            <br />
            <br />
            Uprzejmie informujemy o uruchomieniu w przychodni PFG Endoterapia
            Poradni Bariatrycznej dla pacjentów z otyłością i otyłością
            olbrzymią.
            <br />
            <br />
            Zespół najwyższej klasy specjalistów chirurgii, jak prof. Wiesław
            Tarnowski, dr Paweł Jaworski i dr n. med. Artur Binda oraz
            endokorynologii dr n med. Michał Wąsowski konsultuje oraz
            kwalifikuje pacjentów do chirurgicznego leczenia otyłości. Pacjenci
            Poradni Bariatrycznej objęci są opieką psychologa oraz dietetyka.
            Zapewniamy kompleksową diagnostykę laboratoryjną i obrazową .
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Zamknij"
            secondary={true}
            className={styles.modalBtn}
            action={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header
