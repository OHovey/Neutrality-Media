import * as React from 'react';
import type { PageProps } from 'gatsby';
import Template from '../../templates/base';
import { graphql, Link as GatsbyLink } from 'gatsby';

import Moment from 'react-moment';

type Article = {
    frontmatter: {
        title: string,
        author: string,
        date: string
    },
    excerpt: string
}
interface ArticlesProps {
    allMarkdownRemark: {
        nodes: Array<Article>,
        totalCount: number
    }
}
const Articles = ({ data, pageContext }: PageProps<ArticlesProps> ) => {

    const [articles, setArticles] = React.useState<Array<Article>>(data.allMarkdownRemark.nodes);
    
    // @ts-ignore
    const { startIndex } = pageContext;

    console.log(pageContext);

    return (
        <Template>
            <section className="py-24 bg-gradient-to-r from-red-400">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4 mb-20 items-center">
                    <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                        <h2 className="mx-40 text-5xl md:text-6xl font-heading font-bold">Articles</h2>
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
                                                    <img className="relative w-full h-full" src="https://shuffle.dev/pstls-assets/images/blog/article-big.png" alt="" />
                                                </div>
                                                <h2 className="text-4xl mb-4 font-heading">{article.frontmatter.title}</h2>
                                                <div className="mb-4 text-indigo-200">
                                                    <span className="text-indigo-600">6 min read</span>
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

                    <div className='flex mx-auto justify-center'>

                        
                        {startIndex > 0 && (
                            <GatsbyLink to={`/articles/${startIndex - 1}`}>{"<"}</GatsbyLink>
                        )}

                            {(() => {
                              
                              let pages = [];
                              
                              for (let i = 0; i < Math.floor(data.allMarkdownRemark.totalCount / 9) + 1; i++) {

                                const el = (
                                    <div className='inline border-2 border-red-400 p-2 px-3 mx-2 rounded-md'>
                                        <p className="font-bold text-red-800">{i}</p>
                                    </div>
                                )

                                pages[i] = el;
                              }  

                              return pages;
                            })()}

                        {Math.floor(data.allMarkdownRemark.totalCount / 9) + 1 > 1 && (
                            <GatsbyLink to={`/articles/${startIndex + 1}`}>{">"}</GatsbyLink>
                        )}
                    </div>
                </div>
            </section>
        </Template>
    )
}

export const query = graphql`
    query ArticlesQuery($startIndex: Int!) {
        allMarkdownRemark(skip: $startIndex, limit: 9) {
            nodes {
              frontmatter {
                title
                date
                author
              }
              excerpt(pruneLength: 80)
              id
            }
            totalCount
        }
    }
`

export default Articles;