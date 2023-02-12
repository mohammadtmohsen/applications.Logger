import React from "react";
type PaginationPropsType = {
  totalPages: number;
  paginate: any;
  currentPage: number;
};
export const Pagination: React.FC<PaginationPropsType> = ({
  totalPages,
  currentPage,
  paginate,
}) => {
  const pageNumbers: any[] = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex gap-2 items-center text-primary-light-grey">
        {currentPage > 5 && (
          <li>
            <a
              className={`${
                currentPage === 1 ? "bg-gray-200 text-black font-bold " : ""
              } rounded-md text-center py-2 px-3`}
              onClick={() => paginate(1)}
              href="!#"
            >
              {1}
            </a>
          </li>
        )}
        {currentPage > 6 && <span>...</span>}
        {pageNumbers.map((number, index) => (
          <>
            {number > currentPage - 5 && number < currentPage + 5 && (
              <li key={index}>
                <a
                  className={`${
                    currentPage === number
                      ? "bg-gray-200 text-black font-bold "
                      : ""
                  } rounded-md text-center py-2 px-3`}
                  onClick={() => paginate(number)}
                  href="!#"
                >
                  {number}
                </a>
              </li>
            )}
          </>
        ))}
        {!(currentPage > pageNumbers.length - 6) && <span>...</span>}
        {!(currentPage > pageNumbers.length - 5) && (
          <li>
            <a
              className={`${
                currentPage === pageNumbers.length
                  ? "bg-gray-200 text-black font-bold "
                  : ""
              } rounded-md text-center py-2 px-3`}
              onClick={() => paginate(pageNumbers.length)}
              href="!#"
            >
              {pageNumbers.length}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
