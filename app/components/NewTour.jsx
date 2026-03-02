"use client";
import React from "react";
import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewTour,
  fetchUserTokensById,
  generateTourResponse,
  getExistingTour,
  subtractTokens,
} from "../../utils/actions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const NewTour = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        return existingTour;
      }
      const currentTokens = await fetchUserTokensById(userId);
      if (currentTokens < 300) {
        toast.error("Token balance too low....");
        return;
      }

      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error("No matching city found...");
        return null;
      }

      await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens remaining...`);
      return newTour.tour;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    //console.log(destination);
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            required
            name="city"
            placeholder="city"
            className="input input-bordered w-full join-item"
          />
          <input
            type="text"
            required
            name="country"
            placeholder="country"
            className="input input-bordered w-full join-item"
          />
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary join-item capitalize">
            {isPending ? "please wait" : "generate tour"}
          </button>
        </div>
      </form>
      <div className="mt-16">
        <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </React.Fragment>
  );
};

export default NewTour;
