import React from "react"

import styles from "./Footer.module.scss"
import { Row, Col } from "react-bootstrap"
import Button from "../Button/Button"

interface Props {}

const Footer = (props: Props) => {
  return (
    <Row className={styles.footer}>
      <Col md={8} sm={12}>
        © PFG 2020.
      </Col>
      <Col md={5} sm={12} className={styles.nav}>
        <a href="/polityka-prywatnosci/">Polityka prywatności</a>
        <a href="/rodo/">RODO</a>
      </Col>
      <div className={styles.fixedBtns}>
        <a href="https://www.facebook.com/Polska-Fundacja-Gastroenterologii-102976498308334/" target="_blank" className={styles.fb}>
          <i className={styles.fbIcon}></i>
        </a>
        <Button
          className={styles.cta}
          link="tel:228256299"
          label="Rejestracja 22 8256299"
          primary={true}
        ></Button>
      </div>
      {/* <Col md={4} sm={12}>
        <ul className={styles.social}>
          <li>
            <a href="">
              <img />
            </a>
          </li>
        </ul>
      </Col> */}
    </Row>
  )
}

export default Footer
