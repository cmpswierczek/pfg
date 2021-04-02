module.exports = {
  siteMetadata: {
    title: `Polska Fundacja Gastroenterologii`,
    description: `Polska Fundacja Gastroenterologii od 1990 roku realizuje misję, związaną z kształceniem podyplomowym lekarzy w zakresie profilaktyki, diagnostyki i leczenia chorób przewodu pokarmowego, świadcząc jednocześnie usługi medyczne w tym zakresie.`,
    author: `Polska Fundacja Gastroenterologii`,
    siteUrl: `https://elegant-chandrasekhar-7bcde2.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        // url: `http://pfg.local/graphql`
        url: `https://serwer2011472.home.pl/wp/graphql`,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-173526553-1",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `https://elegant-chandrasekhar-7bcde2.netlify.app/`,
        sitemap: `https://elegant-chandrasekhar-7bcde2.netlify.app/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://elegant-chandrasekhar-7bcde2.netlify.app/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ["Poppins:300,400,500,700"],
        display: "swap",
      },
    },
    "gatsby-plugin-preact",
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        purgeOnly: ["components/"], // Purge only these files/folders
      },
    },
    `gatsby-plugin-client-side-redirect`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
