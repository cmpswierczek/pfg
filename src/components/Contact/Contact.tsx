import React, { FormEvent, useRef } from "react"
import { Row, Col } from "react-bootstrap"
import cx from "classnames"
import axios, { AxiosRequestConfig } from "axios"
import * as qs from "query-string"
import { globalHistory as history } from "@reach/router"

import styles from "./Contact.module.scss"
import Button from "../Button/Button"

interface Props {}

const Contact = (props: Props) => {
  const { location } = history
  const refs: { [ref: string]: any } = {
    "form-name": useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
    subject: useRef<HTMLInputElement>(null),
  }
  const domRef = useRef<HTMLFormElement>(null)
  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()
    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    const formData: any = {}
    Object.keys(refs).map((key: string) => {
      formData[key] = refs[key].current.value
    })

    // Set options for axios. The URL we're submitting to
    // (this.props.location.pathname) is the current page.
    const axiosOptions: AxiosRequestConfig = {
      url: location.pathname,
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: encode(formData),
    }

    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      .then(response => {
        if (domRef.current) {
          domRef.current.reset()
        }
      })
      .catch(err => {})
  }
  return (
    <Row className={styles.contact}>
      <Col md={4}>
        <div className={styles.img}></div>
      </Col>
      <Col md={8}>
        <form
          name="Contact Form"
          method="POST"
          data-netlify="true"
          ref={domRef}
          onSubmit={event => handleSubmit(event)}
        >
          <input
            ref={refs["form-name"]}
            type="hidden"
            name="form-name"
            value="Contact Form"
          />
          <input
            ref={refs.subject}
            type="hidden"
            name="subject"
            value="Nowa wiadomość z formularza kontaktowego PFG"
          />
          <h2 className={styles.title}>Kontakt</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Imię:</label>
            <input
              ref={refs.name}
              id="name"
              className={styles.input}
              placeholder="Twoje imię"
              name="name"
              required={true}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail:</label>
            <input
              ref={refs.email}
              id="email"
              type="email"
              className={styles.input}
              placeholder="Twój e-mail"
              name="email"
              required={true}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="message">Wiadomość:</label>
            <textarea
              ref={refs.message}
              id="message"
              className={cx(styles.input, styles.textarea)}
              placeholder="Wiadomość..."
              name="message"
              required={true}
            />
          </div>
          <div className={styles.inputGroupCheckbox}>
            <input type="checkbox" required className={styles.checkbox} />
            <label>
              Wyrażam zgodę na przetwarzanie przez Endoterapia PFG Sp. z o.o. z
              siedzibą w 00-631 Warszawa, ul. Waryńskiego 10A moich danych
              osobowych podanych w formularzu kontaktowym w celu udzielania
              odpowiedzi na zadane przeze mnie pytanie, zgodnie z przepisami
              ogólnego rozporządzenia o ochronie danych 2016/679 (RODO).
              Informacje o przetwarzaniu danych osobowych w Endoterapia PFG Sp.
              z o.o., dostępne są w naszej placówce oraz pod 
              <a href="/polityka-prywatnosci/"> tym adresem</a> Zgoda jest
              dobrowolna i może być wycofana w każdej chwili.
            </label>
          </div>
          <div className={styles.inputGroupCheckbox}>
            <input type="checkbox" className={styles.checkbox} />
            <label>
              Wyrażam zgodę na przetwarzanie przez Endoterapia PFG Sp. z o.o., z
              siedzibą w 00-631 Warszawa, ul. Waryńskiego 10A. moich danych
              osobowych podanych w formularzu kontaktowym w celach
              marketingowych, zgodnie z zapisami Ustawy o ochronie danych
              osobowych z dnia 10 maja 2018 r.
            </label>
          </div>
          <div className={styles.inputGroupCheckbox}>
            <input type="checkbox" className={styles.checkbox} />
            <label>
              Wyrażam zgodę na otrzymywanie z Endoterapia PFG Sp. z o.o., z
              siedzibą w 00-631 Warszawa, ul. Waryńskiego 10A.informacji
              handlowej o usługach świadczonych przez Spółkę, na podany przeze
              mnie w formularzu kontaktowym adres e-mail oraz numer telefonu,
              zgodnie z zapisami art. 172 Ustawy z dnia 16 lipca 2004 r. Prawo
              telekomunikacyjne (Dz.U. 2004 nr 171 poz. 1800). Zgoda jest
              dobrowolna i może być wycofana w każdej chwili.
            </label>
          </div>
          <Button
            label="Wyślij"
            primary={true}
            submit={true}
            className={styles.btn}
          />
        </form>
      </Col>
    </Row>
  )
}

export default Contact
