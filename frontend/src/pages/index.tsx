import React from "react";
import { TestimonialCard } from "../ui/components/TestimonialCard";
import Link from "next/link";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  return (
    <div className="my-4">
      <div className="flex justify-center items-center">
        <h3 className="text-secondary text-center leading-7">
          Over 10,000 satisfied customers
        </h3>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center my-20"
        id="testimonialWrapper"
      >
        <TestimonialCard
          name="Alex"
          title="ML engineer"
          imageSrc="/images/testimony_1.jpg"
          description="I always wished that a product like
              TimeXoneSyncer existed and finally got
              it. I am very happy to say that the TimeXoneSyncer is the best platform to sync international
              time set the reminder and all other important stuff for us freelancers having international  clients staying update with international time  has never been easy"
        />
        <TestimonialCard
          name="Dawyne"
          title="actor"
          imageSrc="/images/testimony_2.jpg"
          description="timeXoneSyncer is the best I love the product so much so i use it every day and night to schdule meetings or whatever"
        />
        <TestimonialCard
          name="Alex"
          title="ML engineer"
          imageSrc="/images/testimony_1.jpg"
          description="I always wished that a product like
              TimeXoneSyncer existed and finally got
              it. I am very happy to say that the TimeXoneSyncer is the best platform to sync international
              time set the reminder and all other important stuff for us freelancers having international  clients staying update with international time  has never been easy"
        />
      </div>
      <Link href="#">see all testimonial</Link>
    </div>
  );
};

export default Index;
