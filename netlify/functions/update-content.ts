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
        "temperature": 0
    }, {
        headers: {
            "Authorization": "Bearer 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"
        }
    }).then( (response) => {
        // console.log(JSON.stringify(response.data));
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
        "temperature": 0
    }, {
        headers: {
            "Authorization": "Bearer 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"
        }
    }).then(response => {
        console.log(JSON.stringify(response.data));

        return response.data.choices[0].text
    }).catch(function (error) {
        console.log(error);

        return;
    });
}


interface resultProperties {
    OUTPUT: Array<string>
}
const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log("Received event:", event);

    const result: resultProperties = await axios.get('https://api.apify.com/v2/actor-tasks/hooli/google-trending-searches/run-sync?token=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', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const articles = {};
    result.OUTPUT.map( async term => {

        const headline: string = await fetchHeadline(term);
        const article = await fetchArticleContent(term, headline);

        articles[headline] = article;
    })
    
    Object.keys(articles).map( async articleTitle => {
        
        const title = articleTitle.split(' ').join('-');

        fs.writeFileSync(`${title}.md`, `# ${articleTitle}`);
        fs.appendFileSync(`${title}.md`, `# ${articles[articleTitle]}`);
        const fileContent = fs.readFileSync(`${title}`).toString('base64');

        const config = {
            headers: {
                'Authorization': 'Token YOUR_PERSONAL_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            }
        };

        const repository = 'OHovey/NeutralityNews';

        try {

            const response = await axios.put(`https://api.github.com/repos/${repository}/src/data/articles/${title}`, {
                message: `uploaded new article: "${title}.md"`,
                content: fileContent
            }, config);

            fs.unlinkSync(title)

        } catch (error) {
            console.log(`An error ocurred uploading file ${title} : ${error}`);
        }
    })

    axios.post('https://api.openai.com/v1/completions', {
        "model": "text-ada-001",
        "prompt": "say hello",
        "temperature": 0
    }, {
        headers: {
            "Authorization": "Bearer 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"
        }
    }).then(function (response) {
        console.log(JSON.stringify(response.data));
    }).catch(function (error) {
        console.log(error);
    });

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", myHandler)

export { handler };

