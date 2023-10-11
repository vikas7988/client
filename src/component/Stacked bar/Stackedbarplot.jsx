// StackedBarplot.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { getFilterData } from "../API/createAPI";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const StackedBarplot = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const  validBoundsHeight = height - MARGIN.top - MARGIN.bottom;
  const boundsHeight = isNaN(validBoundsHeight) ? 0 : validBoundsHeight;


  const allGroups = data.map((d) => String(d.x));

  const [allSubgroups, setAllSubgroups] = useState([])

  useEffect(()=>{

     getFilterData('topic')
     .then((res)=>{
      console.log(res.data.data)
      setAllSubgroups( [...res.data.data]);
  }) 


  },[] )
 

  const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
  const series = stackSeries(data);

  const max = d3.max(data, (d) => d3.max(allSubgroups, (key) => d[key]));

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height, max]);

  // X axis
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(allGroups)
      .range([0, boundsWidth])
      .padding(0.05);
  }, [data, width]);

  // Color Scale
  var colorScale = d3
    .scaleOrdinal()
    .domain(allGroups)
    .range([
      "#e0ac2b",
      "blue",
      "#6689c6",
      "#9a6fb0",
      "#a53253",
      "green",
      "red",
    ]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const rectangles = series.map((subgroup, i) => {
    return (
      <g key={i}>
        {subgroup.map((group, j) => {
          return (
            <rect
              key={j}
              x={xScale(group.data.x)}
              y={yScale(group[1])}
              height={yScale(group[0]) - yScale(group[1])}
              width={xScale.bandwidth()}
              fill={colorScale(subgroup.key)}
              opacity={0.9}
            ></rect>
          );
        })}
      </g>
    );
  });

  return (<>
    <h1 className="heading">Year wise topic and it's relevance</h1>
    <div style={{marginTop:'100px'}}>
    <svg width={width} height={height.toString()}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {rectangles}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
    </> );
};

export default StackedBarplot;
