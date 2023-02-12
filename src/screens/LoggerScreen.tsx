import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination, Table } from "../components/shared";
import { MdNavigateNext } from "react-icons/md";
import Filters from "../components/shared/Filters";
import { Columns } from "../components/shared/TableColumn";
import { AuditLog } from "../services/types";
import { removeFalsyValues } from "../utils/HelperFunctions";
type ListPropsType = {
  auditLogs: AuditLog[];
};
export const LoggerScreen: React.FC<ListPropsType> = ({ auditLogs }) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<{ [key: string]: any }>({});
  const [finalList, setFinalList] = useState<any[]>([]);
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [logsPerPage, setLogsPerPage] = useState<number>(10);
  const [sorting, setSorting] = useState<boolean>(false);

  const listSetting = (current: number) => {
    const list = sortedList.length > 0 ? sortedList : searchHandle();
    const indexLastLog = current * logsPerPage;
    const indexFirstLog = indexLastLog - logsPerPage;
    const currentLogs = list.slice(indexFirstLog, indexLastLog);
    setFinalList(currentLogs);
    setTotalPages(Math.ceil(list.length / logsPerPage));
    setcurrentPage(current);
  };

  useEffect(() => {
    listSetting(currentPage);
  }, [currentPage]);

  const onChangeFilter = (newFilters = {}) => {
    setFilter({ ...filter, ...newFilters });
  };

  const searchHandle = () => {
    removeFalsyValues(filter);
    return auditLogs.filter(function (item: any) {
      for (var key in filter) {
        if (key === "fromDate" || key === "toDate") {
          if (
            item.creationTimestamp < filter.fromDate ||
            item.creationTimestamp > filter.toDate
          ) {
            return false;
          }
        } else if (!item[key] || item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  };

  const onSearch = () => {
    listSetting(1);
    setSortedList([]);
    // setSearchParams(filter)
  };

  const onResorting = (event: { sort: string; dataIndex: string }) => {
    const list = searchHandle();
    setSorting(!event.sort);
    const sortedList = list.sort(
      (a: { [key: string]: any }, b: { [key: string]: any }) => {
        if (event.sort) {
          return a[event.dataIndex] < b[event.dataIndex] ? -1 : 1;
        } else {
          return a[event.dataIndex] > b[event.dataIndex] ? -1 : 1;
        }
      }
    );
    const indexLastLog = 1 * logsPerPage;
    const indexFirstLog = indexLastLog - logsPerPage;
    const currentLogs = sortedList.slice(indexFirstLog, indexLastLog);
    setSortedList(sortedList);
    setFinalList(currentLogs);
    setcurrentPage(1);
  };

  return (
    <div>
      <div className="mt-5 mb-[40px]">
        <Filters
          filter={filter}
          onChange={onChangeFilter}
          searchHandle={onSearch}
        />
      </div>
      {finalList.length > 0 && (
        <>
          <div>
            <Table
              columns={Columns}
              dataSource={finalList}
              hover
              toggleSort={onResorting}
              sorting={sorting}
            />
          </div>
          <div className="flex items-center justify-center m-10">
            {currentPage > 1 && (
              <MdNavigateNext
                className="text-primary-light-grey text-2xl cursor-pointer rotate-180"
                onClick={() =>
                  setcurrentPage((prev) => (prev >= 2 ? prev - 1 : prev))
                }
              />
            )}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={(pageNumber: number) => setcurrentPage(pageNumber)}
            />
            {currentPage < totalPages && (
              <MdNavigateNext
                className="text-primary-light-grey text-2xl cursor-pointer"
                onClick={() => setcurrentPage((prev) => prev + 1)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
