import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Spiner } from "./components/shared";
import { LoggerScreen } from "./screens/LoggerScreen";
import { FetchData } from "./services/apis";
import { AuditLog } from "./services/types";

function App() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await FetchData.applicationLoggerList();
      setAuditLogs(data.auditLog);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(auditLogs);

  return (
    <BrowserRouter>
      <div className="px-3 py-3 divide-y-[1px] divide-primary-light-grey divide-opacity-25">
        <div className="pb-4 font-medium">
          <span className="text-primary-blue ">{`Home > Adminisatration `}</span>
          <span className="text-primary-light-grey">{`> Logger search`}</span>
        </div>
        {loading && (
          <div className="h-screen flex flex-col justify-center items-center">
            <Spiner />
            <span className="text-4xl font-black text-primary-light-grey">
              LOADING ...
            </span>
          </div>
        )}
        {(auditLogs.length > 0 && <LoggerScreen auditLogs={auditLogs} />)}
      </div>
    </BrowserRouter>
  );
}

export default App;
