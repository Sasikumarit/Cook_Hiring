import React from "react";
import Axios from "axios";

const Home = () => {
  const [serverRequest, setServerRequest] = React.useState(null);

  React.useEffect(() => {
    Axios.get(  process.env.REACT_APP_ServerHost + "api/users",).then((response) => {
      setServerRequest(response.data.response);
    });
  }, []);


  return (
    <div>
     <h1>Sample Project</h1>
    <h5> {JSON.stringify(serverRequest)}</h5>
    </div>
  );
};

export default Home;
