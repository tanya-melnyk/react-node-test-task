import React from "react";
import ReactPaginate from "react-paginate";
import T from "prop-types";

const Paginator = ({ pageCount, handlePageClick }) => (
  <div className="reactPaginate">
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakClassName="breakMe"
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  </div>
);

Paginator.propTypes = {
  pageCount: T.number.isRequired,
  handlePageClick: T.func.isRequired
};

export default Paginator;
