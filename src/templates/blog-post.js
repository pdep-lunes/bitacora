import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Tag from '../components/tag'
import { rhythm, scale } from '../utils/typography'
import { dateParser, getYearAsNumber } from '../utils/dateParser'

import RetomarScrollTooltip from '../components/retomar-scroll-tooltip'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { title: postTitle, tags, description, date } = post.frontmatter
    const siteTitle = this.props.data.site.siteMetadata.title

    const { previous, next } = this.props.pageContext

    const YYYY = getYearAsNumber(date)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <RetomarScrollTooltip postTitle={postTitle} />
        <Seo title={postTitle} description={description || post.excerpt} />
        <h1>{postTitle}</h1>
        {tags ? (
          <div className="tags-container" style={{ marginTop: rhythm(-1) }}>
            {tags.map((tag, i) => (
              <Tag tag={tag} key={i} />
            ))}
          </div>
        ) : null}
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {dateParser(date)}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio style={{ marginBottom: '0px' }} />
        {previous || next ? (
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && getYearAsNumber(previous.frontmatter.date) === YYYY && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && getYearAsNumber(next.frontmatter.date) === YYYY && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        ) : null}
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD-MM-YYYY")
        description
        tags
      }
    }
  }
`
