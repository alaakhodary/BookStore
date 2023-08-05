import React, { Fragment } from "react";

const BookInfo = ({ bookInfo }) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      {bookInfo === null ? (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      ) : (
        <div>
          <p className="fw-bold">Title: {bookInfo?.title}</p>
          <p className="fw-bold">Inserted By: {bookInfo?.userName}</p>
          <p className="fw-light">Description: {bookInfo?.discription}</p>
          <p className="fst-italic">Price: {bookInfo?.price}</p>
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
