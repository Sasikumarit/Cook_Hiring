import * as React from "react";
import { useHistory } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";
import { DateTime } from "luxon";

const AppliedJobs = ({user}) => {
  const history = useHistory();
  
  const [state, setState] = React.useState({ columns: [], rows: [] });

  React.useEffect(() => {
    const columns = [
      { field: "id", headerName: "S.No", width: 90 },
      {
        field: "jobdescription",
        headerName: "Job Description",
        width: 150,
        editable: false,
      },
      {
        field: "wageperday",
        headerName: "Wage Per Day",
        type: "number",
        width: 110,
        editable: false,
      },
      {
        field: "location",
        headerName: "Location",
        width: 150,
        editable: false,
      },
      {
        field: "fromdate",
        headerName: "From Date",
        width: 150,
        editable: false,
        valueGetter: (params) =>
          `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
      },
      {
        field: "todate",
        headerName: "To Date",
        width: 110,
        editable: false,
        valueGetter: (params) =>
          `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
      },
      {
        field: "username",
        headerName: "User Name",
        width: 110,
        editable: false,
      },
    ];

    async function fetch() {
      await Axios.get(process.env.REACT_APP_ServerHost + `jobs/findAppliedUser/${user.id}`).then((res) => {
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

export default AppliedJobs;
