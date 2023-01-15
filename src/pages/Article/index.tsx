import * as React from 'react';
import Template from '../../templates/base';


const Article = () => {

    return (
        <Template>
            <section className="pb-24" style={{backgroundImage: 'url("pstls-assets/images/blog-content/shadow-pink.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                    <div className="py-24 max-w-4xl">
                        <span className="text-indigo-500">Published 02 September 2022</span>
                        <h2 className="text-4xl md:text-5xl font-heading mt-4 mb-6">Lorem ipsum dolor sit amet consectutar domor at elis</h2>
                        <p className="leading-8">These types of questions led me to miss numerous deadlines, and I wasted time and energy in back-and-forth communication. Sadly, this situation could have been avoided if the wireframes had provided enough detail.</p>
                    </div>
                    <img className="block w-full mb-12" src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="" />
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
                        <p className="leading-8 mb-8 pb-8 border-b">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.</p>
                        <h2 className="text-4xl font-heading mb-6">Lorem ipsum</h2>
                        <p className="leading-8 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.</p>
                        <img className="mb-4" src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="" />
                        <p className="text-sm mb-6">
                            <span>Brown wooden dock by Mark Harpur via</span>
                            <a className="text-indigo-500 hover:text-indigo-600 underline hover:no-underline" href="#">Unsplash</a>
                        </p>
                        <p className="leading-8 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor commodo arcu id ullamcorper. Aliquam vestibulum lobortis venenatis. Aenean in pharetra risus, id iaculis leo. Proin id risus sit amet mauris hendrerit tincidunt. Vestibulum pulvinar nec leo nec sagittis. Duis vestibulum sit amet odio sodales consequat. Nam eget elit tempus, cursus lorem vel, sollicitudin massa. Sed varius condimentum massa, et volutpat ante eleifend a. Praesent purus justo, finibus eu suscipit in, vulputate quis est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin euismod tellus quam, eget interdum diam consectetur eget. Phasellus felis quam, iaculis at malesuada nec, varius nec massa. Integer rhoncus sapien faucibus turpis bibendum, quis maximus magna vehicula. Quisque pharetra, tortor sit amet vestibulum tincidunt, tortor lectus pretium ipsum, a elementum risus libero id diam. Morbi ut sem elementum, blandit augue eu, vehicula nunc. Ut et pellentesque mauris.</p>
                        <ul className="mb-6 list-decimal list-inside">
                            <li className="leading-8 mb-2">Pellentesque in elit nec velit suscipit tincidunt sit amet sed augue. Proin augue justo, imperdiet nec ultrices non, dapibus sit amet risus. Nunc pellentesque nisl at neque pulvinar ornare.</li>
                            <li className="leading-8 mb-2">Nullam euismod, turpis a fermentum malesuada, lectus ante consectetur sem, ac eleifend ipsum diam vitae nisi. Pellentesque feugiat, nibh ut hendrerit porta, erat lectus aliquet libero, vitae vulputate leo neque id sapien.</li>
                            <li className="leading-8">Praesent a consequat velit, a tincidunt est. Proin eu facilisis lacus. Fusce orci elit, pharetra at orci at, sagittis sollicitudin ex. Duis vitae nunc mollis, ultrices risus vel, consequat erat. Nam vel diam risus. Ut sed sagittis nibh, sed bibendum eros.</li>
                        </ul>
                        <div className="flex mb-6 bg-indigo-100 relative">
                            <div className="absolute top-0 left-0 px-1 h-full bg-indigo-200" />
                            <div className="pl-14 py-10 pr-10">
                            <h2 className="text-4xl font-heading">“On the other hand, perfection can also haunt some of us to the point of inaction.”</h2>
                            </div>
                        </div>
                        <p className="text-sm mb-6">
                            <span>Danny Bailey, CEO &amp; Founder at</span>
                            <a className="text-indigo-500 hover:text-indigo-600 underline hover:no-underline" href="#">Pstls</a>
                        </p>
                        <p className="leading-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor commodo arcu id ullamcorper. Aliquam vestibulum lobortis venenatis. Aenean in pharetra risus, id iaculis leo. Proin id risus sit amet mauris hendrerit tincidunt. Vestibulum pulvinar nec leo nec sagittis. Duis vestibulum sit amet odio sodales consequat. Nam eget elit tempus, cursus lorem vel, sollicitudin massa. Sed varius condimentum massa, et volutpat ante eleifend a. Praesent purus justo, finibus eu suscipit in, vulputate quis est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin euismod tellus quam, eget interdum diam consectetur eget. Phasellus felis quam, iaculis at malesuada nec, varius nec massa. Integer rhoncus sapien faucibus turpis bibendum, quis maximus magna vehicula. Quisque pharetra, tortor sit amet vestibulum tincidunt, tortor lectus pretium ipsum, a elementum risus libero id diam. Morbi ut sem elementum, blandit augue eu, vehicula nunc. Ut et pellentesque mauris.</p>
                        </div>
                        <div className="w-full lg:w-1/3 px-4">
                        <div className="py-12 px-6 md:px-12 bg-white shadow-lg text-center">
                            <h2 className="text-3xl font-heading mb-4">Sign In to our Newsletter</h2>
                            <p className="leading-8 mb-6">Subscribe to our newsletter and stay updated on the latest developments and special offers!</p>
                            <input className="block mb-3 w-full py-3 px-3 bg-gray-100 placeholder-gray-500" type="email" placeholder="Email address" />
                            <button className="block w-full py-3 px-4 text-center text-white font-bold bg-black hover:bg-gray-900 transform duration-200">Subscribe</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </Template>
    )
}

export default Article;