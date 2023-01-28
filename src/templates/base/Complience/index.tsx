import * as React from 'react';

const GDPRComplienceNotice = () => {

    const [consentAssumed, setConsetAssumed] = React.useState((() => localStorage.getItem('consentAssumed') === 'true')());

    const storeConsentData = async () => {
    
        localStorage.setItem('consentAssumed', 'true');
        setConsetAssumed(true);
    };

    return (
        <div className={!consentAssumed ? "fixed bottom-8 right-8 w-1/3 p-12 rounded-lg bg-black" : "hidden"}>
            <p className="text-white text-2xl mb-4">Notice: </p>
            <p className="text-slate-400">Our website uses Google Analytics cookies to improve your browsing experience and gather data on website usage. By continuing to use our website, you consent to the use of these cookies. If you wish to opt-out of data collection, you can do so by disabling cookies in your browser settings. Thank you.</p>
            <div>
                <button onClick={storeConsentData} className="bg-white px-6 py-2 mr-2 mt-4 font-bold">OK</button>
            </div>
        </div>
    )
}

export default GDPRComplienceNotice;