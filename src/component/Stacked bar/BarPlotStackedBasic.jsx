import React from "react";
import StackedBarplot from "./Stackedbarplot";
import { data } from "./data";

const BarplotStackedBasicDemo = ({ width = 700, height = 400 }) => (
  <StackedBarplot data={data} width={width} height={height} />
);

export default BarplotStackedBasicDemo;
