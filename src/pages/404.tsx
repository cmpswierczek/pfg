import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const NotFoundPage = ({ data }: Props) => {

  return (
    <Layout>
      <SEO title="404: Strona nie została odnaleziona" />
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        Strona nie istnieje
        </div>
    </Layout>
  )
}

export default NotFoundPage;