import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import PartnerCard from '../../Components/PartnerCard/PartnerCard';
import SearchSortBar from '../../Components/SearchSortBar';
import Spinner from '../../Components/Spinner';
import { useLoaderData } from 'react-router';

const FindPartner = () => {
    // Data preloaded by React Router loader
    const loadedData = useLoaderData();

    // States
    const [partners, setPartners] = useState(loadedData || []);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    // Load filtered/sorted partners
    const load = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/mates', {
                params: { search, sortExp: sort }
            });
            // Backend returns an array of mates
            setPartners(data);
        } catch (err) {
            console.error('Failed to load mates:', err);
        } finally {
            setLoading(false);
        }
    };

    // Optional: refresh when component mounts (if not using loader)
    useEffect(() => {
        if (!loadedData?.length) load();
    }, []);

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-2xl font-bold mb-4">Find Partners</h1>

            {/* Search and Sort Bar */}
            <SearchSortBar
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                onSubmit={load}
            />

            {/* Loading Spinner or Partner Cards */}
            {loading ? (
                <Spinner />
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {partners?.length > 0 ? (
                        partners.map((p) => (
                            <PartnerCard key={p._id} partner={p} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            No partners found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FindPartner;
