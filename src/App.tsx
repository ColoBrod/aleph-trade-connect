// Libraries
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from "~/components/ui/Button";

class App extends Component {
  render() {
    return(
      <>
        <h1>App is up and running</h1>
        <Button />
      </>
    );
  }
};

export default App;