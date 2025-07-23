import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div style={{ padding: "2rem", color: "crimson" }}>
      <h1>
        {error.status} - {error.statusText}
      </h1>
      <p>{error?.data || "Something went wrong."}</p>
    </div>
  );
};

export default Error;
