import React from "react";

interface TestimonialCardProps {
  imageSrc: string;
  name: string;
  title: string;
  description: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  description,
  imageSrc,
  name,
  title,
}) => {
  return (
    <div
      id="testimonialItem"
      className="relative w-96 bg-primary-100 m-4 my-12 rounded-lg"
    >
      <img
        src={imageSrc}
        alt="user of timeZoneSyncer"
        className="absolute -top-20 left-28 rounded-full object-cover object-center h-40 w-40"
      />

      <h4 className="mt-24 text-center font-semibold">{name}</h4>
      <p className="text-center">{title}</p>
      <p className="text-base px-4 text-center my-4 text-primary-300">
        {description}
      </p>
    </div>
  );
};
