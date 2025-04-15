"use client";
import { Card } from "@/src/components/card";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  const getRealiations = async () => {
    try {
      const res = await fetch(`./realisations.json`);
      const data = await res.json();
      setData(data);
      console.log(data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    getRealiations();
  }, []);

  return (
    <div className="pt-40">
      <h1 className="text-xl mb-9 md:text-2xl dark:text-white font-gothic">
        Mes réalisations
      </h1>
      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          {data.map(
            (
              el: {
                id: number;
                title: string;
                pictures: string[];
                shortDescription: string;
              },
              index
            ) => {
              return <Card key={index} card={el} />;
            }
          )}
        </div>
      )}
    </div>
  );
}
