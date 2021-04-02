import React, { useState } from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Search from "../components/Search/Search"

interface Props {}

const SearchPage = (props: Props) => {
  const [phrase, setPhrase] = useState("")
  return (
    <Layout>
      <SEO
        title="Wyszukiwarka"
        description="Wyszukiwarka - Przychodnia i Endoterapia Polskiej Fundacji Gastroenterologii"
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
        <h2>Wyszukiwarka</h2>
        <input
          style={{ marginTop: "2rem", padding: '1rem 2rem' }}
          value={phrase}
          onChange={e => setPhrase(e.target.value)}
          placeholder="Wpisz wybraną frazę"
        />
        <Search phrase={phrase} />
      </div>
    </Layout>
  )
}

export default SearchPage
