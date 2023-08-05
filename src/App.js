import { Fragment } from "react";

import "./App.css";

import Header from "./components/Header";
import Container from "./components/Container";
import AddForm from "./components/AddForm";
import BookContainer from "./components/Book/BookContainer";

function App() {
  return (
    <Fragment>
      <Header />
      <Container>
        <AddForm />
        <BookContainer />
      </Container>
    </Fragment>
  );
}

export default App;
