import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tag"
import { rhythm } from "../utils/typography"
import PostListItem from "../components/post-list-item"

class PostsByTagTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    const { tag } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={tag}
          description={`posts para el tag: ${tag}`}
        />
        <h1 style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          Posts sobre
          <Tag
            style={{
              height: '25px',
              marginLeft: '15px',
              marginTop: '6px',
              fontWeight: '500'
            }}
            tag={tag}
          />
        </h1>
        {posts.map(({ node }, index) => (
          <PostListItem
            key={index}
            node={node}
          />
        ))}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio style={{marginBottom: '0px'}}/>
      </Layout>
    )
  }
}

export default PostsByTagTemplate

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              tags
              title
              date
            }
          }
        }
      }
  }
`
