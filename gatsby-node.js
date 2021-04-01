const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const createClasesPages = async (graphql, createPage) => {
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "DD-MM-YYYY")
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

const createTagsPages = async (graphql, createPage) => {
  const template = path.resolve(`./src/templates/posts-by-tag.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
      }
    `
  );

  if (result.errors) {
    throw result.errors
  }

  const flatten = (array) => ([].concat(...array))

  const tags = flatten(
    result.data.allMarkdownRemark.edges.map(edge => (
      edge.node.frontmatter.tags
    )).filter(x => x !== null)
  );

  tags.forEach((tag, index) => {
    const slug = `/tags/${tag}`;
    createPage({
      path: slug,
      component: template,
      context: {
        slug: slug,
        tag: tag,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await Promise.all([
    createClasesPages(graphql, createPage),
    createTagsPages(graphql, createPage)
  ]);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
