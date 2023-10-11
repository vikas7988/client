import { useSelector } from "react-redux";
// import { data } from "./data";
import DonutChart from "./DonutChart";
import { useEffect, useState } from "react";
const DonatChartPage = () => {
  const redData = useSelector((state) => state.graphData.graphData);

  const [donutData, setDonatData] = useState([]);

  useEffect(() => {
    const topicFrequency = {};
    const otherTopicValue = {}; // Store values for topics with frequency 1 or 2
  
    redData.forEach((item) => {
      const topic = item.topic;
  
     
        if (topicFrequency[topic]) {
          topicFrequency[topic]++;
        } else {
          topicFrequency[topic] = 1;
        }
    
    });
    Object.keys(topicFrequency).forEach((topic) => {

        if(redData.length>50){
      if (topicFrequency[topic] <25) {
        if (otherTopicValue['other topic']) {
          otherTopicValue['other topic'] += topicFrequency[topic];
        } else {
          otherTopicValue['other topic'] = topicFrequency[topic];
        }
        delete topicFrequency[topic]; 
      }}
    });
  
    // Combine topic frequencies with other topic value
    const topicArray = Object.keys(topicFrequency).map((topic) => ({
      name: topic,
      value: topicFrequency[topic],
    }));
  
    // Add 'other topic' if it has a value
    if (otherTopicValue['other topic']) {
      topicArray.push({
        name: 'other topic',
        value: otherTopicValue['other topic'],
      });
    }
  
    // Sort the topicArray in ascending order based on value
    topicArray.sort((b, a) => a.value - b.value);
  
    setDonatData(topicArray);
    console.log(topicArray);
  }, [redData]);
  
  return (
    <div  >
      <DonutChart data={donutData} width={750} height={600}  />
    </div>
  );
};

export default DonatChartPage;
