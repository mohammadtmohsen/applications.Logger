import { AuditLog } from "../../services/types";
import { formatDate } from "../../utils/HelperFunctions";
import { Column } from "./Table";

export const Columns: Array<Column> = [
  { title: "Log ID", dataIndex: "logId" },
  { title: "Application Type", dataIndex: "applicationType" },
  {
    title: "Application ID",
    dataIndex: "applicationId",
    render: (_: any, item: AuditLog) => {
      return (
        <div className={`${item.applicationId ? "" : "opacity-50"} text-sm`}>
          {item.applicationId || "-/-"}
        </div>
      );
    },
  },
  { title: "Action Type", dataIndex: "actionType" },
  {
    title: "Action Details",
    dataIndex: "actionDetails",
    render: (_: any, item: AuditLog) => {
      return (
        <div
          className={`${
            item.actionDetails ? "" : "opacity-50"
          } min-w-[100px] text-sm`}
        >
          {item.actionDetails || "-/-"}
        </div>
      );
    },
  },
  {
    title: "Date: Time",
    dataIndex: "creationTimestamp",
    render: (_: any, item: AuditLog) => {
      return (
        <div className="min-w-[260px] text-sm">
          {formatDate(item.creationTimestamp)}
        </div>
      );
    },
  },
];
