import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBooks, deleteBook, getBookInfo } from "../../store/bookSlice";

import BookInfo from "./BookInfo";
import BooksList from "./BooksList";

import "./book.css";

const BookContainer = () => {
  const { isLoading, books, bookInfo } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            deleteBook={deleteBook}
            dispatch={dispatch}
            getBookInfo={getBookInfo}
          />
        </div>
        <div className="col side-line">
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
    </Fragment>
  );
};

export default BookContainer;
