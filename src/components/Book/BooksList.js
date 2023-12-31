import React from "react";

const BooksList = ({
  isLoading,
  books,
  isLoggedIn,
  deleteBook,
  dispatch,
  getBookInfo,
}) => {
  const bookList =
    books.length > 0
      ? books?.map((item) => (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={item.id}
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => dispatch(getBookInfo(item))}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
                onClick={() => dispatch(deleteBook(item))}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success"
                disabled={!isLoggedIn}
              >
                Update
              </button>
            </div>
          </li>
        ))
      : "there is no book available";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
