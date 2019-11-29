import React from "react";
import ReactPaginate from "react-paginate";
import T from "prop-types";

import style from "./style.module.css";

const Paginator = ({ pageCount, handlePageClick }) => (
  <div className={style.reactPaginate}>
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName={style.breakMe}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={style.pagination}
      subContainerClassName={`${style.pages} ${style.pagination}`}
      activeClassName={style.active}
    />
  </div>
);

Paginator.propTypes = {
  pageCount: T.number.isRequired,
  handlePageClick: T.func.isRequired
};

export default Paginator;
