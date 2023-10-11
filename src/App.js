import "./App.css";
import Dashboard from "./component/Dashboard/dashboard";
import ScatterplotPage from "./component/scatterPlot/ScatterPlotPage";
import BarplotPage from "./component/HorizontalBar.jsx/BarPlotPage";
import StackedBarPage from "./component/Stacked bar/StackedbarPage";
import LineChartPage from "./component/Line Chart/LineChartPage";
import DonatChartPage from "./component/DonutChart/DonatChartPage";
import MapComp from "./component/EXAMPLE/MapComponent";

function App() {
  return (
    <div>
      <Dashboard />

      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 2fr)" , width:'95%',height:'60', gap:'3%', margin:'auto', }}>
          <MapComp />
          <DonatChartPage />
        </div>
        <div style={{textAlign:'center', width:'95%', margin:'25px auto'}}>
            <BarplotPage />
          </div>

        <div style={{ display: "block",width:'95%',margin:'auto', marginTop:'20px'}}>
          <LineChartPage />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 2fr)" , width:'95%', gap:'4%', margin:' 20px auto'}}>
          <ScatterplotPage />
          <StackedBarPage />
        </div>

     
       
   
      </div>
    </div>
  );
}

export default App;
