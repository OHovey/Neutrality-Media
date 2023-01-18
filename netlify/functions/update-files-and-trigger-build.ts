import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import axios from 'axios';
import { config } from "process";
import MarkdownIt from 'markdown-it';
import fs from 'fs';


interface ServerResponse {
    data: ServerData
}
  
interface ServerData {
    config: {
        method: string,
        url: string,
        headers: Object
    }
}

interface OpenAiResult {
    text: string | void,
    index: number,
    logprobs: string | null,
    finish_reason: string
}
interface OpenAiResponse {
    data: {
        choices: Array<OpenAiResult>
    }
}
const fetchHeadline = async (term: string): Promise<string> => {

    return await axios.post('https://api.openai.com/v1/completions', {
        "model": "text-ada-001",
        "prompt": `write an article headline related to the term "${term}"`,
        "temperature": 0.4
    }, {
        headers: {
            "Authorization": "Bearer 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"
        }
    }).then( (response) => {
        // console.log(response.data.choices[0].text);
        return response.data.choices[0].text
    }).catch(function (error) {
        console.log(error);

        return;
    });
}

const fetchArticleContent = async (term: string, headline: string): Promise<string> => {

    return await axios.post('https://api.openai.com/v1/completions', {
        "model": "text-ada-001",
        "prompt": `write an article related to the term "${term}", with a headline of: "${headline}"`,
        "temperature": 0.7,
        "max_tokens": 2000
    }, {
        headers: {
            "Authorization": "Bearer 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"
        }
    }).then(response => {
        console.log(JSON.stringify(response.data.choices[0].text));
        return response.data.choices[0].text
    }).catch(function (error) {
        console.log(error.message);

        return;
    });
}


interface resultProperties {
    OUTPUT: Array<string>
}
const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log("Received event:");

    const result = await axios.get('https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/runs/last/dataset/items?token=apify_api_FpKFZk1nVdehSrF7HedZ8x7Cqxdnzp0T4bhK&status=SUCCEEDED', {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(err => {
        console.log("error: " + err)
    })

    // @ts-ignore
    // console.log(result.data);

    
    // return {
    //     statusCode: 200
    // }

    let articles = {};

    // @ts-ignore
    const querys = [...new Set(result.data.filter( query => query.hasOwnProperty("parentQuery") ).map( query => query.parentQuery))];
    
    // console.log(querys);

    // @ts-ignore
    await Promise.all(querys.map( async (term: string) => {

        // console.log(term.parentQuery);

        let headline: string = await fetchHeadline(term);
        headline = headline.replace("\n\n", ""); 
        console.log("headline: " + headline)
        const article = await fetchArticleContent(term, headline);
        // const article = "";

        articles[headline] = article;
    })).then( _ => {

        console.log(articles);

        Object.keys(articles).map( async articleTitle => {
            console.log("hi made it here!");

            const title = articleTitle.split(' ').join('-');

            fs.writeFileSync(`${title}.md`, `# ${articleTitle}`);
            fs.appendFileSync(`${title}.md`, `# ${articles[articleTitle]}`);
            const fileContent = fs.readFileSync(`${title}`).toString('base64');

            const config = {
                headers: {
                    'Authorization': 'Token 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',
                    'Content-Type': 'application/json'
                }
            };

            const repository = 'OHovey/Neutrality-Media';
    

            fs.unlinkSync(title)
            try {

                

                const response = await axios.put(`https://api.github.com/repos/${repository}/src/data/articles/${title}`, {
                    message: `uploaded new article: "${title}.md"`,
                    content: fileContent
                }, config).then( res => {
                    console.log(res);
                }).catch( err => {
                    console.error(err);
                });

                fs.unlinkSync(title)

            } catch (error) {
                console.log(`An error ocurred uploading file ${title} : ${error}`);
            }
        })
    })

    // axios.post('https://api.openai.com/v1/completions', {
    //     "model": "text-ada-001",
    //     "prompt": "say hello",
    //     "temperature": 0
    // }, {
    //     headers: {
    //         "Authorization": "Bearer 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"
    //     }
    // }).then(function (response) {
    //     console.log(JSON.stringify(response.data));
    // }).catch(function (error) {
    //     console.log(error);
    // });

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", myHandler)

export { handler };

