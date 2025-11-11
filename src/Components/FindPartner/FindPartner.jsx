import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import PartnerCard from '../../Components/PartnerCard/PartnerCard';
import SearchSortBar from '../../Components/SearchSortBar';
import Spinner from '../../Components/Spinner';

const FindPartner = () => {
    const [loading, setLoading] = useState(true);
    const [partners, setPartners] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/partners', { params: { search, sortExp: sort } });
            setPartners(data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);




    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-2xl font-bold">Find Partners</h1>
            <SearchSortBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} onSubmit={load} />
            {loading ? <Spinner /> : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {partners?.map(p => <PartnerCard key={p._id} partner={p} />)}
                </div>
            )}
        </div>
    );
};

export default FindPartner;