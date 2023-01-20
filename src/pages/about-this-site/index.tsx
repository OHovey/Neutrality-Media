import * as React from 'react';
import Template from '../../templates/base';


const AboutThisSite = () => {



    return (
        <Template>
            <div className="min-h-screen p-20 bg-gradient-to-r from-red-400">

                <div className="bg-white p-10 w-2/3 mx-auto h-full border border-black">
                    <h1 className="w-4/5 text-4xl mb-12 mx-auto font-light text-center">About this site</h1>

                    <div className="mx-auto w-1/5 border border-gray-400 mb-12" />

                    <p className="w-4/5 mx-auto leading-10 text-xl">
                        Hi there. I'd like to welcome you to the site with an introduction written by chatGPT:
                    </p>
                    <br />
                    <p className="w-4/5 mx-auto leading-10 text-xl italic text-gray-600">
                        "Introducing 'Neutrality Media,' a cutting-edge news and information website that utilizes advanced language generation technology powered by ChatGPT. Our team of expert editors curates the most relevant and interesting topics, and then sets ChatGPT to work crafting informative and engaging articles on those subjects. The result is a diverse array of content that is both timely and accurate, covering everything from current events to science and technology. With The AI Writer, you can stay informed and educated on the latest news and trends, all with the added assurance that the articles are generated by the industry-leading language model, ChatGPT."
                    </p>
                    <br />
                    <p className="w-4/5 mx-auto leading-10 text-xl">
                        A facinating project into the potential for automated content generation in the early phase of AIs mass adoption its emergence into the general conscience. 
                    </p>
                    <br />
                    <p className="w-4/5 mx-auto leading-10 text-xl italic">
                        <p className="font- bold inline">Disclaimer</p>: The information provided on this website is generated by ChatGPT, an advanced language generation technology. While we strive to ensure the accuracy of the information provided, we make no guarantees or warranties as to its completeness or reliability. By using this website, you acknowledge that any reliance on the information provided by ChatGPT shall be at your own risk. The website owner, its affiliates and the developers of ChatGPT shall not be liable for any damages or losses resulting from the use of the information provided on this website.
                    </p>
                </div>
            </div>
        </Template>
    )
}

export default AboutThisSite;