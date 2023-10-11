import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./component/Dashboard/dashboard";
import ScatterplotPage from "./component/scatterPlot/ScatterPlotPage";
import BarplotPage from "./component/HorizontalBar.jsx/BarPlotPage";
import StackedBarPage from "./component/Stacked bar/StackedbarPage";
import LineChartPage from "./component/Line Chart/LineChartPage";
import DonatChartPage from "./component/DonutChart/DonatChartPage";
import MapComp from "./component/Map/MapComponent";
import Loading from "./component/Loading/loading";
import { useSelector } from "react-redux";

function App() {
  const redData = useSelector((state) => state.graphData.graphData);
  const [loadingTime, setLoadingTime] = useState(); 
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingTime > 0) {
        setLoadingTime((prevTime) => prevTime - 1);
      } else if (redData.length === 0) {
        setShowNoData(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [loadingTime, redData]);

  return (
    <div>
      <Dashboard />
      {showNoData ? (
        <Loading  time={'No data found Kindly set the data Accordingly or reload the page'}/>
        
      ) : loadingTime > 0 ? (
        <Loading time={"Loading Data........" + " " +loadingTime} />
      ) : (
        <div>
          <div className="MapDonat">
            <MapComp />
            <DonatChartPage />
          </div>
          <div className="barplot">
            <BarplotPage />
          </div>
          <div className="linechart">
            <LineChartPage />
          </div>
          <div className="scatter">
            <ScatterplotPage />
            <StackedBarPage />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
