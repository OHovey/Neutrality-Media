import * as React from 'react';
import type {FC} from 'react'
import type { PageProps } from 'gatsby'; 

import Nav from './Nav';
import Footer from './Footer';


const Template = (props: any) => {

    return (
        <main>
            <Nav />
                {props.children} 
            <Footer />
        </main>
    )
}

export default Template;