interface Float16Array extends TypedArray {
  constructor(length?: number): Float16Array;
  constructor(array: Iterable<number>): Float16Array;
  constructor(typedArray: TypedArray): Float16Array;
  constructor(arrayBuffer: ArrayBuffer, byteOffset?: number, length?: number): Float16Array;
}

declare var Float16Array: Float16ArrayConstructor;
