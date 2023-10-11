import { useMemo } from "react";
import * as d3 from "d3";
import BarItem from "./BarItem";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.2 ;

const Barplot = ({ width, height=1000, data }) => {
  const boundsWidth = width*1.7;
  const boundsHeight = (data.length+1)*30

  const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

    const max = d3.max(data.map((d) =>{ return (d.value)}))
  const xScale = d3.scaleLinear().domain([0, max]).range([-2,boundsWidth]);


  const allShapes = data.map((d) => {
    return (
      <BarItem
        key={d.name}
        name={d.name}
        value={d.value}
        barHeight={yScale.bandwidth()}
        barWidth={xScale(d.value)}
        x={xScale(0)}
        y={yScale(d.name)}
      />
    );
  });

  return (
   
  <div style={{boxShadow:'0px 0px 4px black', }}>
  <h1 className="heading">Topic and its Relevency</h1>
      <svg width={1400} height={(data.length+3)*30} >
        <g
          width={boundsWidth}
          height={data.length*41}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
        </g>
        
      </svg>
  </div>
  );
};

export default Barplot;
