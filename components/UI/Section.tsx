import React from "react";

const Section = ({ title, description, children }: any) => {
  return (
    <div className="pb-8 border-b border-zinc-900 last:border-0">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-zinc-500 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Section;
