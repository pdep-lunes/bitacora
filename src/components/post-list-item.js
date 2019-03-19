import React from 'react'
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"
import { dateParser } from "../utils/dateParser"

import Tag from "../components/tag"

const PostListItem = ({node}) => {
  const { excerpt } = node
  const { slug } = node.fields
  const { tags, date, description } = node.frontmatter
  const title = node.frontmatter.title || node.fields.slug
  const itemProps = { slug, title, tags, date, description, excerpt }
  return (
    <div key={slug}>
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '1.75rem',
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none`, color: '#2b2b2b' }} to={slug}>
          {title}
        </Link>
      </h3>
      {
        tags
          ? (<div className='tags-container'>
              {tags.map((tag, i) => <Tag tag={tag} key={i} />)}
            </div>)
          : null
      }
      <small
        style={{
          color: '#929292',
        }}
      >{dateParser(date)}</small>
      <p
        style={{
          color: '#929292',
        }}
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
    </div>
  )
}

export default PostListItem