import * as React from 'react';
import type { PageProps, HeadProps } from 'gatsby';
import { graphql } from 'gatsby';

import Moment from 'react-moment';

import Template from '../base';
import { GatsbyImage } from 'gatsby-plugin-image';


type Tag = {
    type: string,
    tagName: string,
    properties: object,
    children: Array<Tag>,
    value?: string
}
interface ImageProps {
    childImageSharp: {
        gatsbyImageData: any
    }
}
type Article = {
    frontmatter: {
        title: string,
        author: string,
        date: string
    },
    html: string,
    htmlAst: {
        children: Array<Tag>
    }
}
interface ArticleProps {
    markdownRemark: Article,
    allFile: {
        nodes: Array<ImageProps>
    }
}
const Article = ({ data, pageContext }: PageProps<ArticleProps>) => {

    const [articleContent, setArticleContent] = React.useState<string>('');


    React.useEffect(() => {

        // console.log(pageContext)

        let content: string = "";

        data.markdownRemark.htmlAst.children.forEach( tag => {

            // console.log(tag.children[0])

            if (tag.hasOwnProperty("children")) {

                // @ts-ignore
                console.log(tag.children[0].value?.split('').length)

                // @ts-ignore
                if (tag.children[0].value?.split('').length < 80) {
                    content += `<h2 class="font-bold mb-6 mt-10">${tag.children[0].value}</h2>`;
    
                } else {
                    switch (tag.tagName) {
                        case 'p':
                            content += `<p class="mb-2">${tag.children[0].value}</p>`;
                            break;
        
                        case 'h2':
                            content += `<h2 class="font-bold">${tag.children[0].value}</h2>`
                            break;
        
                    }
                }
            }
        })

        setArticleContent(content);
    })

    return (
        <Template>
            <section className="bg-gradient-to-r from-red-400" style={{backgroundImage: 'url("pstls-assets/images/blog-content/shadow-pink.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="bg-gradient-to-r from-red-400">
                    <div className="mx-auto">
                        <div className="py-24 mx-12">
                            <div className="mx-auto w-1/4">
                                <GatsbyImage image={data.allFile.nodes[0]?.childImageSharp.gatsbyImageData} alt="" style={{ width: "30vw", height: "30vh", margin: 'auto', border: '1px solid black '  }} />
                            </div>
                            {/* <div className="h-1/2 w-screen top-0 left-0 absolute shadow-2xl shadow-black" /> */}
                            <div className="bg-white mx-24 mt-12 border border-black py-12">
                                <div className="pt-12 max-w-4xl mx-auto">
                                    <p className="text-indigo-500 inline">Published </p><Moment className="text-indigo-500" date={data.markdownRemark.frontmatter.date} format="D MMM YYYY" />
                                    <p className='text-indigo-500 inline'> by <strong>{data.markdownRemark.frontmatter.author}</strong></p>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading mt-4 mb-6 mx-auto max-w-4xl">{data.markdownRemark.frontmatter.title}</h2>
                                <div className='border border-slate-400 w-1/5 mx-auto my-12' />
                                <div 
                                    className='article-content max-w-4xl mx-auto text-justify leading-8'
                                    dangerouslySetInnerHTML={{ __html: articleContent }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Template>
    )
}

interface HeadParams {
    pageContext: {
        pageTitle: string
    }
}
export const Head = ({ pageContext }: HeadParams) => {
    return (
        <>
            <title>{pageContext.pageTitle}</title>
        </>
    )
}

export const query = graphql`
    query ArticleQuery($articleId: String!, $imageTitle: String!) {
        markdownRemark(id: {eq: $articleId}) {
            frontmatter {
              author
              date
              title
            }
            html
            htmlAst
        }

        allFile(filter: {internal: {mediaType: {eq: "image/png" } } name: {eq: $imageTitle} } ) {
            nodes {
              name
              childImageSharp {
                gatsbyImageData
            }
          }
        }
    }
`

export default Article;