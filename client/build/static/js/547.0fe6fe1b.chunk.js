"use strict";(self.webpackChunkreact_frontend=self.webpackChunkreact_frontend||[]).push([[547],{9547:function(e,t,r){r.r(t);var a=r(4165),o=r(5861),n=r(885),d=r(2791),i=r(1617),s=r(1044),u=r(1411),c=r(184);t.default=function(e){var t=e.user,r=d.useState({columns:[],rows:[]}),l=(0,n.Z)(r,2),f=l[0],h=l[1],m={headers:{Authorization:null===t||void 0===t?void 0:t.token}};return d.useEffect((function(){var e=[{field:"sno",headerName:"S.No",width:90},{field:"jobdescription",headerName:"Job Description",width:150,editable:!0},{field:"wageperday",headerName:"Wage Per Day",type:"number",width:110,editable:!0},{field:"location",headerName:"Location",width:150,editable:!0},{field:"fromdate",headerName:"From Date",width:150,editable:!0,valueGetter:function(e){return"".concat(u.ou.fromISO(e.row.fromdate).toFormat("dd-MM-yyyy"))}},{field:"todate",headerName:"To Date",width:110,editable:!0,valueGetter:function(e){return"".concat(u.ou.fromISO(e.row.todate).toFormat("dd-MM-yyyy"))}},{field:"userid",headerName:"User",width:110,editable:!0}];function t(){return(t=(0,o.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.ZP.get("http://localhost:3000/jobs",m).then((function(t){return 200===t.status?(h({columns:e,rows:t.data.response}),t.data.response):t}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),(0,c.jsx)("div",{style:{width:"65%",margin:"2%"},children:(0,c.jsx)(i.Z,{columns:f.columns,rows:f.rows})})}}}]);
//# sourceMappingURL=547.0fe6fe1b.chunk.js.map