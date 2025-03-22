// src/hooks/useD3.ts
import React from "react";
import * as d3 from "d3";

export const useD3 = (
  renderChartFn: (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) => {
  const ref = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      renderChartFn(d3.select(ref.current));
    }
    return () => {}; // Cleanup if necessary
  }, [dependencies, renderChartFn]);

  return ref;
};
