import React from "react"

import styles from "./Newsletter.module.scss"

interface Props {}

const Newsletter = (props: Props) => {
  return (
    <form className={styles.container}>
      <div className={styles.newsletter}>
        <input placeholder="Twój e-mail" className={styles.input} required/>
        <button className={styles.btn}>Newsletter</button>
      </div>
      <div className={styles.inputGroupCheckbox}>
        <input type="checkbox" required className={styles.checkbox} />
        <label>
          Wyrażam zgodę na przetwarzanie przez Endoterapia PFG Sp. z o.o. z
          siedzibą w 00-631 Warszawa, ul. Waryńskiego 10A moich danych osobowych
          podanych w formularzu kontaktowym w celu udzielania odpowiedzi na
          zadane przeze mnie pytanie, zgodnie z przepisami ogólnego
          rozporządzenia o ochronie danych 2016/679 (RODO). Informacje o
          przetwarzaniu danych osobowych w Endoterapia PFG Sp. z o.o., dostępne
          są w naszej placówce oraz pod
          <a href="/polityka-prywatnosci/"> tym adresem</a> Zgoda jest
          dobrowolna i może być wycofana w każdej chwili.
        </label>
      </div>
      <div className={styles.inputGroupCheckbox}>
        <input type="checkbox" className={styles.checkbox} />
        <label>
          Wyrażam zgodę na przetwarzanie przez Endoterapia PFG Sp. z o.o., z
          siedzibą w 00-631 Warszawa, ul. Waryńskiego 10A. moich danych
          osobowych podanych w formularzu kontaktowym w celach marketingowych,
          zgodnie z zapisami Ustawy o ochronie danych osobowych z dnia 10 maja
          2018 r.
        </label>
      </div>
      <div className={styles.inputGroupCheckbox}>
        <input type="checkbox" className={styles.checkbox} />
        <label>
          Wyrażam zgodę na otrzymywanie z Endoterapia PFG Sp. z o.o., z siedzibą
          w 00-631 Warszawa, ul. Waryńskiego 10A.informacji handlowej o usługach
          świadczonych przez Spółkę, na podany przeze mnie w formularzu
          kontaktowym adres e-mail oraz numer telefonu, zgodnie z zapisami art.
          172 Ustawy z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004
          nr 171 poz. 1800). Zgoda jest dobrowolna i może być wycofana w każdej
          chwili.
        </label>
      </div>
    </form>
  )
}

export default Newsletter
