import * as React from 'react';


const Footer = () => {

    return (
        <section className="py-24 bg-black">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4 mb-10 justify-between">
                <div className="w-full md:w-1/5 px-4 mb-6 md:mb-0">
                    <a className="inline-block" href="#">
                    <img src="pstls-assets/logos/pstls-logo-normal-white.svg" alt="" width={87} />
                    </a>
                </div>
                <div className="w-full md:w-3/5 px-4 mb-6 md:mb-0">
                    <ul className="md:flex items-center justify-center">
                    {/* <li className="mb-6 md:mb-0 md:mr-12"><a className="inline-block font-bold text-sm text-white hover:text-gray-200" href="#">Hello</a></li> */}
                    {/* <li className="mb-6 md:mb-0 md:mr-12"><a className="inline-block font-bold text-sm text-white hover:text-gray-200" href="#">Story</a></li> */}
                    <li className="mb-6 md:mb-0 md:mr-12"><a className="inline-block font-bold text-sm text-white hover:text-gray-200" href="#">About this site</a></li>
                    <li><a className="inline-block font-bold text-sm text-white hover:text-gray-200" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/5 px-4">
                    <div className="flex md:justify-end">
                    <a className="inline-block mr-4" href="#">
                        <img src="pstls-assets/logos/twitter.svg" alt="" />
                    </a>
                    <a className="inline-block mr-4" href="#">
                        <img src="pstls-assets/logos/google.svg" alt="" />
                    </a>
                    <a className="inline-block" href="#">
                        <img src="pstls-assets/logos/facebook.svg" alt="" />
                    </a>
                    </div>
                </div>
                </div>
                <p className="text-sm text-gray-500 text-center">© Pstls. 2022 All right reserved.</p>
            </div>
        </section>

    )
}

export default Footer;