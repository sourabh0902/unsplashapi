import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const IpConfig = ({ onIpData }) => {
  //storing ip related response
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    const handleLocation = async () => {
      navigator.geolocation.getCurrentPosition(async position => {

        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          setIpInfo(response.data.address.city)
          onIpData(response.data.address.city)

        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      });
    };

    handleLocation()

  }, [onIpData])


  return <div></div>;
};

export default IpConfig;
