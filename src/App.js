
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

  return (
    <div>
      <Dashboard />
      {redData.length === 0 ? (
        <Loading/>
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