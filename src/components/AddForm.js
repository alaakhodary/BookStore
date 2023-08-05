import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { insertBook } from "../store/bookSlice";

const AddForm = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(insertBook({ title, price, discription }));

    setTitle("");
    setPrice("");
    setDiscription("");
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={handleChange(setTitle)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={price}
              onChange={handleChange(setPrice)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              rows="3"
              required
              value={discription}
              onChange={handleChange(setDiscription)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
