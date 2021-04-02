import React from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Bariatry from "../components/Bariatry/Bariatry"

interface Props {}

const BariatryPage = (props: Props) => {
  return (
    <Layout>
      <SEO title="Bariatria" description="Dziedzina medycyny, zajmująca się diagnozowaniem, określeniem przyczyn, profilaktyką i leczeniem otyłości, w tym metodami chirurgicznymi." />
      <h1 style={{ visibility: "hidden" }}>Bariatria</h1>
      <section>
        <Bariatry />
      </section>
    </Layout>
  )
}

export default BariatryPage
