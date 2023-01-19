const fs = require('fs');
const axios = require('axios');

const { Octokit, App } = require("octokit");


const fetchHeadline = async (term: string): Promise<string> => {

    return await axios.post('https://api.openai.com/v1/completions', {
        "model": "text-ada-001",
        "prompt": `write an article headline related to the term "${term}"`,
        "temperature": 0.4
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_AUTH_TOKEN}`
        }
    }).then( (response) => {

        return response.data.choices[0].text
    }).catch(function (error) {
        
        console.error(error);
        return;
    });
}

const fetchArticleContent = async (term: string, headline: string): Promise<string> => {

    return await axios.post('https://api.openai.com/v1/completions', {
        "model": "text-ada-001",
        "prompt": `write an article about this subject: "${headline}"`,
        "temperature": 0.3,
        "max_tokens": 2000
    }, {
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_AUTH_TOKEN}`
        }
    }).then(response => {

        return response.data.choices[0].text
    }).catch(function (error) {

        console.error(error);
        return;
    });
}

exports.handler = async (event) => {

    console.log("Received event:");

    const result = await axios.get(`https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/runs/last/dataset/items?token=${process.env.APIFY_TOKEN}&status=SUCCEEDED`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(err => {
        console.log("error: " + err)
    })

    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const { data: { login } } = await octokit.rest.users.getAuthenticated();

    let articles = {};

    // @ts-ignore
    const querys: Array<string> = [...new Set(result.data.filter( query => query.hasOwnProperty("parentQuery") ).map( query => query.parentQuery))];
    
    // Promise.resolve( async () => {

    //     let queryIndex = 0;

    //     const createArticle = async (term) => {

    //         return await ( async () => {
    //             if (queryIndex >= querys.length) return false;
    //             let headline: string = (await fetchHeadline(term)).replace("\n\n", "").replace(":", " -"); 

    //             console.log('headline: ' + headline)

    //             let article = await fetchArticleContent(term, headline);

    //             // declare some details for the markdown
    //             const timestamp = new Date().toUTCString();
    //             const author = "roboman";
    //             const metaData = `---\ntitle: ${headline}\nauthor: ${author}\ndate: ${timestamp}\n---\n`;

    //             article = `${metaData}${article}`

    //             articles[headline] = article;
                
    //             queryIndex += 1;
    //         })().then(res => {
    //             if (res != false) {
    //                 createArticle(querys[queryIndex]);
    //             } else {
    //                 return;
    //             }
    //         })
    //     }

    //     return await createArticle(querys[queryIndex]);
    // }).then( _ => {
    //     Object.keys(articles).map( async articleTitle => {

    //         const title = articleTitle.split(' ').join('-');

    //         await octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/data/articles/${title}.md`, {
    //             owner: 'OHovey',
    //             repo: 'Neutrality-Media',
    //             path: `/src/data/articles/${title}.md`,
    //             message: `created new article: ${title} [skip ci]`,
    //             committer: {
    //                 name: 'Oliver Hovey',
    //                 email: 'olliehovey@gmail.com'
    //             },
    //             content: Buffer.from(articles[articleTitle]).toString('base64')
    //         }).then( res => {

    //             console.log(res);
    //         }).catch( err => {

    //             console.error(err);
    //         })
    //     })

    //     // rebuild the site via netlify api
    //     axios.post(`https://api.netlify.com/api/v1/oauth/tickets`, {
    //         client_id: process.env.NETLIFY_CLIENT_ID
    //     }).then( ticket => {
            
    //         axios.post(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`, {
    //         files: {},
    //         draft: false,
    //         async: true,
    //         functions: {},
    //         functions_scedules: [],
    //         branch: "main",
    //         framework: "gatsby"
    //     })
    //     })
    // })

    (async () => {

        const term: string = querys[0];

        let headline: string = (await fetchHeadline(term)).replace("\n\n", "").replace(":", " -"); 

        let article = await fetchArticleContent(term, headline);

        // declare some details for the markdown
        const timestamp = new Date().toUTCString();
        const author = "roboman";
        const metaData = `---\ntitle: ${headline}\nauthor: ${author}\ndate: ${timestamp}\n---\n`;

        article = `${metaData}${article}`

        articles[headline] = article;

        console.log("articleHeadline: " + headline);

    })().then( _ => {
        Object.keys(articles).map( async articleTitle => {



            console.log("GOT HERE");

            const title = articleTitle.split(' ').join('-');

            await octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/data/articles/${title}.md`, {
                owner: 'OHovey',
                repo: 'Neutrality-Media',
                path: `/src/data/articles/${title}.md`,
                message: `created new article: ${title}`, // if uploading multiple files again... upload commit message with "[skip ci]" for all but last.
                committer: {
                    name: 'Oliver Hovey',
                    email: 'olliehovey@gmail.com'
                },
                content: Buffer.from(articles[articleTitle]).toString('base64')
            }).then( res => {

                console.log(res);
            }).catch( err => {

                console.error(err);
            })
            })
    
            // rebuild the site via netlify api
            // axios.post(`https://api.netlify.com/api/v1/oauth/tickets`, {
            //     client_id: process.env.NETLIFY_CLIENT_ID
            // }).then( ticket => {

            //     console.log("ticket: " + ticket);
                
            //     axios.post(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`, {
            //         files: {},
            //         draft: false,
            //         async: true,
            //         functions: {},
            //         functions_scedules: [],
            //         branch: "main",
            //         framework: "gatsby"
            //     },
            //     {
            //         Headers: {
            //             "Authorization": `Bearer ${process.env.NETLIFY_PERSONAL_ACCESS_TOKEN}`
            //         }
            //     })
            // })
    })

    // @ts-ignore
    // await Promise.all(querys.map( async (term: string) => {

    //     let headline: string = (await fetchHeadline(term)).replace("\n\n", "").replace(":", " -"); 

    //     let article = await fetchArticleContent(term, headline);

    //     // declare some details for the markdown
    //     const timestamp = new Date().toUTCString();
    //     const author = "roboman";
    //     const metaData = `---\ntitle: ${headline}\nauthor: ${author}\ndate: ${timestamp}\n---\n`;

    //     article = `${metaData}${article}`

    //     articles[headline] = article;

    // })).then( _ => {

        
    //     Object.keys(articles).map( async articleTitle => {

    //         const title = articleTitle.split(' ').join('-');

    //         await octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/data/articles/${title}.md`, {
    //             owner: 'OHovey',
    //             repo: 'Neutrality-Media',
    //             path: `/src/data/articles/${title}.md`,
    //             message: `created new article: ${title} [skip ci]`,
    //             committer: {
    //                 name: 'Oliver Hovey',
    //                 email: 'olliehovey@gmail.com'
    //             },
    //             content: Buffer.from(articles[articleTitle]).toString('base64')
    //         }).then( res => {

    //             console.log(res);
    //         }).catch( err => {

    //             console.error(err);
    //         })
    //     })

    //     // rebuild the site via netlify api
    //     axios.post(`https://api.netlify.com/api/v1/oauth/tickets`, {
    //         client_id: process.env.NETLIFY_CLIENT_ID
    //     }).then( ticket => {
            
    //         axios.post(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`, {
    //         files: {},
    //         draft: false,
    //         async: true,
    //         functions: {},
    //         functions_scedules: [],
    //         branch: "main",
    //         framework: "gatsby"
    //     })
    //     })
    // })
}