import React from 'react'

import { Link } from 'gatsby'
import '../css/tags.css'

const Tag = ({ tag, style }) => (
  <Link to={`/tags/${tag}`} className={`tag tag-${tag}`} style={style}>
    {tag}
  </Link>
)

export default Tag
