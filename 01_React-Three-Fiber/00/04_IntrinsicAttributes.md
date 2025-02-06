In React with TypeScript, `IntrinsicAttributes` is an interface automatically included as part of the props for every JSX
element[1]. It represents built-in attributes common to all JSX elements, such as `key` and `ref`[1][5].

**Key points about `IntrinsicAttributes`:**

- **Purpose:** It allows you to specify extra properties used by the JSX framework which are not generally used by the
  components’ props[2].
- **Usage:** Ensure your custom components accept and pass along these attributes to the underlying HTML elements or custom
  components[1]. This is important for attributes like `key` and `ref` that React uses internally[1].
- **Conflicts:** When defining props for a component, ensure they are assigned to the type `IntrinsicAttributes` and that any
  additional props you define do not conflict with the properties of `IntrinsicAttributes`[1].
- **Typing:** Provide detailed type definitions for your props to reduce the likelihood of encountering errors related to
  `IntrinsicAttributes`[1].
- **Common Errors:** A common TypeScript error is "Property does not exist on type 'IntrinsicAttributes'," which indicates
  you're trying to use a prop not defined in the props interface[1]. To resolve this, check the interface for your
  component's props and ensure that all the properties you are using are defined and correctly typed[1]. Add any missing
  properties to the interface[1].
- **Debugging:** Destructure and spread the props in your custom components to ensure all `IntrinsicAttributes` are passed
  down correctly[1].

**Example**

```tsx
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  customProp: string;
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div {...props}>{props.children}</div>;
};
```

In this example, `MyComponentProps` extends `React.HTMLAttributes<HTMLDivElement>` to include intrinsic attributes[1].

Citations: [1] https://www.dhiwise.com/post/the-ultimate-guide-to-react-intrinsicattributes [2]
https://www.typescriptlang.org/docs/handbook/jsx.html [3]
https://8thesource.hashnode.dev/is-not-assignable-to-type-intrinsicattributes [4]
https://www.reddit.com/r/reactjs/comments/18v8nic/typescriptjest_issue_property_does_not_exist_on/ [5]
https://stackoverflow.com/questions/71106004/intrinsicattributes-props-in-react-typescript-component [6]
https://forum.codewithmosh.com/t/whenever-i-pass-onclick-on-a-react-icon-component-i-get-a-typescript-error/19766 [7]
https://www.reddit.com/r/reactjs/comments/oq1rtp/type_authors_author_is_not_assignable_to_type/ [8]
https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/

To extend interfaces in TypeScript, you can use the `extends` keyword[1][3][4]. This allows you to copy the properties and
methods of one or more interfaces into another[4].

**Extending a Single Interface**

```typescript
interface A {
  a(): void;
}

interface B extends A {
  b(): void;
}
```

In this example, interface `B` extends interface `A`, so it inherits the `a()` method from `A` and also defines its own
method `b()`[4].

**Extending Multiple Interfaces**

```typescript
interface C {
  c(): void;
}

interface D extends B, C {
  d(): void;
}
```

Here, interface `D` extends both interfaces `B` and `C`, meaning it includes all the methods from `B` (`a()` and `b()`) and
`C` (`c()`), as well as its own method `d()`[4].

**Specific examples related to React and Three.js**

You can extend interfaces to define types for React components, potentially integrating with libraries like Three.js[2][7].
For example, to define properties for a 3D mesh in React Three Fiber, you might extend existing intrinsic elements:

```typescript
interface IntrinsicElements extends ThreeElements {
  mesh: MeshProps;
}
```

Alternatively, you can extend `IntrinsicElements` in `ThreeElements`[8]:

```typescript
interface ThreeElements extends IntrinsicElements {
  mesh: MeshProps;
}
```

In these examples, `MeshProps` would be an interface defining the properties specific to a mesh component within a Three.js
scene[8].

Citations: [1] https://compiletab.com/extend-multiple-interfaces-typescript/ [2]
https://stackoverflow.com/questions/41642085/an-interface-may-only-extend-a-class-or-another-interface-mapped-types [3]
https://dev.to/tomoy/three-ways-of-using-extends-in-typescript-3dld [4]
https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/ [5]
https://github.com/pmndrs/react-three-fiber/issues/130 [6]
https://discourse.threejs.org/t/trying-to-fix-the-type-of-line-for-conversion-to-typescript/59777 [7]
https://r3f.docs.pmnd.rs/tutorials/typescript [8] https://dev.to/tomoy/interface-extendingmerging-in-typescript-3fjb
