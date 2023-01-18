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
    console.log("Received event:");

    const result = await axios.get('https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/run-sync?token=apify_api_FpKFZk1nVdehSrF7HedZ8x7Cqxdnzp0T4bhK', {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(err => {
        console.log("error: " + err)
    })

    // @ts-ignore
    // console.log(result);

    // return;

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", myHandler)

export { handler };

