import * as React from "react"
import { graphql } from 'gatsby';
import type { HeadFC, PageProps } from "gatsby"
import Template from "../templates/base"
import { Link as GatsbyLink } from 'gatsby';


type Article = {
  frontmatter: {
    title: string,
    date: string,
    author: string
  },
  excerpt: string
}
interface HomeProps {
  allMarkdownRemark: {
    nodes: Array<Article>
  }
}
const IndexPage: React.FC<PageProps<HomeProps>> = ({ data }) => {

  const [articles, setArticles] = React.useState(data.allMarkdownRemark.nodes);

  React.useEffect(() => {

    console.log(articles);
  });

  return (
    <Template>
      <section className="py-24">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4 mb-20 items-center">
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                    <h2 className="mx-20 text-5xl md:text-6xl font-heading">Latest</h2>
                </div>
                <div className="w-full md:w-1/2 px-4">
                    {/* <p className="max-w-lg leading-8">If you have ever wondered how to develop your brand, this is the place for you. Take a big step forward in growing your business.</p> */}
                </div>
                </div>
                <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-16 lg:mb-0">
                    <GatsbyLink to={`/articles/${articles[0].frontmatter.title.split(' ').join('-')}`} className="block max-w-lg mx-auto">
                    <div className="relative mb-12" style={{height: 264}}>
                        <div className="absolute left-0 bottom-0 -ml-6 -mb-6 w-full bg-indigo-100" style={{height: 264}} />
                        <img className="relative w-full h-full" src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="" />
                    </div>
                    <div className="mb-4 text-indigo-200">
                        <span>6 min read</span>
                        <span className="mx-2">•</span>
                        <span>{articles[0].frontmatter.date}</span>
                    </div>
                    <h2 className="text-4xl mb-4 font-heading">{articles[0].frontmatter.title}</h2>
                    <p className="leading-8 mb-6">{articles[0].excerpt}</p>
                    <div className="flex items-center">
                        <img className="mr-3" src="pstls-assets/images/blog/men-avatar.png" alt="" />
                        <p>{articles[0].frontmatter.author}</p>
                    </div>
                    </GatsbyLink>
                </div>
                <div className="w-full md:w-1/2 px-4">
                {
                  articles.slice(1).map( article => (
                    <GatsbyLink 
                      key={article.frontmatter.date} 
                      to={`/articles/${article.frontmatter.title.split(' ').join('-')}`} 
                      className="block mb-8"
                    >
                      <div className="flex items-center -mx-4 -mb-3">
                          <div className="px-4 mb-3">
                          <img src="pstls-assets/images/blog/article-photo1.png" alt="" />
                          </div>
                          <div className="px-4 mb-3">
                          <div className="mb-2 text-indigo-200">
                              <span>5 min read</span>
                              <span className="mx-2">•</span>
                              <span>{article.frontmatter.date}</span>
                          </div>
                          <h3 className="text-xl font-heading">{article.frontmatter.title}</h3>
                          </div>
                      </div>
                    </GatsbyLink>
                  ))
                }
                </div>
                
                </div>
            </div>
        </section>
    </Template>
  )
}

export const query = graphql`
  query HomeQuery {
    allMarkdownRemark(limit: 5, sort: {id: DESC}) {
      nodes {
        frontmatter {
          title
          date
          author
        }
        excerpt(pruneLength: 80)
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
