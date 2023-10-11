import * as d3 from "d3";
import AxisLeft from './AxisLeft'; 
import AxisBottom from './AxisBottom';

const MARGIN = { top: 0, right: 20, bottom: 50, left: 60 };

const Scatterplot = ({ width, height, data }) => {
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by subtracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 100]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={2}
        cx={xScale(d.y)}
        cy={yScale(d.x)}
        opacity={1}
        stroke="blue"
        fill="blue"
        fillOpacity={0.2}
        strokeWidth={20}
      />
    );
  });

  return (
    <div style={{marginTop:'30px'}}>
    <h1 className="heading">Correlation between intensity and relevance</h1>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        >
       
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              height={boundsHeight}
            />
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
