import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
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

  return {
    //props
    countDown,
    ligth,
    colors,

    //computed
    percentage: (countDown / 5) * 100,
    greenLigth: ligth === 'green' ? colors.green : 'bg-gray-500',
    redLigth: ligth === 'red' ? colors.green : 'bg-gray-500',
    yellowLigth: ligth === 'yellow' ? colors.green : 'bg-gray-500',

    //methods
  };
};
