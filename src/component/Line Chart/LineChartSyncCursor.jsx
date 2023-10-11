import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
import { useSelector } from "react-redux";

const LineChartSyncCursor = ({ width = 700, height = 400 }) => {
  const [cursorPosition, setCursorPosition] = useState(null);
  const reduxData = useSelector((state) => state.graphData.graphData);
  const [meanIntensityData, setMeanIntensityData] = useState([]);
  const [meanLikelihoodData, setMeanLikelihoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = reduxData.filter(
        (d) =>
          d.end_year !== null &&
          d.end_year !== "" &&
          d.topic !== null &&
          d.topic !== ""
      );

      // Check if all end_year values are the same
      const isEndYearSame =
        filteredData.length > 0 &&
        filteredData.every((d) => d.end_year === filteredData[0].end_year);

      // Check if all topic values are unique
      const uniqueTopics = new Set(filteredData.map((d) => d.topic));
      const isTopicUnique = uniqueTopics.size === filteredData.length;

      // Check if all likelihood values are the same
      const isLikelihoodSame =
        filteredData.length > 0 &&
        filteredData.every((d) => d.likelihood === filteredData[0].likelihood);

      // If any of the conditions are met, set an empty array in state
      if (isEndYearSame || isTopicUnique || isLikelihoodSame) {
        setMeanIntensityData([]);
        setMeanLikelihoodData([]);
        return;
      }

      const groupedData = {};

      // Group data by topic
      filteredData.forEach((current) => {
        const key = current.topic;
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(current);
      });

      // Sort data within each topic group by end_year in ascending order
      const sortedData = Object.keys(groupedData).reduce((result, topic) => {
        result[topic] = groupedData[topic].sort((a, b) => a.end_year - b.end_year);
        return result;
      }, {});

      // Flatten the sorted data back into an array
      const flattenedData = Object.values(sortedData).reduce((result, topicData) => {
        return [...result, ...topicData];
      }, []);

      const transformedData = flattenedData.reduce((result, current) => {
        const key = `${current.end_year}_${current.topic}`;
        if (!result[key]) {
          result[key] = {
            end_year: parseInt(current.end_year),
            topic: current.topic,
            intensities: [current.intensity],
            likelihood: current.likelihood,
          };
        } else {
          result[key].intensities.push(current.intensity);
        }
        return result;
      }, {});

      const calculatedMeanIntensityData = Object.values(transformedData).map(
        (entry) => ({
          end_year: entry.end_year,
          topic: entry.topic,
          mean_intensity:
            entry.intensities.reduce((sum, intensity) => sum + intensity, 0) /
            entry.intensities.length,
        })
      );

      const calculatedMeanLikelihoodData = Object.values(transformedData).map(
        (entry) => ({
          end_year: entry.end_year,
          topic: entry.topic,
          mean_intensity: entry.likelihood,
        })
      );

      setMeanIntensityData(calculatedMeanIntensityData);
      setMeanLikelihoodData(calculatedMeanLikelihoodData);
      console.log(calculatedMeanIntensityData);
      console.log(calculatedMeanLikelihoodData);
    };

    fetchData();
  }, [reduxData]);

  return <>

  {meanIntensityData===0?null:
    meanIntensityData.length > 0 ? (
    <div style={{ boxShadow: '0px 0px 5px black' }}>
    <h1 className="heading">The likelihood and intensity of certain topics year over year</h1>
    <div style={{ display: "flex" }}>
      <LineChart
        data={meanIntensityData}
        width={width / 2}
        height={height}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        color={"#e85252"}
        boxShadow={'0px 0px 5px black'}
      />
      <LineChart
        data={meanLikelihoodData}
        width={width / 2}
        height={height}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        color={"#6689c6"}
        boxShadow={'0px 0px 5px black'}
      />
    </div>
    </div>
  ) :null
  }
  
 
  </>
}

export default LineChartSyncCursor;
