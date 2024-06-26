import React, { useState } from "react";
import Summary from "../components/Summary";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

//import { useSummaryData } from "../hooks/useSummaryData";

import { useSummaryData } from "../context/SummaryContext";

import { motion, useIsPresent } from "framer-motion";

export const slideIn = {
  initial: {
    opacity: 0,
    y: 80,
  },

  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),

  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

export default function HomePage() {

  const isPresent = useIsPresent();

  const { summaryData } = useSummaryData();

  console.log(summaryData)

  return (
    <div className="container-wrapper">
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />

      <Header title={"Summary Board"} bgColor={"bg-teal-900"} textColor={"text-white"}/>

      <Navbar />

      {summaryData.length === 0 ? 
      
      <section className="summaries-container flex items-start justify-center pt-16">
        <h2 className="text-xl font-semibold">Loading Summaries...</h2>
      </section> 
      
      : 

      <section className="summaries-container">
        {summaryData.map((summary, i) => (
          <motion.div
            key={`summary_${i}`}
            custom={i}
            variants={slideIn}
            animate="enter"
            exit="exit"
            initial="initial"
          >
            {/* previous data structure */}
            {/* <Summary
              key={summary.contact_id}
              id={summary.contact_id}
              title={summary.result.idea_title}
              content={summary.result.long_description}
            /> */}
            <Summary
              key={summary.id}
              id={summary.id}
              title={summary.idea_title}
              content={summary.long_description}
              user_name={summary.contact_name}
              generated_image={summary.generated_image_link}
              likes={summary.likes}
              time={summary.timestamp}
            />
          </motion.div>
        ))}
      </section>

}

      <footer className="p-6 border-t-2 bg-white border-gray-300">
        <h2>Udhyam Learning Foundation</h2>
      </footer>
    </div>
  );
}
