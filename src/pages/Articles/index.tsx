import * as React from 'react';
import type { PageProps } from 'gatsby';
import Template from '../../templates/base';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Moment from 'react-moment';

type Article = {
    frontmatter: {
        title: string,
        author: string,
        date: string,
        imageUrl: string
    },
    excerpt: string
}
interface ArticlesProps {
    allMarkdownRemark: {
        nodes: Array<Article>
    }
}
const Articles = ({ data }: PageProps<ArticlesProps> ) => {

    const [articles, setArticles] = React.useState<Array<Article>>(data.allMarkdownRemark.nodes);

    return (
        <Template>
            <section className="py-24">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4 mb-20 items-center">
                    <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                        <h2 className="mx-40 text-5xl md:text-6xl font-heading">Articles</h2>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        {/* <p className="max-w-lg leading-8">If you have ever wondered how to develop your brand, this is the place for you. Take a big step forward in growing your business.</p> */}
                    </div>
                    </div>
                    <div className="max-w-5xl mx-auto flex flex-wrap mb-16">
                        {
                            articles.map( article => (
                                <div key={article.frontmatter.date} className="w-full md:w-1/2 lg:w-1/3 px-6 md:px-10 mb-16">
                                    <GatsbyLink to={`/articles/${article.frontmatter.title.split(' ').join('-')}`} className="block">
                                        <div className="max-w-xs mx-auto">
                                            <div className="relative mb-12 h-64">
                                                <div className="absolute left-0 bottom-0 -ml-6 -mb-6 w-full bg-indigo-100 h-64" />
                                                <StaticImage 
                                                    className="relative w-full h-full" src="../../images/Liverpool-vs-Chelsea---Liverpool's-Season-Fulfilling-Match.png" 
                                                    alt={"So So..."} 
                                                    width={250}
                                                    height={250}
                                                />
                                                </div>
                                                <h2 className="text-4xl mb-4 font-heading">{article.frontmatter.title}</h2>
                                                <div className="mb-4 text-indigo-200">
                                                    <span>6 min read</span>
                                                <span className="mx-2">•</span>
                                                <Moment className="text-indigo-500" date={article.frontmatter.date} format="D MMM YYYY" />
                                            </div>
                                            <p className="leading-8">{article.excerpt}</p>
                                        </div>
                                    </GatsbyLink>
                                </div>
                            ))
                        }
                    </div>
                    <div className="text-center">
                    <a className="inline-block px-8 py-3 text-white font-bold bg-black hover:bg-gray-900 transform duration-200" href="#">View more articles</a>
                    </div>
                </div>
            </section>
        </Template>
    )
}

export const Head = () => {

    return (
        <>
            <title>Articles</title>
        </>
    )
}

export const query = graphql`
    query ArticlesQuery {
        allMarkdownRemark(limit: 7) {
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

export default Articles;