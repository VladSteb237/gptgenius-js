"use client";
import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ToursList from "./ToursList";

const ToursPage = () => {
  const [search, setSearch] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", search],
    queryFn: () => getAllTours(search),
  });
  return (
    <React.Fragment>
      <form className="max-w-lg mb-12 mt-8">
        <div className="join w-full">
          <input
            type="text"
            name="search"
            placeholder="enter city or country here..."
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full join-item"
            value={search}
          />
          <button
            type="button"
            disabled={isPending}
            className="btn btn-primary join-item capitalize"
            onClick={() => setSearch("")}>
            {isPending ? "please wait..." : "reset..."}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <ToursList data={data} />
      )}
    </React.Fragment>
  );
};

export default ToursPage;
