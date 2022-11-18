import * as React from "react";
import { useHistory } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDataGrid/CustomDataGrid";
import Axios from "axios";
import { DateTime } from "luxon";

const JobsPosted = (props) => {
  const history = useHistory();
  console.log("props", props);

  const [state, setState] = React.useState({ columns: [], rows: [] });

  React.useEffect(() => {
    const columns = [
      { field: "id", headerName: "S.No", width: 90 },
      {
        field: "jobdescription",
        headerName: "Job Description",
        width: 150,
        editable: true,
      },
      {
        field: "wageperday",
        headerName: "Wage Per Day",
        type: "number",
        width: 110,
        editable: true,
      },
      {
        field: "location",
        headerName: "Location",
        width: 150,
        editable: true,
      },
      {
        field: "fromdate",
        headerName: "From Date",
        width: 150,
        editable: true,
        valueGetter: (params) =>
          `${DateTime.fromISO(params.row.fromdate).toFormat("dd-MM-yyyy")}`,
      },
      {
        field: "todate",
        headerName: "To Date",
        width: 110,
        editable: true,
        valueGetter: (params) =>
          `${DateTime.fromISO(params.row.todate).toFormat("dd-MM-yyyy")}`,
      },

      {
        field: "userid",
        headerName: "User",
        width: 110,
        editable: true,
      },
    ];

    async function fetch() {
      await Axios.get(process.env.REACT_APP_ServerHost + `jobs`).then((res) => {
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

export default JobsPosted;
