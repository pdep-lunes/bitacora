import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import '../utils/tags.css';
import PostListItem from "../components/post-list-item";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="PDEP"
          keywords={[`pdep`, `paradigmas`, `funcional`, `haskell`, `utn`, `logico`, `prolog`, `oop`, `objetos`, `wollok`]}
        />
        <Bio />
        {posts.map(({ node }, index) => (
          <PostListItem
            key={index}
            node={node}
          />
        ))}
      </Layout>
    )
  }
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
