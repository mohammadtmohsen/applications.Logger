import { BiCollection } from "react-icons/bi";
import { BsArrowUpShort } from "react-icons/bs";
import React from "react";
export type AlignTypes = "right" | "left" | "center";
export type VeticalAlignTypes = "top" | "middle" | "bottom";
export type Column = {
  dataIndex: React.Key;
  render?: (p1: any, p2?: any) => any;
  align?: AlignTypes;
  veticalAlign?: VeticalAlignTypes;
  wrap?: string;
  title?: React.Key | React.ReactNode;
  className?: string;
  key?: React.Key;
};

type TableProps = {
  loading?: boolean;
  columns: Array<Column>;
  hover?: boolean;
  onClickRow?: (index: number, item: any) => void;
  dataSource: { [key: React.Key]: any }[];
  scroll?: boolean;
  toggleSort: any;
  sorting: boolean
};

export const Table: React.FC<TableProps> = React.memo(
  ({
    hover = false,
    columns,
    dataSource,
    onClickRow,
    scroll,
    toggleSort,
    sorting,
  }) => {
    const getAlignText = (align?: AlignTypes): string => {
      try {
        let textAlign = "";
        switch (align) {
          case "right":
            textAlign = "text-right";
            break;
          case "left":
            textAlign = "text-left";
            break;
          case "center":
            textAlign = "text-center";
            break;
        }
        return textAlign;
      } catch (error) {
        return "";
      }
    };
    const getVerticalAlignText = (align?: VeticalAlignTypes): string => {
      try {
        let verticalAlign = "";
        switch (align) {
          case "top":
            verticalAlign = "align-top";
            break;
          case "middle":
            verticalAlign = "align-middle";
            break;
          case "bottom":
            verticalAlign = "align-bottom";
            break;
        }
        return verticalAlign;
      } catch (error) {
        return "";
      }
    };

    return (
      <div className="">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div
                className={`overflow-hidden sm:rounded-lg ${
                  scroll ? "md:overflow-y-auto md:h-[165px]" : ""
                }`}
              >
                <table className="min-w-full divide-y divide-primary-light-grey divide-opacity-25">
                  <thead>
                    <tr>
                      {columns.map(
                        ({ title, align, veticalAlign, dataIndex }, index) => (
                          <th
                            scope="col"
                            key={index}
                            className={`${
                              index === 0 ? "pr-6 pl-2" : "px-6"
                            }  ${
                              getAlignText(align)
                                ? ` ${getAlignText(align)} `
                                : "text-left"
                            } ${
                              getVerticalAlignText(veticalAlign)
                                ? ` ${getVerticalAlignText(veticalAlign)} `
                                : "align-middle"
                            } py-3 font-medium`}
                          >
                            <div className="flex gap-2 items-center">
                              <span>{title}</span>
                              <span className="flex justify-center items-center w-4 h-4 rounded-md bg-primary-light-grey/20">
                                <BsArrowUpShort
                                  className={`text-primary-blue w-4 h-4 cursor-pointer ${sorting ? '': 'rotate-180'}`}
                                  onClick={() =>
                                    toggleSort({
                                      sort: sorting,
                                      dataIndex: dataIndex,
                                    })
                                  }
                                />
                              </span>
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-light-grey divide-opacity-25">
                    {!dataSource?.length ? (
                      <tr className="h-52 relative">
                        <td
                          colSpan={100}
                          className="flex gap-2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-lg"
                        >
                          <BiCollection className="w-6 h-6 text-primary-medium-grey" />{" "}
                          No Data
                        </td>
                      </tr>
                    ) : (
                      dataSource.map((item, index) => (
                        <tr
                          key={index}
                          className={`h-16 ${
                            hover ? " hover:bg-primary-light-grey/10 " : ""
                          } ${onClickRow ? "cursor-pointer" : ""}`}
                          onClick={() => {
                            if (onClickRow) {
                              onClickRow(index, item);
                            }
                          }}
                        >
                          {columns.map(
                            (
                              { dataIndex, render, align, veticalAlign },
                              colIndex
                            ) => {
                              return (
                                <td
                                  key={`${index}-${colIndex}`}
                                  className={`
                                ${colIndex === 0 ? "pr-6 pl-2" : "px-6"} 
                                  py-4 whitespace-nowrap   
                                  text-sm font-medium
                                  ${getAlignText(align)}
                                  ${
                                    getVerticalAlignText(veticalAlign)
                                      ? ` ${getVerticalAlignText(
                                          veticalAlign
                                        )} `
                                      : "align-middle"
                                  }
                                  `}
                                >
                                  {render
                                    ? render(item[dataIndex], item)
                                    : item[dataIndex]}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
