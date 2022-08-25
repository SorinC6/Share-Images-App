import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import HeroSection from "./HeroSection";
import MasonryLayout from "./MansoryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const text = categoryId || "new";
  console.log("categoryId", categoryId);
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {categoryId === undefined && <HeroSection />}
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Feed;
