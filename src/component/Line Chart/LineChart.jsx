import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const LineChart = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Extract unique topics from the data
  const topics = [...new Set(data.map((d) => d.topic))];

  // Calculate the extent of end_year values in the data
  const endYearExtent = d3.extent(data, (d) => d.end_year);

  // Create X scale with the full range of end_year values
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(endYearExtent) // Use the extent as the domain
      .range([0, boundsWidth]);
  }, [data, boundsWidth, endYearExtent]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.mean_intensity)])
      .range([boundsHeight, 0]);
  }, [data, boundsHeight]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", `translate(0, ${boundsHeight})`)
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const line = d3
    .line()
    .x((d) => xScale(d.end_year))
    .y((d) => yScale(d.mean_intensity));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {topics.map((topic, index) => (
            <path
              key={index}
              d={line(data.filter((d) => d.topic === topic))}
              fill="none"
              stroke={d3.schemeCategory10[index]} 
              strokeWidth={2}
            />
          ))}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

export default LineChart;
