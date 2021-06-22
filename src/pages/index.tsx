import React, { useEffect, FunctionComponent, useRef } from "react"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO"
import Banner from "../components/Banner/Banner"
import Slider from "../components/Slider/Slider"
import Tabs from "../components/Tabs/Tabs"
import Teaser from "../components/Teaser/Teaser"
import Doctors from "../components/Doctors/Doctors"
import Cards from "../components/Cards/Cards"
import Maps from "../components/Maps/Maps"
import TabsAbout from "../components/TabsAbout/TabsAbout"
import Newsletter from "../components/Newsletter/Newsletter"
import Contact from "../components/Contact/Contact"
import Blog from "../components/Blog/Blog"
import Section from "../components/Section/Section"
import ImageFile from "../components/ImageFile/ImageFile"

interface Props {
  data: {
    allMarkdownRemark: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const Index: FunctionComponent<Props> = props => {
  const refs = {
    blog: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    nfz: useRef<HTMLDivElement>(null),
    specs: useRef<HTMLDivElement>(null),
    patient: useRef<HTMLDivElement>(null),
    newsletter: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    maps: useRef<HTMLDivElement>(null),
    doctors: useRef<HTMLDivElement>(null),
    imageFile: useRef<HTMLDivElement>(null),
  }
  useEffect(() => {
    const id = (props as any).location.hash.replace("#", "")
    if (!id) {
      return
    }
    const ref = (refs as any)[id]
    if (ref.current !== null) {
      ref.current.scrollIntoView({ block: "start" })
    }
  }, [])
  return (
    <Layout>
      <SEO title="Przychodnia" lang="pl" />
      <section id="main">
        <Banner />
      </section>
      <div ref={refs.specs}>
        <Section id="specs">
          <Slider />
        </Section>
      </div>
      <div ref={refs.blog}>
        <Section id="blog">
          <Blog />
        </Section>
      </div>
      <div ref={refs.about}>
        <Section id="about">
          <Teaser />
        </Section>
      </div>
      <div ref={refs.services}>
        <Section id="services">
          <Tabs />
        </Section>
      </div>
      <div ref={refs.doctors}>
        <Section id="doctors">
          <Doctors />
        </Section>
      </div>
      <div ref={refs.nfz}>
        <Section id="nfz">
          <TabsAbout />
        </Section>
      </div>
      <div ref={refs.patient}>
        <Section id="patient">
          <Cards />
        </Section>
      </div>
      <div ref={refs.imageFile}>
        <Section id="imageFile">
          <ImageFile />
        </Section>
      </div>
      <div>
        <iframe width="1400" height="787.5" src="https://www.youtube-nocookie.com/embed/hXqv57GqMB4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div ref={refs.newsletter}>
        <Section id="newsletter">
          <Newsletter />
        </Section>
      </div>
      <div ref={refs.contact}>
        <Section id="contact">
          <Contact />
        </Section>
      </div>
      <div ref={refs.maps}>
        <Section id="maps">
          <Maps />
        </Section>
      </div>
      <h1 style={{ visibility: "hidden" }}>Polska Fundacja Gastrologiczna</h1>
    </Layout>
  )
}

export default Index
