import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import Moment from 'react-moment';

import Template from '../base';


type Tag = {
    type: string,
    tagName: string,
    properties: object,
    children: Array<Tag>,
    value?: string
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
    markdownRemark: Article
}
const Article = ({ data }: PageProps<ArticleProps>) => {

    const [articleContent, setArticleContent] = React.useState<string>('');


    React.useEffect(() => {

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
            <section className="pb-24" style={{backgroundImage: 'url("pstls-assets/images/blog-content/shadow-pink.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="py-24 max-w-4xl">
                            <p className="text-indigo-500 inline">Published </p><Moment className="text-indigo-500" date={data.markdownRemark.frontmatter.date} format="D MMM YYYY" />
                            <h2 className="text-4xl md:text-5xl font-heading mt-4 mb-6">{data.markdownRemark.frontmatter.title}</h2>
                            <div 
                                className='article-content'
                                dangerouslySetInnerHTML={{ __html: articleContent }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Template>
    )
}

export const query = graphql`
    query ArticleQuery($articleId: String!) {
        markdownRemark(id: {eq: $articleId}) {
            frontmatter {
              author
              date
              title
            }
            html
            htmlAst
          }
    }
`

export default Article;