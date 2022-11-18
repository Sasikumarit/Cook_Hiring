import * as React from "react";
import { useHistory } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";

const AppliedCandidates = (props) => {
  const history = useHistory();
  console.log("props", props);

  const [state, setState] = React.useState({ columns: [], rows: [] });

  React.useEffect(() => {
    const columns = [
      { field: "id", headerName: "S.No", width: 90 },
      {
        field: "jobseekername",
        headerName: "Name",
        width: 150,
        editable: false,
      },
      {
        field: "location",
        headerName: "Wage Per Day",
        type: "number",
        width: 110,
        editable: false,
      },
      {
        field: "mobileno",
        headerName: "Mobile Number",
        width: 150,
        editable: false,
      },
      {
        field: "email",
        headerName: "Email Address",
        width: 150,
        editable: false,
      },
      {
        field: "yearofxp",
        headerName: "Year(s) of Experience",
        width: 110,
        editable: false,
      },

      {
        field: "userid",
        headerName: "User",
        width: 110,
        editable: false,
      },
    ];

    async function fetch() {
      await Axios.get(process.env.REACT_APP_ServerHost + `job_seeker`).then((res) => {
        if (res.status === 200) {
          setState({ columns: columns, rows: res.data.response });
          return res.data.response;
        }
        return res;
      });
    }
    fetch();
  }, []);

  return (
    <div style={{ width: "65%", margin: "2%" }}>
      <CustomDataGrid columns={state.columns} rows={state.rows} />
    </div>
  );
};

export default AppliedCandidates;
