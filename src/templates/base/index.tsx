import * as React from 'react';
import type {FC} from 'react'
import type { PageProps } from 'gatsby'; 

import Nav from './Nav';
import Footer from './Footer';

import useScript from '../../hooks/useScript';

import GDPRComplienceNotice from './Complience';


const Template = (props: any) => {

    const complienceStatus = useScript(`https://consent.cookiebot.com/5ccba0a0-8ce1-4ebe-92d1-5f0505f3041f/cd.js`)

    return (
        <main>
            <Nav />
                {props.children} 
            <Footer />

            {/* {typeof window !== 'undefined' && window && (
                <GDPRComplienceNotice />
            )} */}

        </main>
    )
}

export default Template;