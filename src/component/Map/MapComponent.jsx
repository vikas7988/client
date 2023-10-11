import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countriesGeoJSON from "./data/countries.json";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";


function MapComp() {
  const redData = useSelector((d) => d.graphData.graphData);
  const uniqueCountries = [...new Set(redData.map((el) => el.country))];

  const [selectedCountries, setSelectedCountries] = useState(uniqueCountries);

  useEffect(() => {
    setSelectedCountries(uniqueCountries);
  }, [redData]);

  function getColor(countryName) {
    return selectedCountries.includes(countryName) ? "red" : "white";
  }

  function onEachCountry(country, layer) {
    const countryName = country.properties.ADMIN;

    layer.setStyle({
      fillColor: getColor(countryName),
      fillOpacity: 1,
      color: "black",
      weight: 2,
    });

    let tooltipContent = countryName

    layer.bindTooltip(tooltipContent, {
      permanent: false,
      direction: "auto",
      className: "custom-tooltip",
    });
  }

  return (
    <div>
      <div style={{ boxShadow:'0px 0px 4px black', padding:'15px'}}>
      <h1 className="heading">Geographical representation of Data</h1>
        <MapContainer
          style={{ height:'600px', background:'white' }}
          center={[20, 100]}
          zoom={2}
          attributionControl={null}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <GeoJSON
            style={(feature) => ({
              fillColor: getColor(feature.properties.ADMIN),
              fillOpacity: 1,
              color: "black",
              weight: 2,
            })}
            data={countriesGeoJSON.features}
            onEachFeature={onEachCountry}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComp;
