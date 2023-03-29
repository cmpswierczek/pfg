import React from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Bariatry from "../components/Bariatry/Bariatry"

interface Props {}

const PrivacyPolicyPage = (props: Props) => {
  return (
    <Layout>
      <SEO title="RODO" />
      <section style={{padding: '4rem 7rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '3rem'}}>RODO</h1>
        <p>
         Inspektorem Ochrony Danych Osobowych w: <br />
          1. Polskiej Fundacja Gastroenterologii z siedzibą w Warszawie (01-631), ul. Waryńskiego 10A,<br />
          2. Endoterapia Pfg Sp.z o. o. z siedzibą w Warszawie (01-631).<br />
             jest Pan Robert Wakoń, z którym można się kontaktować we wszystkich sprawach związanych z przetwarzaniem danych osobowych.<br />
        Możliwe formy kontaktu:<br />
        - listownie przesyłając korespondencję na nasz adres, z dopiskiem „IOD” <br />
        - mailowo na adres: iod@pfg.org.pl.<br />
          <a href="https://gastro111.home.pl/wp/wp-content/uploads/2023/03/obowiazek_informacyjny.pdf">Obowiązek infromacyjny</a> 
        </p>
      </section>
    </Layout>
  )
}

export default PrivacyPolicyPage
