import React from "react";
import { Select } from "./Select";

type Props = {
  onChange: (keys: any) => void;
  filter?: any;
  searchHandle?: any;
};

const Filters = React.memo((props: Props) => {
  const { onChange, filter, searchHandle } = props;
  const onChangeFilter = (newFilters = {}) => {
    onChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5 items-end">
      <div className=" shadow-sm">
        <label className="primaryLabel">Employee Name</label>
        <div className="mt-1">
          <input
            type="search"
            name="search"
            className="primaryInput"
            placeholder="e.g: Admin User"
            value={filter?.employeeName || ""}
            onChange={(e) => {
              onChangeFilter({ employeeName: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <label className="primaryLabel">Action Type</label>
        <Select
          options={[
            { label: "All", value: "" },
            { label: "DARI_REFRESH_TOKEN", value: "DARI_REFRESH_TOKEN" },
            { label: "DARI_APP_LOGIN", value: "DARI_APP_LOGIN" },
            { label: "INITIATE_APPLICATION", value: "INITIATE_APPLICATION" },
            { label: "SUBMIT_APPLICATION", value: "SUBMIT_APPLICATION" },
            { label: "ADD_EMPLOYEE", value: "ADD_EMPLOYEE" },
          ]}
          value={filter?.actionType || ""}
          preValue=""
          onChange={(e) => {
            onChangeFilter({
              actionType: e?.value === "All" ? "" : e?.value,
            });
          }}
        />
      </div>
      <div>
        <label className="primaryLabel">Application Type</label>
        <Select
          options={[
            { label: "All", value: "" },
            { label: "CERT_TITLE_DEED_PLOT", value: "CERT_TITLE_DEED_PLOT" },
            { label: "LEASE_REGISTRATION", value: "LEASE_REGISTRATION" },
            { label: "ADD_POA", value: "ADD_POA" },
            { label: "ADD_COMPANY", value: "ADD_COMPANY" },
            { label: "ADD_COMPANY_EMPLOYEE", value: "ADD_COMPANY_EMPLOYEE" },
            { label: "CERT_PROP_OWNERSHIP", value: "CERT_PROP_OWNERSHIP" },
            { label: "LEASE_CLOSURE", value: "LEASE_CLOSURE" },
          ]}
          value={filter?.applicationType || ""}
          preValue=""
          onChange={(e) => {
            onChangeFilter({
              applicationType: e?.value === "All" ? "" : e?.value,
            });
          }}
        />
      </div>
      <div className=" shadow-sm">
        <label className="primaryLabel">From Date</label>
        <input
          type="date"
          name="fromDate"
          className="primaryInput"
          placeholder="Select Date"
          value={filter?.fromDate || ""}
          onChange={(e) => {
            onChangeFilter({ fromDate: e.target.value });
          }}
        />
      </div>
      <div className=" shadow-sm">
        <label className="primaryLabel">To Date</label>
        <input
          type="date"
          name="toDate"
          className="primaryInput"
          placeholder="Select Date"
          value={filter?.toDate || ""}
          onChange={(e) => {
            onChangeFilter({ toDate: e.target.value });
          }}
        />
      </div>
      <div className=" shadow-sm">
        <label className="primaryLabel">Application ID</label>
        <input
          type="search"
          name="search"
          className="primaryInput"
          placeholder="e.g: 219841/2021"
          value={filter?.applicationId || ""}
          onChange={(e) => {
            onChangeFilter({ applicationId: +e.target.value });
          }}
        />
      </div>
      <div className="flex items-end justify-end h-full">
        <button type="button" className="primaryButton"
          onClick={searchHandle}
        >
          Search Logger
        </button>
      </div>
    </div>
  );
}
)
export default Filters;
