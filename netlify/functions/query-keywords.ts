import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import axios from 'axios';


const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log("Received event:");

    axios.post('https://sprightly-bonbon-6b5065.netlify.app/.netlify/functions/update-and-build-background', {}, {
        headers: {
            'Authorization': `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`
        }
    });

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", myHandler)

export { handler };

