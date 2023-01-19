import { Handler, HandlerEvent, HandlerContext, schedule } from "@netlify/functions";
import axios from 'axios';


const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log("Received event:");

    const result = await axios.get('https://api.apify.com/v2/actor-tasks/VncdzeYjbYNubPpkY/run-sync?token=apify_api_FpKFZk1nVdehSrF7HedZ8x7Cqxdnzp0T4bhK', {
        headers: {
            "Content-Type": "application/json"
        }
    }).then( _ => {

        axios.post('https://sprightly-bonbon-6b5065.netlify.app/.netlify/functions/update-and-build-background', {}, {
            headers: {
                'Authorization': `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`
            }
        });
    }).catch(err => {
        console.log("error: " + err)
    })

    return {
        statusCode: 200,
    };
};

const handler = schedule("@daily", myHandler)

export { handler };

