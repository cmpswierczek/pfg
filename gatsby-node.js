/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const slugify = require("slugify")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(
    `
      {
        wpgraphql {
          posts {
            nodes {
              slug
              title
              content
            }
          }
          doctors {
            nodes {
              name
              medTitle
              description
              photo
              spec
              hours
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.wpgraphql.posts.nodes.forEach(node => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/components/BlogPost/BlogPost.tsx`),
        context: node,
      })
    })
    result.data.wpgraphql.doctors.nodes.forEach(node => {
      createPage({
        path: slugify(node.name, {
          lower: true,
        }),
        component: path.resolve(`./src/components/Doctor/Doctor.tsx`),
        context: node,
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === "production") {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const result = await graphql(
    `
      {
        wpgraphql {
          posts(first: 100) {
            nodes {
              slug
              title
              content
            }
          }
          doctors(first: 100) {
            nodes {
              name
              medTitle
              description
              photo
              specs
              hours
            }
          }
          serviceItems(first: 100) {
            nodes {
              cat
              name
              text
              order
            }
          }
          patientZones {
            nodes {
              name
              text
              order
              anchor
            }
          }
          screeningTabs {
            nodes {
              title
              content
              order
            }
          }
        }
      }
    `
  )
  result.data.wpgraphql.posts.nodes.forEach(node => {
    createPage({
      path: `${node.slug}/`,
      component: path.resolve(`./src/components/BlogPost/BlogPost.tsx`),
      context: node,
    })
  })
  result.data.wpgraphql.doctors.nodes.forEach(node => {
    createPage({
      path: `${slugify(node.name, {
        lower: true,
      })}/`,
      component: path.resolve(`./src/components/Doctor/Doctor.tsx`),
      context: node,
    })
  })
  result.data.wpgraphql.serviceItems.nodes
    .filter(s => s.cat === "konsultacje")
    .sort((a, b) => a.order - b.order)
    .forEach((node, _, arr) => {
      createPage({
        path: `konsultacje/${slugify(node.name, { lower: true })}`,
        component: path.resolve(`./src/components/Service/Service.tsx`),
        context: {
          item: node,
          items: arr,
          title: "Konsultacje",
          slug: "konsultacje",
          subtitle: `Konsultacje - ${node.name}`,
        },
      })
    })
  result.data.wpgraphql.serviceItems.nodes
    .filter(s => s.cat === "diagnostyka")
    .sort((a, b) => a.order - b.order)
    .forEach((node, _, arr) => {
      createPage({
        path: `diagnostyka/${slugify(node.name, { lower: true })}`,
        component: path.resolve(`./src/components/Service/Service.tsx`),
        context: {
          item: node,
          items: result.data.wpgraphql.serviceItems.nodes.sort((a, b) => a.order - b.order),
          title: "Badania i zabiegi",
          slug: "diagnostyka",
          subtitle: `Badania i zabiegi - ${node.name}`,
        },
      })
    })
  result.data.wpgraphql.serviceItems.nodes
    .filter(s => s.cat === "usg")
    .sort((a, b) => a.order - b.order)
    .forEach((node, _) => {
      createPage({
        path: `diagnostyka/usg/${slugify(node.name, { lower: true })}`,
        component: path.resolve(`./src/components/Service/Service.tsx`),
        context: {
          item: node,
          items: result.data.wpgraphql.serviceItems.nodes.filter(
            s => s.cat === "diagnostyka" || s.cat === "usg"
          ).sort((a, b) => a.order - b.order),
          title: "USG",
          slug: "diagnostyka",
          subtitle: `USG - ${node.name}`,
          parent: "diagnostyka",
          subCategory: "usg"
        },
      })
    })
  result.data.wpgraphql.screeningTabs.nodes
    .sort((a, b) => a.order - b.order)
    .forEach((node, _, arr) => {
      createPage({
        path: `program-badan-przesiewowych/${slugify(node.title, {
          lower: true,
        })}`,
        component: path.resolve(`./src/components/Programme/Programme.tsx`),
        context: {
          item: node,
          items: arr,
          title: "Program badań przesiewowych",
          slug: "program-badan-przesiewowych",
          subtitle: `Program badań przesiewowych - ${node.title}`,
        },
      })
    })
  result.data.wpgraphql.patientZones.nodes
    .sort((a, b) => a.order && b.order && a.order - b.order)
    .forEach((node, _, arr) => {
      createPage({
        path: `strefa-pacjenta/${slugify(node.name, { lower: true })}`,
        component: path.resolve(`./src/components/PatientZone/PatientZone.tsx`),
        context: {
          item: node,
          items: arr,
          title: "Strefa pacjenta",
          subtitle: `Strefa pacjenta - ${node.name}`,
          text: node.text,
        },
      })
    })

  createRedirect({ fromPath: "/pl", toPath: "/", isPermanent: true })
  createRedirect({ fromPath: "/en", toPath: "/", isPermanent: true })
  createRedirect({
    fromPath: "/pl/kontakt/pacjent/",
    toPath: "/#contact",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/pl/strefa-pacjenta/przygotowanie-do-badan/",
    toPath: "/przygotowanie-do-badan",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/pl/nasi-specjalisci/nasi-lekarze/",
    toPath: "/",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/pl/strefa-pacjenta/rezerwacja-wizyty/",
    toPath: "/",
    isPermanent: true,
  })
  createRedirect({ fromPath: "/pl/nfz/", toPath: "/#nfz", isPermanent: true })
  createRedirect({
    fromPath: "/pl/strefa-pacjenta/cennik-pfg/",
    toPath: "/strefa-pacjenta#cennik",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/anna-pietrzak/",
    toPath: "/anna-pietrzak",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/cichocki-andrzej/",
    toPath: "/andrzej-cichocki",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/zych-wlodzimierz/",
    toPath: "/wlodzimierz-zych",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/kotowski-bronislaw-2/",
    toPath: "/broniskaw-kotowski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/jakub-dobruch/",
    toPath: "/jakub-dobruch",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/prof-dr-hab-n-med-piotr-socha/",
    toPath: "/piotr-socha",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/przytulski-krzysztof/",
    toPath: "/krzysztof-przytulski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/tarnowski-wieslaw/",
    toPath: "/wieslaw-tarnowski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/pachlewski-jacek/",
    toPath: "/jacek-pachlewski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/rupinski-maciej/",
    toPath: "/maciej-rupinski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/krawczyk-marek/",
    toPath: "/marek-krawczyk",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/maciej-nowak/",
    toPath: "/maciej-nowak",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/wociel-tomasz/",
    toPath: "/tomasz-wociel",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/jakub-slowik/",
    toPath: "/",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/kolodziejczak-malgorzata/",
    toPath: "/malgorzata-kolodziejczak",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/koprowski-adam/",
    toPath: "/adam-koprowski",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/people/regula-jaroslaw/",
    toPath: "/jaroslaw-regula",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/konsultacje/",
    toPath: "/konsultacje/gastroenterologia",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/diagnostyka/",
    toPath: "/diagnostyka/gastroskopia",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/pl/program-badan-przesiewowych/",
    toPath: "/program-badan-przesiewowych",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/strefa-pacjenta/",
    toPath: "/przygotowanie-do-badan",
    isPermanent: true,
  })
  createRedirect({
    fromPath: "/program-badan-przesiewowych",
    toPath: "/program-badan-przesiewowych/o-programie",
    isPermanent: true,
  })
}
