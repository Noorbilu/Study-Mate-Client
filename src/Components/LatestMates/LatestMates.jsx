import React, { use } from 'react';
import PartnerCard from '../PartnerCard/PartnerCard';

const LatestMates = ({ latestMatesPromise }) => {
    const partner = use(latestMatesPromise);
    console.log(partner);

    return (
        <div className='mx-auto max-w-6xl'>
            <h2 className="p-6 text-5xl text-center text-fuchsia-800">Study <span className='text-fuchsia-950'>Partner</span></h2>
            <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    partner.map(partner => <PartnerCard
                        key={partner._id}
                        partner={partner}
                    ></PartnerCard>)
                }
            </div>
        </div>
    );
};

export default LatestMates;