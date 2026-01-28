import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export const TrafficLightWithEffect = () => {
  const [ligth, setLight] = useState<TrafficLightColor>("red");
  const [countDown, setCoundDown] = useState(5);

  useEffect(() => {
    if (countDown === 0) return;

    const intervalId = setInterval(() => {
      setCoundDown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countDown]);

  //change light color effect
  useEffect(() => {
    if (countDown > 0) return;

    setCoundDown(5);
    if (ligth === "red") {
      setLight("green");
    }
    if (ligth === "yellow") {
      setLight("red");
    }
    if (ligth === "green") {
      setLight("yellow");
    }
  }, [countDown, ligth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-thin">
          Semáforo con useEffect
        </h1>
        <h2 className="text-white text-xl">countDown {countDown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countDown / 5) * 100}%` }}
          ></div>
        </div>
        <div
          className={`w-32 h-32 ${ligth === "red" ? colors[ligth] : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${ligth === "yellow" ? colors[ligth] : "bg-gray-500"} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${ligth === "green" ? colors[ligth] : "bg-gray-500"} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
