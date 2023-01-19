import * as React from 'react';

import { Link as GatsbyLink } from "gatsby";

const Nav = () => {

    return (
        <section>
            <nav className="py-10 bg-black" data-config->
                <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between relative">
                    <GatsbyLink to="/" className="hidden lg:block py-3 px-4 bg-red-500 hover:bg-red-400 transition-colors ease-in-out duration-150">
                        
                        <p className='text-heading text-white font-bold'>NEUTRALITY NEWS</p>
                    </GatsbyLink>
                    <a className="inline-block" href="#">
                        <img src="pstls-assets/logos/pstls-logo-normal-white.svg" alt="" width={116} />
                    </a>
                    {/* <GatsbyLink to="/Articles">
                        <p className="text-white">Articles</p>
                    </GatsbyLink> */}
                    <button className="inline-block text-white navbar-burger">
                    {/* <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.5 7C3.22386 7 3 6.77614 3 6.5C3 6.22386 3.22386 6 3.5 6H20.5C20.7761 6 21 6.22386 21 6.5C21 6.77614 20.7761 7 20.5 7H3.5ZM3.5 12C3.22386 12 3 11.7761 3 11.5C3 11.2239 3.22386 11 3.5 11H20.5C20.7761 11 21 11.2239 21 11.5C21 11.7761 20.7761 12 20.5 12H3.5ZM3 16.5C3 16.7761 3.22386 17 3.5 17H20.5C20.7761 17 21 16.7761 21 16.5C21 16.2239 20.7761 16 20.5 16H3.5C3.22386 16 3 16.2239 3 16.5Z" fill="currentColor" />
                    </svg> */}
                    </button>
                </div>
                </div>
            </nav>
            <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-3/4 max-w-xs z-50" data-config->
                <div className="navbar-backdrop fixed inset-0 bg-black bg-opacity-75" />
                <nav className="relative flex flex-col h-full p-8 bg-white">
                <div className="flex items-center justify-between mb-12">
                    <a className="items-center" href="#">
                    <img src="pstls-assets/logos/pstls-logo-md.svg" alt="" width={102} />
                    </a>
                    <button className="inline-block navbar-close focus:outline-none" type="button" aria-label="Close">
                    <img src="pstls-assets/images/navigations/x2.svg" alt="" />
                    </button>
                </div>
                <div>
                    <ul>
                    <li className="py-3"><a className="inline-block font-bold hover:text-gray-900" href="#">Home</a></li>
                    <li className="py-3"><a className="inline-block font-bold hover:text-gray-900" href="#">Products</a></li>
                    <li className="py-3"><a className="inline-block font-bold hover:text-gray-900" href="#">Resources</a></li>
                    <li className="py-3"><a className="inline-block font-bold hover:text-gray-900" href="#">Pricing</a></li>
                    </ul>
                </div>
                <div className="mt-auto">
                    <div><a className="block py-3 text-center font-bold" href="#">Log In</a><a className="block px-8 py-3 text-center text-white font-bold bg-black hover:bg-gray-900" href="#">Sign Up</a></div>
                </div>
                </nav>
            </div>
        </section>

    )
}

export default Nav;