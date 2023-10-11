import { useMemo } from "react";
import { scaleLinear } from "d3"; // Import scaleLinear from d3

// Define the AxisBottom component
const AxisBottom = ({ xScale, pixelsPerTick, height }) => {
  // Define the tick length
  const TICK_LENGTH = 5;

  // Get the range from the xScale
  const range = xScale.range();

  // Calculate the ticks using useMemo
  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale, pixelsPerTick]);

  // Render the AxisBottom component
  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="green"
            strokeWidth={1}
          />
          <text
            key={value}
            style={{
                backgroundColor:"red",
              fontSize: "15px",
              textAnchor: 'middle',
              transform: "translateY(25px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom; 
