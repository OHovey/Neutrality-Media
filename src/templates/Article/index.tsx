import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import Moment from 'react-moment';

import Template from '../base';


type Article = {
    frontmatter: {
        title: string,
        author: string,
        date: string
    },
    excerpt: string
}
interface ArticleProps {
    markdownRemark: Article
}
const Article = ({ data }: PageProps<ArticleProps>) => {

    React.useEffect(() => {

        console.log(data);
    })

    return (
        <Template>
            <section className="pb-24" style={{backgroundImage: 'url("pstls-assets/images/blog-content/shadow-pink.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="py-24 max-w-4xl">
                            <p className="text-indigo-500 inline">Published </p><Moment className="text-indigo-500" date={data.markdownRemark.frontmatter.date} format="D MMM YYYY" />
                            <h2 className="text-4xl md:text-5xl font-heading mt-4 mb-6">{data.markdownRemark.frontmatter.title}</h2>
                            <p className="leading-8">These types of questions led me to miss numerous deadlines, and I wasted time and energy in back-and-forth communication. Sadly, this situation could have been avoided if the wireframes had provided enough detail.</p>
                        </div>
                        <img className="block w-full mb-12" src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="" />
                        <div>
                            {data.markdownRemark.excerpt}
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
            rawMarkdownBody
          }
    }
`

export default Article;