import React, { use } from 'react';
import PartnerCard from '../PartnerCard/PartnerCard';

const LatestMates = ({ latestMatesPromise }) => {
  const partners = use(latestMatesPromise); 
  console.log(partners);

  const firstFour = partners.slice(0, 4);

  return (
    <div className='mx-auto max-w-6xl'>
      <h2 className="p-10 text-5xl font-bold text-center text-fuchsia-800 drop-shadow-lg">
        Study <span className='text-fuchsia-950 drop-shadow-lg'>Partner</span>
      </h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        {firstFour.map(partner => (
          <PartnerCard
            key={partner._id}
            partner={partner}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestMates;