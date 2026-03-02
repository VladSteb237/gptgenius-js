import Link from "next/link";
import React from "react";

const TourCard = (props) => {
  const { tour } = props;
  const { id, city, country } = tour;

  return (
    <Link
      href={`/tours/${id}`}
      className="card card-compact rounded-xl bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center capitalize">
          {city},{country}
        </h2>
      </div>
    </Link>
  );
};

export default TourCard;
