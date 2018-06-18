const path = require('path');
// const _ = require('lodash');

/* exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    }
    createNodeField({ node, name: 'slug', value: slug });
  }
}; */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js');
    resolve(
      graphql(`
        {
          posts: allContentfulBlogPost {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.posts.edges;

        posts.forEach((edge, index) => {
          const next = index === 0 ? null : posts[index - 1].node;
          const prev =
            index === posts.length - 1 ? null : posts[index + 1].node;

          createPage({
            path: edge.node.slug,
            component: postPage,
            context: {
              slug: edge.node.slug,
              prev,
              next,
            },
          });
        });
      })
    );
  });
};
