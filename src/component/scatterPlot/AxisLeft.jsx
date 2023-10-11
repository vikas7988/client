import { useMemo } from "react";
import { scaleLinear } from "d3"; // Import scaleLinear from d3

// Define the AxisLeft component
const AxisLeft = ({ yScale, pixelsPerTick, width }) => {
  // Define the tick length
  const TICK_LENGTH = 5;

  // Get the range from the yScale
  const range = yScale.range();

  // Calculate the ticks using useMemo
  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale, pixelsPerTick]);

  // Render the AxisLeft component
  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0, ${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x1={-TICK_LENGTH}
            x2={width + TICK_LENGTH}
            stroke="green"
            strokeWidth={1.2}
          />
          <text
            key={value}
            style={{
              backgroundColor:"red",
              textAnchor: "middle",
              fontSize: "20px",
              color:'black',
              transform: "translateX(-20px)",
              fill: "black",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft; 
