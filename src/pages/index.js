import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../css/tags.css'
import PostListItem from '../components/post-list-item'
import { getYearAsNumber } from '../utils/dateParser'


const BlogIndex = (props) => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const currentYear = new Date().getFullYear()

  const postsToShow = React.useMemo(() => {
    return posts.filter(({node: { frontmatter: {date} }}) => {
      return getYearAsNumber(date) === currentYear
    })
  }, [currentYear, posts])

  return (
    <Layout location={props.location} title={siteTitle}>
      <Seo
        title="PDEP"
        keywords={[
          `pdep`,
          `paradigmas`,
          `funcional`,
          `haskell`,
          `utn`,
          `logico`,
          `prolog`,
          `oop`,
          `objetos`,
          `wollok`,
        ]}
      />
      <Bio />
      {postsToShow.map(({ node }) => (
        <PostListItem key={node.id} node={node} />
      ))}
      {/* <div></div> */}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD-MM-YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
