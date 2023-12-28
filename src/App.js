import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import Background from "./Background";
import IpConfig from "./IpConfig";

const App = () => {
  const [images, setImages] = useState([]);
  // const searchInput = useRef(null);
  const [searchInput, setsearchInput] = useState("Mumbai")
  console.log(searchInput)

  //State to store the data which is received from the callback of IpConfig.js
  const [callbackIpData, setCallbackIpData] = useState(null);
  // console.log(callbackIpData, "data from IpConfig.js");

  //To check if the Location is avaible from the Ip or else set the location to user input
  const urlInput = searchInput?.target?.value || callbackIpData;
  console.log(urlInput);

  useEffect(() => {
    setTimeout(() => {
      populateImages()
    }, 2000);
  }, [callbackIpData])


  //Base URl for image
  const API_URL = "https://api.unsplash.com/search/photos";

  //Function to hit the APi with the input and API key
  const populateImages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?query=${urlInput}&page=1&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_API_KEY}`
      );
      setImages(response.data);
      console.log("response", response.data)
    } catch (error) {
      console.log("error", error);
    }
  };

  //Search Handler for the input field
  const searchHandler = (e) => {
    e.preventDefault();
    populateImages();
  };

  //Function for getting the data from the IpConfig.js
  const handleIpData = (data) => {
    // console.log(true, data)
    setCallbackIpData(data);
  };

  return (
    <div>
      <form onSubmit={searchHandler}>
        <label htmlFor="gsearch">Search Web:</label>
        <input type="search" id="gsearch" name="gsearch" onChange={setsearchInput} />
        <input type="submit" value="Search" onClick={populateImages} />
      </form>

      <IpConfig onIpData={handleIpData} />

      <Background images={images} />
    </div>
  );
};

export default App;
