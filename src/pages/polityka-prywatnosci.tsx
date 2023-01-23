import React from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Bariatry from "../components/Bariatry/Bariatry"

interface Props {}

const PrivacyPolicyPage = (props: Props) => {
  return (
    <Layout>
      <SEO title="Polityka prywatności" />
      <section style={{padding: '4rem 7rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '3rem'}}>Polityka prywatności</h1>
        <p>
          Zgodnie z&nbsp;art. 13 og&oacute;lnego rozporządzenia o&nbsp;ochronie
          danych osobowych z&nbsp;dnia 27 kwietnia
          <br />
          2016 r. (Dz. Urz. UE L 119 z&nbsp;04.05.2016) informuję, iż:
          <br />
          1) administratorem Pani/Pana danych osobowych jest <br />Polska Fundacja Gastroenterologii z
          siedzibą 00-631 Warszawa, ul. Ludwika Waryńskiego 10A<br />
          i Endoterapia PFG Sp. z o.o. z siedzibą 00-631 Warszawa, ul. Ludwika Waryńskiego 10A
          <br />
          2) Robert Wakoń; kontakt z inspektorem ochrony danych IOD &ndash;
          r.wakon@rprotection.com.pl
          <br />
          3) Pani/Pana dane osobowe przetwarzane będą w&nbsp;celu świadczenia
          usług medycznych -<br />
          na&nbsp;podstawie art. 6 ust. 1 lit. c og&oacute;lnego rozporządzenia
          o&nbsp;ochronie danych osobowych
          <br />
          z&nbsp;dnia 27 kwietnia 2016 r.,&nbsp;na&nbsp;podstawie art. 9 ust.1
          lit. h og&oacute;lnego rozporządzenia
          <br />
          o&nbsp;ochronie danych osobowych z&nbsp;dnia 27 kwietnia 2016 r., oraz
          na podstawie ustawy z dnia
          <br />6 listopada 2008 r. o prawach pacjenta i Rzecznika Praw Pacjenta
          (Dz. U. z 2009 roku Nr
          <br />
          52 poz. 417 ze zm.) oraz Rozporządzenia Ministra Zdrowia z dnia 09
          listopada 2015 r. w<br />
          sprawie rodzaj&oacute;w i zakresu dokumentacji medycznej oraz sposobu
          jej przetwarzania
          <br />
          (Dz.U. 2015 poz. 2069
          <br />
          4) dostęp do Pani/Pana danych osobowych będą miały jedynie podmioty
          upoważnione na
          <br />
          podstawie przepis&oacute;w prawa
          <br />
          5) Pani/Pana dane osobowe przechowywane będą przez okres 20 lat,
          licząc od końca roku
          <br />
          kalendarzowego, w&nbsp;kt&oacute;rym dokonano ostatniego wpisu
          <br />
          6) posiada Pani/Pan prawo do&nbsp;żądania od administratora dostępu
          do&nbsp;swoich danych
          <br />
          osobowych, ich sprostowania usunięcia lub ograniczenia ich
          przetwarzania, przeniesienia
          <br />
          swoich danych osobowych, wniesienia sprzeciwu wobec ich przetwarzania,
          cofnięcia
          <br />
          zgody na przetwarzanie danych osobowych
          <br />
          7) ma Pani/Pan prawo wniesienia skargi do&nbsp;organu nadzorczego tj.
          Prezesa Urzędu Ochrony
          <br />
          Danych Osobowych - Warszawa ul. Stawki 2<br />
          8) podanie danych osobowych jest obligatoryjne na&nbsp;mocy przepisu
          prawa
          <br />
          9) Pani/Pana dane osobowe nie będą podlegać zautomatyzowanemu
          podejmowaniu decyzji,
          <br />w tym profilowaniu.
        </p>
      </section>
    </Layout>
  )
}

export default PrivacyPolicyPage
