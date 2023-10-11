import { useEffect, useState } from "react";
import Barplot from "./BarPlot";
import { useSelector } from "react-redux";


const BarplotDatasetTransition = ({ width, height }) => {
  const data = useSelector((state) => state.graphData.graphData);

  const [selectedData, setSelectedData] = useState(data);

  useEffect(() => {
    const myData = data.map((item) => {
      return {
        name: item.topic == null & item.topic == "" ? 0 : item.topic,
        value: item.relevance == null ? 0 : item.relevance,
      };
    });

    function calculateMean(groupedData) {
      const total = groupedData.reduce((sum, item) => sum + item.value, 0);
      return total / groupedData.length;
    }
    const groupedByName = myData.reduce((acc, item) => {
      const key = item.name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    const result = Object.keys(groupedByName).map((name) => ({
      name,
      value: parseInt(calculateMean(groupedByName[name]) ), 
    })).filter((el)=>(el.name!=""));

    setSelectedData([...result]);
    

  }, [data]);

  return (
    <div >
       {selectedData.length===0? null:<Barplot width={width} height={height-50} data={selectedData} />}
    
      
    </div>
  );
};

export default BarplotDatasetTransition;
