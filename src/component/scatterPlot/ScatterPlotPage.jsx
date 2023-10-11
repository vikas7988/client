import React, { useEffect, useState } from "react";
import Scatterplot from "./ScatterPlot";
import { useSelector } from "react-redux";

const ScatterplotPage = () => {
  // Get the data from the Redux store
  const data = useSelector((state) => state.graphData.graphData);

  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    const myData = data.map((item) => {

  
        return {
        
            x: item.intensity==null?0:item.intensity, 
            y: item.relevance==null?0:item.relevance, 
        }

    });
    setScatterData(myData);
  }, [data]);

  return (<>

  {scatterData.length===0?null:<div style={{boxShadow:'0px 0px 4px black'}}>
      <Scatterplot data={scatterData} width={500} height={500} />
    </div>}
    
    </>);
};

export default ScatterplotPage;
