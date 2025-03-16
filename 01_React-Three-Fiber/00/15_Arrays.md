## Overview of Typed Arrays and ArrayBuffer in JavaScript

Typed arrays and `ArrayBuffer` are specialized objects in JavaScript designed for handling binary data efficiently. Below is
an explanation of each type and its differences.

### **Typed Arrays**

Typed arrays provide views over raw binary data stored in an `ArrayBuffer`. Each typed array corresponds to a specific data
type and size. They are not regular arrays and have limited methods compared to normal arrays.

#### **Key Typed Array Types**

1. **`Int8Array`**: Stores signed 8-bit integers (-128 to 127).
2. **`Uint8Array`**: Stores unsigned 8-bit integers (0 to 255).
3. **`Uint8ClampedArray`**: Similar to `Uint8Array`, but clamps values outside the range to 0 or 255.
4. **`Int16Array`**: Stores signed 16-bit integers (-32,768 to 32,767).
5. **`Uint16Array`**: Stores unsigned 16-bit integers (0 to 65,535).
6. **`Int32Array`**: Stores signed 32-bit integers (-2,147,483,648 to 2,147,483,647).
7. **`Uint32Array`**: Stores unsigned 32-bit integers (0 to 4,294,967,295).
8. **`Float32Array`**: Stores 32-bit floating-point numbers with ~7 significant digits.
9. **`Float64Array`**: Stores 64-bit floating-point numbers with ~16 significant digits.
10. **`Float16Array`** (experimental): Stores 16-bit floating-point numbers.

#### **Differences Between Typed Arrays**

- **Range and Precision**: Each typed array supports a specific range and precision based on its bit size.
- **Normalization Behavior**:
  - Integer arrays truncate decimals.
  - `Uint8ClampedArray` clamps values outside the range (e.g., -10 becomes 0; 300 becomes 255).
  - Floating-point arrays round values using "round-to-even" rules.
- **Supported Methods**: Typed arrays share some methods with normal arrays (`map`, `forEach`, etc.) but lack methods like
  `push`, `pop`, or `concat`.

---

### **Normal Arrays**

Normal JavaScript arrays (`number[]`) are dynamic and can store any type of data. They do not have fixed memory sizes or
specific binary formats. They support all array methods (`push`, `pop`, `splice`, etc.) but are less efficient for binary
data manipulation compared to typed arrays.

---

### **ArrayBuffer**

An `ArrayBuffer` is a fixed-length memory buffer that serves as the foundation for typed arrays:

- It represents raw binary data without any specific format.
- Typed arrays act as _views_ over an `ArrayBuffer`, interpreting its contents as specific data types.
- Example:
  ```javascript
  const buffer = new ArrayBuffer(16); // Allocates 16 bytes
  const view = new Int16Array(buffer); // Interprets buffer as signed 16-bit integers
  ```

---

### **Comparison Table**

| Feature           | Typed Arrays                         | Normal Arrays        | ArrayBuffer      |
| ----------------- | ------------------------------------ | -------------------- | ---------------- |
| Data Types        | Fixed (e.g., Int8, Float32)          | Dynamic              | Raw binary data  |
| Memory Allocation | Fixed-length                         | Dynamic              | Fixed-length     |
| Methods Supported | Limited (`map`, `set`)               | Full (`push`, `pop`) | None             |
| Efficiency        | High for binary operations           | Low for binary ops   | High for storage |
| Range Enforcement | Yes (e.g., clamping in Uint8Clamped) | No                   | N/A              |

---

### Key Use Cases

1. **Typed Arrays**: Ideal for performance-critical applications like WebGL, audio/video processing, or file manipulation.
2. **Normal Arrays**: Best suited for general-purpose programming where flexibility matters more than efficiency.
3. **ArrayBuffer**: Used as the underlying storage mechanism for typed arrays or when working directly with raw binary data.

Typed arrays and `ArrayBuffer` enable JavaScript developers to handle low-level binary data efficiently while normal arrays
provide flexibility for general use cases[1][2][3][7].

Citations: [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray [2]
https://javascript.info/arraybuffer-binary-arrays [3]
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays [4]
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array [5]
https://dev.to/rahulrajrd/array-vs-type-vs-type-in-typescript-5g1h [6] https://web.dev/articles/webgl-typed-arrays [7]
https://www.w3schools.com/jsref/jsref_obj_typed_array.asp [8] https://udn.realityripple.com/docs/Web/JavaScript/Typed_arrays

---

Answer from Perplexity:
https://www.perplexity.ai/search/js-what-are-uint16array-uint8c-uqHB1IZtQIirolrsmMLDsw?utm_source=copy_output
