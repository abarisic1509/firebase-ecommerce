import React, { useState } from "react";

import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  //limit page numbers shown
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  //select particular page (paginate)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //go to next page
  const paginateNext = () => {
    setCurrentPage((prev) => prev + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit((prev) => prev + pageNumberLimit);
      setMinPageNumberLimit((prev) => prev + pageNumberLimit);
    }
  };

  //go to prev page
  const paginatePrev = () => {
    setCurrentPage((prev) => prev - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit((prev) => prev - pageNumberLimit);
      setMinPageNumberLimit((prev) => prev - pageNumberLimit);
    }
  };

  return (
    <div className={styles.pagination}>
      <ul>
        <li
          className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ""}
        >
          <button onClick={() => paginatePrev()}>Prev</button>
        </li>
        {pageNumbers.map((num, i) => {
          if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
            return (
              <li
                key={i}
                className={currentPage === num ? `${styles.active}` : ""}
              >
                <button onClick={() => paginate(num)}>{num}</button>
              </li>
            );
          }
        })}
        <li
          className={
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? `${styles.hidden}`
              : ""
          }
        >
          <button onClick={() => paginateNext()}>Next</button>
        </li>
      </ul>
      <p>
        <b style={{ color: "orangered" }}>{`Page ${currentPage} `}</b>
        of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
