import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { RiUserLocationFill } from "react-icons/ri";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYW5kaXVzIiwiYSI6ImNscGplZWFvdTA4bTYyam1tZGprMmE3MmMifQ.KhvWCNIuBRCTq47ZKqPhKQ";

const LiveMap = ({ location, phone }: { location: { latitude: number, longitude: number}; phone: string }) => {
  const { latitude, longitude } = location;
  const [showPopup, setShowPopup] = useState(true);
  return (
    <Map
      initialViewState={{
        longitude,
        latitude,
        zoom: 12,
      }}
      style={{ width: "100%", height: "70vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude} anchor="bottom">
        <RiUserLocationFill size={30} color="#20603D" />
      </Marker>

      {showPopup && (
        <Popup
          longitude={longitude}
          latitude={latitude}
          anchor="top"
          onClose={() => setShowPopup(false)}
        >
          {phone} is located here
        </Popup>
      )}
    </Map>
  );
};

export default LiveMap;