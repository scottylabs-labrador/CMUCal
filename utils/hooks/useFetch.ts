import React from "react";
import { useState, useEffect } from "react";

// https://www.w3schools.com/react/react_customhooks.asp

interface fetchProps {
    url: string;
}

const useFetch:React.FC<fetchProps> = ({url}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;
