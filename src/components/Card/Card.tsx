import Link from "next/link";
import React from "react";

export const Card = ({
  title,
  des,
  href,
}: {
  title: string;
  des: string;
  href: string;
}) => {
  return (
    <>
      <Link
        href={href}
        className="border hover:shadow-2xl min-h-40 hover:bg-teal-400 border-amber-700 p-4"
      >
        <div className="bg-amber-200">{title}</div>
        <div>{des}</div>
      </Link>
    </>
  );
};
