import React, { useEffect, useState } from "react";
import { getQueryData, getFilterData } from "../API/createAPI";
import { useDispatch } from "react-redux";
import IRactionCreater from "./IRactionCreater";
import './dashboard.css'

function Dashboard() {

  const dispatch = useDispatch()
  const [state, setState] = useState({});
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  async function fetchDataAndSetState(variable) {
    try {
      const res = await getFilterData(variable);
      console.log(res.data.data)
      setState((prevState) => ({
        ...prevState,
        [variable]: [...res.data.data],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDataAndSetState("topic");
    fetchDataAndSetState("end_year");
    fetchDataAndSetState("sector");
    fetchDataAndSetState("region");
    fetchDataAndSetState("source");
    fetchDataAndSetState("country");
    fetchDataAndSetState("pestle");
  }, []);

  useEffect(() => {
    getQueryData(
      selectedEndYear,
      selectedTopic,
      selectedSector,
      selectedRegion,
      selectedSource,
      selectedCountry,
      selectedPestle
    ).then((res) => dispatch(IRactionCreater(res.data.data)));
  }, [
    selectedTopic,
    selectedEndYear,
    selectedSector,
    selectedRegion,
    selectedSource,
    selectedPestle,
    selectedCountry,
  ]);

  return (
    <div className="dashboard-container">
      <select   className="select" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
        <option value="">Select Topic</option>
        {state.topic &&
          state.topic.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      <select className="select" value={selectedEndYear} onChange={(e) => setSelectedEndYear(e.target.value)}>
        <option value="">Select End Year</option>
        {state.end_year &&
          state.end_year.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      
      <select className="select" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
        <option value="">Select Sector</option>
        {state.sector &&
          state.sector.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      <select className="select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">Select Region</option>
        {state.region &&
          state.region.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      <select className="select" value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
        <option value="">Select Source</option>
        {state.source &&
          state.source.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      <select className="select" value={selectedPestle} onChange={(e) => setSelectedPestle(e.target.value)}>
        <option value="">Select Pestle</option>
        {state.pestle &&
          state.pestle.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select> 
      <select className="select" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {state.country &&
          state.country.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      
      {/* Add more select elements for the remaining options */}
    </div>
  );
}

export default Dashboard;
