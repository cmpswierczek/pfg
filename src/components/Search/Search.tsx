import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import slugify from "slugify"
import styles from "./Search.module.scss"

interface SearchItemProps {
  data: {
    path: string
    title: string
    context?: {
      title: string
      content: string
      medTitle: string
      description: string
      hours: string
      name: string
      photo: string
      slug: string
      specs: string
      subtitle: string
      text: string
    }
  }
}

const SearchItem = ({ data }: SearchItemProps) => {
  let title
  if (data.context?.medTitle) {
    title = `${data.context.medTitle} ${data.context.name}`
  } else if (data.context?.subtitle) {
    title = data.context?.subtitle
  } else {
    title = data.context?.title
  }
  return (
    <div className={styles.item}>
      <a href={data.path} className={styles.itemTitle}>
        {title}
      </a>
    </div>
  )
}

interface SearchItemFileProps {
  data: {
    title: string
    mediaType: string
    mediaItemUrl: string
  }
}

const SearchItemFile = ({ data }: SearchItemFileProps) => {
  return (
    <div className={styles.item}>
      <a href={data.mediaItemUrl} className={styles.itemTitle}>
        {data.title}
      </a>
    </div>
  )
}

interface Props {
  phrase: string
}

const Search = ({ phrase }: Props) => {
  const queryResult = useStaticQuery(
    graphql`
      query {
        wpgraphql {
          mediaItems(first: 1000) {
            nodes {
              title
              mediaType
              mediaItemUrl
            }
          }
        }
        allSitePage {
          nodes {
            id
            path
            context {
              content
              medTitle
              description
              hours
              name
              photo
              slug
              specs
              subtitle
              text
              title
            }
          }
        }
      }
    `
  )
  const pages = queryResult.allSitePage.nodes
  const media = queryResult.wpgraphql.mediaItems.nodes

  return (
    <div className={styles.search}>
      <h3 className={styles.subtitle}>Strony</h3>
      <div className={styles.list}>
        {pages
          .filter((p: any) => {
            return JSON.stringify(p)
              .toLowerCase()
              .includes(phrase.toLowerCase())
          })
          .map((p: any) => (
            <SearchItem data={p} />
          ))}
      </div>
      <h3 className={styles.subtitle}>Pliki</h3>
      <div className={styles.list}>
        {media
          .filter((p: any) => {
            return JSON.stringify(p)
              .toLowerCase()
              .includes(phrase.toLowerCase())
          })
          .filter((p: any) => {
            return p.mediaType === "file"
          })
          .map((p: any) => (
            <SearchItemFile data={p} />
          ))}
      </div>
    </div>
  )
}

export default Search
