import React from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Preparation from "../components/Preparation/Preparation"

interface Props {}

const PreparationPage = (props: Props) => {
  return (
    <Layout>
      <SEO title="Przygotowanie do badań" description="Przygotowanie do badań - Przychodnia i Endoterapia Polskiej Fundacji Gastroenterologii" />
      <section>
        <Preparation />
      </section>
      <h1 style={{ visibility: "hidden" }}>Przygotowanie do badań</h1>
    </Layout>
  )
}

export default PreparationPage
