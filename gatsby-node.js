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
                startIndex: i
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
                articleId: page.id
            }
        });
    })
}