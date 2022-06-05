import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [e, setE] = useState("");
  let componentRef = useRef();
  return (
    <div className="App">
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => {
          componentRef.current.increment();
          setE("");
          componentRef.current.clearError();
        }}
      >
        Increment With Ref
      </h1>
      <Comp2 ref={componentRef} />
      <h1
        style={{ cursor: "pointer" }}
        onClick={() => {
          componentRef.current.decrement();
          let error = componentRef.current?.error;
          if (error) setE(error);
        }}
      >
        Decrement With Ref
      </h1>

      {e}
    </div>
  );
}

const Comp2 = forwardRef((props, ref) => {
  const [c, sc] = useState(0);
  const [error, setError] = useState("");
  useImperativeHandle(ref, () => ({
    error,
    clearError: () => {
      setError("");
    },
    increment: () => {
      sc(c + 1);
    },
    decrement: () => {
      if (c > 0) sc(c - 1);
      else setError("cant go below 0");
    }
  }));
  return <p>Counter : {c}</p>;
});
