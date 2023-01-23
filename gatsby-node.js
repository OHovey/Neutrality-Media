const fs = require("fs");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const { dirname } = require("path");
const path = require("path");


exports.createPages = async ({ graphql, actions }) => {

    const { createPage } = actions;

    const result = await graphql(
        `
            {
                allMarkdownRemark {
                    nodes {
                      frontmatter {
                        title
                        date
                        author
                      }
                      excerpt(pruneLength: 80)
                      id
                    }
                }
            }
        `
    )

    const numberOfArticles = Math.floor(result.data.allMarkdownRemark.nodes.length / 9) + 1;
    const articlesTemplate = path.resolve('src/templates/Articles/index.tsx');
    for (let i = 0; i < numberOfArticles; i++) {
        
        const path = `/articles/${i}`;
        createPage({
            path,
            component: articlesTemplate,
            context: {
                startIndex: i,
                pageTitle: "Neutrality Media - Articles"
            }
        });
    }

    const articleTemplate = path.resolve(`src/templates/Article/index.tsx`);
    result.data.allMarkdownRemark.nodes.map( page => {

        const path = `/articles/${page.frontmatter.title.split(' ').join('-')}`;

        console.log(path);

        createPage({
            path,
            component: articleTemplate,
            context: {
                articleId: page.id,
                pageTitle: page.frontmatter.title
            }
        });
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    console.log(node.internal.type)
    if (node.internal.type === `page`) {

        console.log('is a page')

    //   const parsedFilePath = createFilePath({ node, getNode })
    //   if (parsedFilePath.endsWith('.jpg') || parsedFilePath.endsWith('.png')) {
    //     createNodeField({
    //       node,
    //       name: `slug`,
    //       value: parsedFilePath,
    //     })
    //   }
    }
  }

// exports.sourceNodes = async ({ createNodeId, createContentDigest, getChache, createNode }) => {


//     const imageList = await fs.readdir(path.resolve(__dirname, './src/images'), (err, files) => {

//         console.log(files);

//         if (err) {
//             return console.log('Unable to scan directory');
//         }

//         files.forEach( file => {

//             createRemoteFileNode({
//                 url: path.resolve(__dirname, './src/images/', file),
//                 parentNode: {},
//                 getChache,
//                 createNode,
//                 createNodeId,
//                 ext: ".png",
//                 name: file.split('/')[file.split('/').length - 1]
//             })

            
//         })
//     }) 

// }