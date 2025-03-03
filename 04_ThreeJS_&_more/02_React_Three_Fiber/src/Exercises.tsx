import React from "react";

const Hello = (): React.JSX.Element => {
  console.log("Hello");

  return (
    <React.Fragment>
      <h2>Hello</h2>
    </React.Fragment>
  );
};

const Title = (): React.JSX.Element => {
  console.log("Title");

  return (
    <React.Fragment>
      <div className="container">React Application</div>
    </React.Fragment>
  );
};

const MemoTitle: React.MemoExoticComponent<() => React.JSX.Element> = React.memo(Title);

const Component = (): React.JSX.Element => {
  const [toggle, setToggle] = React.useState(true);

  const toggleHandler = (): void => {
    setToggle(!toggle);
  };

  return (
    <React.Fragment>
      <MemoTitle />
      <button onClick={toggleHandler}>Toggle</button>
      {toggle ? <Hello /> : null}
    </React.Fragment>
  );
};

const Exercises = (): React.JSX.Element => {
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (titleRef?.current) {
      titleRef.current.innerText = "anything";
    }
  }, []);

  return (
    <React.Fragment>
      <h4 ref={titleRef}>React Application </h4>
      <br />
      <Component />
    </React.Fragment>
  );
};

export default Exercises;
