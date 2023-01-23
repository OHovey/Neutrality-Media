import * as React from "react"
import { graphql } from 'gatsby';
import type { HeadFC, PageProps, HeadProps } from "gatsby"
import Template from "../templates/base"
import { Link as GatsbyLink } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import type { NodePluginArgs } from "gatsby";


type Article = {
  frontmatter: {
    title: string,
    date: string,
    author: string,
    imageUrl: string,
  },
  excerpt: string
}
// interface ImageProps {
//   name: string,
//   childImageSharp: {
//     layout: string,
//     backgroundColor: string,
//     images: {
//       fallback: {
//         src: string
//         srcSet: string,
//         sizes: string,
//       },
//     }
//     sources: Array<any>
//   }
// }
interface HomeProps {
  allMarkdownRemark: {
    nodes: Array<Article>
  }
}
const IndexPage: React.FC<PageProps<HomeProps>> = ({ data }) => {

  const [articles, setArticles] = React.useState(data.allMarkdownRemark.nodes.sort( (a, b) => {

    const aDate = new Date(a.frontmatter.date);
    const bDate = new Date(b.frontmatter.date);

    if (aDate > bDate) return -1;
    
    if (aDate < bDate) return 1;

    return 0
  }));

  

  React.useEffect(() => {

    // console.log(articles.map( article => article.frontmatter.imageUrl))
  })

  return (
    <Template>
      <section className="py-24 bg-gradient-to-r from-red-400">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4 mb-20 items-center">
                  <div className="w-full md:w-full px-4 mb-6 md:mb-0 flex justify-between">
                      <h2 className="mx-20 text-5xl md:text-6xl font-heading inline">Latest</h2>
                      <GatsbyLink className="relative bg-black px-6 w-36 mx-20" to="/articles/0">
                        <p className="text-white font-bold inline absolute top-1/2 hover:underline transition-all ease-in-out duration-500 underline-offset-4" style={{ transform: "translate(0, -50%)" }}>More Articles</p>
                      </GatsbyLink>
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
                          {/* <img className="relative w-full h-full" src={`${articles[0].frontmatter.imageUrl}`} alt="" /> */}
                          {/* <StaticImage className="relative w-full h-full" src={articles[0].frontmatter.imageUrl} alt={articles[0].frontmatter.imageUrl.split('/')[0]} /> */}
                          {/* <StaticImage src={articles[0].frontmatter.imageUrl} alt={articles[0].frontmatter.imageUrl.split('/')[0]} /> */}
                          {/* <StaticImage src="src/images/LiverpoolvsChelsea-Liverpool'sSeason-FulfillingMatch" alt={articles[0].frontmatter.imageUrl.split('/')[0]} /> */}
                      </div>
                      <div className="mb-4 text-indigo-200">
                          <span className="text-indigo-500">6 min read</span>
                          <span className="mx-2">•</span>
                          <span className="text-indigo-500">{articles[0].frontmatter.date}</span>
                      </div>
                      <h2 className="text-4xl mb-4 font-heading">{articles[0].frontmatter.title}</h2>
                      <p className="leading-8 mb-6">{articles[0].excerpt}</p>
                      <div className="flex items-center">
                          {/* <img className="mr-3" src={`${articles[0].frontmatter.imageUrl}`} alt="" /> */}
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
                          <img src={article.frontmatter.imageUrl} style={{ width: '8rem', height: "8rem" }} />
                          {/* <p>{article.frontmatter.imageUrl}</p> */}
                          {/* <StaticImage 
                            className="relative w-full h-full" 
                            src={article.frontmatter.imageUrl} 
                            alt={article.frontmatter.imageUrl.split('/')[0]} 
                            width={250}
                            height={250}
                          /> */}
                          {/* {
                            (() => {

                              console.log(article.frontmatter.imageUrl.split('/')[article.frontmatter.imageUrl.split('/').length - 1].replace('.png', ''))
                              console.log(data.allFile.nodes.map( image => image.name ))
                              const imageData = data.allFile.nodes.filter( image => image.name == article.frontmatter.imageUrl.split('/')[article.frontmatter.imageUrl.split('/').length - 1].replace('.png', ''))
                                                                  // .map( image => image.childImageSharp);
                              
                              console.log(imageData)
                              return (
                                <GatsbyImage 
                                  // @ts-ignore
                                  image={imageData} 
                                />
                              )
                            })()
                          } */}
                          </div>
                          <div className="px-4 mb-3">
                          <div className="mb-2 text-indigo-200">
                              <span className="text-indigo-500">5 min read</span>
                              <span className="mx-2">•</span>
                              <span className="text-indigo-500">{article.frontmatter.date}</span>
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

interface HeadParams {
  pageContext: {
    pageTitle: string
  },
  data: {},
  params: {},
  location: {}
}
export const Head = ({ location, params, data, pageContext }: HeadParams) => {
  return (
    <>
      <title>{pageContext.pageTitle}</title>
    </>
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
          imageUrl
        }
        excerpt(pruneLength: 80)
      }
    }
  }
`

export default IndexPage
