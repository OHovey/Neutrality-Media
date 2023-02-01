import { fdatasync } from "fs";

const fs = require('fs');
const axios = require('axios');

const { Octokit, App } = require("octokit");
const { Configuration, OpenAIApi } = require('openai');

const fetch = require('node-fetch');


const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const configuration = new Configuration({
    apiKey: process.env.OPENAI_AUTH_TOKEN
});

const openai = new OpenAIApi(configuration);


const fetchHeadline = async (term: string): Promise<string> => {

    return await openai.createCompletion({
        "model": "text-ada-001",
        "prompt": `write an article headline related to the term "${term}"`,
        "temperature": 0.4
    }).then( response => {
        return response.data.choices[0].text
    }).catch(err => console.error(err))

    // return await axios.post('https://api.openai.com/v1/completions', {
    //     "model": "text-ada-001",
    //     "prompt": `write an article headline related to the term "${term}"`,
    //     "temperature": 0.4
    // }, {
    //     headers: {
    //         "Authorization": `Bearer ${process.env.OPENAI_AUTH_TOKEN}`
    //     }
    // }).then( (response) => {

    //     return response.data.choices[0].text
    // }).catch(function (error) {
        
    //     console.error(error);
    //     return;
    // });
}



const fetchArticleContent = async (term: string, headline: string): Promise<string> => {

    return await openai.createCompletion({
        "model": "text-curie-001",
        "prompt": `write an article about this subject: "${headline}"`,
        "temperature": 0.3,
        "max_tokens": 2000
    }).then( response => response.data.choices[0].text )

    // return await axios.post('https://api.openai.com/v1/completions', {
    //     "model": "text-curie-001",
    //     "prompt": `write an article about this subject: "${headline}"`,
    //     "temperature": 0.3,
    //     "max_tokens": 2000
    // }, {
    //     headers: {
    //         "Authorization": `Bearer ${process.env.OPENAI_AUTH_TOKEN}`
    //     }
    // }).then(response => {

    //     return response.data.choices[0].text
    // }).catch(function (error) {

    //     console.error(error);
    //     return;
    // });
}

const downloadImage = async (url: string, filename: string) => {

    const response = await fetch(url);
    // console.log(response);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString('base64');
    // console.log(buffer);

    // octokit.git.createBlob({
    //     owner: "OHovey",
    //     repo: "Neutrality-Media",
    //     content: buffer,
    //     encoding: 'base64'
    // })
    // await fs.writeFile(`${__dirname}/src/images/${filename}.png`, buffer, (err) => console.error(err))

    octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/images/${filename}.png`, {
        owner: 'OHovey',
        repo: 'Neutrality-Media',
        path: `/src/images/${filename}.png`,
        message: `uploaded new article image: ${filename}.png [skip ci]`,
        committer: {
          name: 'Oliver Hovey',
          email: 'olliehovey@gmail.com'
        },
        content: buffer
      }).then( res => {
        console.log(response)
      })
}

exports.handler = async (event) => {

    console.log("Received event:");


    await axios.get('https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/run-sync?token=apify_api_FpKFZk1nVdehSrF7HedZ8x7Cqxdnzp0T4bhK', {
        headers: {
            "Content-Type": "application/json"
        }
    }).then( async _ => {
        
        const result = await axios.get(`https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/runs/last/dataset/items?token=${process.env.APIFY_TOKEN}&status=SUCCEEDED`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(err => {
            // console.log('its an error here')
            console.log("error: " + err)
        })

        // console.log('made it here 0')

        // const { data: { login } } = await octokit.rest.users.getAuthenticated();

        // console.log('JUST PAST HERE');

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

        const term: string = querys[0];

        // console.log('made it here 1')
        let headline: string = (await fetchHeadline(term)).replace("\n\n", "").replace(":", " -"); 

        // console.log('made it here 2')
        let article = await fetchArticleContent(term, headline);

        // generate image
        // const imageData = await axios.post('https://api.openai.com/v1/images/generations', {
        //     prompt: `An image to caption the following headline: ${headline}`,
        //     n: 1,
        //     size: "1024x1024"
        // },{
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${process.env.OPENAI_AUTH_TOKEN}`
        //     }
        // }).catch( err => {
        //     console.error(err);
        // })

        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Token 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");

        // var raw = JSON.stringify({
        //     "prompt": `An image to caption the following headline: duck`,
        //     "n": 1,
        //     "size": "1024x1024"
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // const imageData = await fetch("https://api.openai.com/v1/images/generations", requestOptions)
        //     .then(response => response)
        //     // .then(result => {
        //     //     console.log(result)
        //     // })
        //     .catch(error => console.log('error', error));

        // console.log(imageData.data.data.url)

        // console.log("but i did make it here!")

        const imageData = await openai.createImage({
            prompt: `An image to caption the following headline: ${headline}`,
            n: 1,
            size: "1024x1024"
        })

        // console.log('HERE! Im HERE')

        const imageUrl = imageData.data.data[0].url;

        // download The image
        await downloadImage(imageUrl, headline.split(' ').join('-'));

        // console.log("imageUrl: " + imageUrl)

        // declare some details for the markdown
        let d = new Date();
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        const timestamp = `${ye}-${mo}-${da}`;
        const author = "roboman";
        const metaData = `---\ntitle: ${headline}\nauthor: ${author}\ndate: ${timestamp}\nimageUrl: ../images/${headline.split(' ').join('')}\narticlesImageUrl: ../../images/${headline.split(' ').join('')}\n---\n`;

        article = `${metaData}${article}`

        articles[headline] = article;

        const title = headline.split(' ').join('-');


        await octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/data/articles/${title}.md`, { 
            owner: 'OHovey',
            repo: 'Neutrality-Media',
            path: `/src/data/articles/${title}.md`,
            message: `created new article: ${title}`, // if uploading multiple files again... upload commit message with "[skip ci]" for all but last.
            committer: {
                name: 'Oliver Hovey',
                email: 'olliehovey@gmail.com'
            },
            content: Buffer.from(articles[headline]).toString('base64')
        }).then( res => {

            // console.log(res);
        }).catch( err => {

            console.error(err);
        })
            
    })
    // (async () => {

    //     const term: string = querys[0];

    //     let headline: string = (await fetchHeadline(term)).replace("\n\n", "").replace(":", " -"); 

    //     let article = await fetchArticleContent(term, headline);

    //     // declare some details for the markdown
    //     const timestamp = new Date().toUTCString();
    //     const author = "roboman";
    //     const metaData = `---\ntitle: ${headline}\nauthor: ${author}\ndate: ${timestamp}\n---\n`;

    //     article = `${metaData}${article}`

    //     articles[headline] = article;

    //     console.log("articleHeadline: " + headline);

    // })().then( _ => {
    //     Object.keys(articles).map( async articleTitle => {



    //         console.log("GOT HERE");

    //         const title = articleTitle.split(' ').join('-');

    //         await octokit.request(`PUT /repos/OHovey/Neutrality-Media/contents/src/data/articles/${title}.md`, {
    //             owner: 'OHovey',
    //             repo: 'Neutrality-Media',
    //             path: `/src/data/articles/${title}.md`,
    //             message: `created new article: ${title}`, // if uploading multiple files again... upload commit message with "[skip ci]" for all but last.
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
    //         })
    
    //         // rebuild the site via netlify api
    //         // axios.post(`https://api.netlify.com/api/v1/oauth/tickets`, {
    //         //     client_id: process.env.NETLIFY_CLIENT_ID
    //         // }).then( ticket => {

    //         //     console.log("ticket: " + ticket);
                
    //         //     axios.post(`https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`, {
    //         //         files: {},
    //         //         draft: false,
    //         //         async: true,
    //         //         functions: {},
    //         //         functions_scedules: [],
    //         //         branch: "main",
    //         //         framework: "gatsby"
    //         //     },
    //         //     {
    //         //         Headers: {
    //         //             "Authorization": `Bearer ${process.env.NETLIFY_PERSONAL_ACCESS_TOKEN}`
    //         //         }
    //         //     })
    //         // })
    // })

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