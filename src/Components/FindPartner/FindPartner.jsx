import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axiosInstance";
import PartnersGrid from "../../Components/PartnerCard/PartnersGrid";
import SearchSortBar from "../../Components/SearchSortBar";
import { useLoaderData } from "react-router";

const LIMIT = 12;

const FindPartner = () => {
  const loadedData = useLoaderData();
  const [partners, setPartners] = useState(Array.isArray(loadedData) ? loadedData : []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const loadMoreRef = useRef(null);

  
  const buildParams = (pageNum) => ({
    limit: LIMIT,
    page: pageNum,
    sort,
    q: search,
  });

  const fetchPage = async (pageNum, append = false) => {
    setLoading(true);
    try {
      const { data } = await axios.get("/mates", { params: buildParams(pageNum) });
      const items = Array.isArray(data) ? data : [];
      setPartners((prev) => (append ? [...prev, ...items] : items));
      setHasMore(items.length === LIMIT);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to load mates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadedData?.length) fetchPage(1);
  }, []);

 
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPage(page + 1, true);
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [page, hasMore, loading]);

  const applyFilters = () => {
    setHasMore(true);
    fetchPage(1, false);
  };

  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-fuchsia-800 text-center">
        Explore Study Partners
      </h1>

      <SearchSortBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onSubmit={applyFilters}
      />

      <div className="mt-6">
        <PartnersGrid
          partners={partners}
          loading={loading && page === 1}
          basePath="/partners"
        />
      </div>

      <div ref={loadMoreRef} className="h-10" />

      {loading && page > 1 && (
        <div className="text-center text-sm text-gray-500 my-4">
          Loading more…
        </div>
      )}
      {!loading && partners.length === 0 && (
        <p className="text-center text-gray-500 my-6">No partners found.</p>
      )}
      {!loading && partners.length > 0 && !hasMore && (
        <p className="text-center text-gray-500 my-6">You've reached the end.</p>
      )}
    </div>
  );
};

export default FindPartner;