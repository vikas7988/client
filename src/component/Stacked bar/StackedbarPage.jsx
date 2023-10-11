import React, { useEffect, useState } from "react";
import StackedBarplot from "./Stackedbarplot";
import { useSelector } from "react-redux";

const StackedBarPage = () => {
  const redData = useSelector((state) => state.graphData.graphData);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    const transformData = () => {
      // Filter out items with empty or null 'topic' and 'end_year' before processing
      const filteredData = redData.filter(
        (item) =>
          item.topic != null &&
          item.topic !== "" &&
          item.end_year != null &&
          item.end_year !== ""
      );

      // Group data by year and topic, and calculate the mean relevance
      const groupedData = {};
      filteredData.forEach((item) => {
        const { end_year, topic, relevance } = item;
        if (!groupedData[end_year]) {
          groupedData[end_year] = {};
        }
        if (!groupedData[end_year][topic]) {
          groupedData[end_year][topic] = [];
        }
        groupedData[end_year][topic].push(relevance);
      });

      // Calculate the mean relevance for each topic within a year
      const result = Object.keys(groupedData).map((year) => {
        const topicData = groupedData[year];
        const topicMeans = {};
        Object.keys(topicData).forEach((topic) => {
          const relevanceArray = topicData[topic];
          const mean = relevanceArray.reduce((sum, value) => sum + value, 0) / relevanceArray.length;
          topicMeans[topic] = mean;
        });

        return {
          x: year,
          ...topicMeans,
        };
      });

      return result;
    };

    setTransformedData(transformData());
  }, [redData]);

  return (<>

{transformedData.length===0?null: <div style={{boxShadow:'0px 0px 4px black', paddingTop:'10px'}}>
      {transformedData.length > 0 ? (
        <StackedBarplot data={transformedData} width={700} height={400} />
      ) : (
        <p>Loading...</p>
      )}
    </div>}
  
    
    </> );
};

export default StackedBarPage;
