In D3.js, **domain** and **range** are key concepts used in scales to map input data to output values. Scales are functions
that transform data values from the domain to the range.

### **Domain**

- The **domain** defines the input data's extent or range of values that a scale will accept.
- It is specified as an array of values, typically `[minValue, maxValue]` for continuous scales or a list of discrete
  categories for ordinal scales.
- Example:
  ```javascript
  const scale = d3.scaleLinear().domain([0, 100]);
  ```
  Here, the domain is `[100]`, meaning the scale expects input values between 0 and 100[1][2].

### **Range**

- The **range** specifies the output values that correspond to the input domain.
- It is also an array, typically `[minOutput, maxOutput]` for continuous scales or a list of discrete outputs for ordinal
  scales.
- Example:
  ```javascript
  const scale = d3.scaleLinear().domain([0, 100]).range([0, 500]);
  console.log(scale(50)); // Outputs: 250
  ```
  Here, an input value of `50` (midpoint of the domain) maps to `250` (midpoint of the range)[1][3].

### Key Points:

1. **Mapping**: A scale maps each value in the domain to a corresponding value in the range.
2. **Types of Scales**:
   - Linear scales (`d3.scaleLinear`) map continuous numeric domains to continuous numeric ranges[5].
   - Ordinal scales (`d3.scaleOrdinal`) map discrete domains (e.g., categories) to discrete ranges (e.g., colors)[4].
3. **Customization**: You can customize both domain and range depending on your dataset and visualization needs.

By defining appropriate domains and ranges, you ensure that your data is correctly scaled for visualization elements like
axes, positions, or colors.

Citations: [1] https://www.codecademy.com/resources/docs/d3/scaling/domain [2]
http://www.d3noob.org/2012/12/setting-scales-domains-and-ranges-in.html [3]
https://www.codecademy.com/resources/docs/d3/scaling/range [4] https://d3js.org/d3-scale/ordinal [5]
https://d3js.org/d3-scale/linear [6] https://stackoverflow.com/questions/42973502/understanding-d3-domain-and-ranges [7]
https://d3js.org/d3-scale/quantile [8] https://d3js.org/getting-started

---

Answer from Perplexity: https://www.perplexity.ai/search/96b25f08-1d5a-43ed-a52c-719d4cc6de45?utm_source=copy_output
