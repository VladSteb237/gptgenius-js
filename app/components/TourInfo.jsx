import React from "react";

const TourInfo = (props) => {
  const { tour } = props;
  const { title, description, stops } = tour;
  //console.log(tour);
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="mb-6 leading-loose">{description}</p>
      <ul>
        {stops.map((stop) => {
          return (
            <li key={stop} className="mb-4 bg-base-100 p-4 rounded-xl">
              <p className="text italic">{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TourInfo;
