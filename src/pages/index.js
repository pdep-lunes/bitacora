import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { dateParser } from "../utils/dateParser";
import '../utils/tags.css';

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
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = node.frontmatter.tags;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.75rem',
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none`, color: '#2b2b2b' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              {
                tags
                ? (
                  <div className='tags-container'>
                    {tags.map((tag, i) => (
                      <div
                        // to={`/tag/${tag}`}
                        key={i}
                        className={`tag tag-${tag}`}
                      >{tag}</div>
                    ))}
                  </div>
                )
                : null
              }
              <small
                style={{
                  color: '#929292',
                }}
              >{dateParser(node.frontmatter.date)}</small>
              <p
                style={{
                  color: '#929292',
                }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
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
