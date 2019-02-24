import React, { Component } from "react";
import { GlobalStyle } from "./theme/globalStyle";
import Header from "./component/Header/Header";
import Main from "./component/Main/Main";

import Footer from "./component/Footer/Footer";

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
        <Footer />
        <GlobalStyle />
      </React.Fragment>
    );
  }
}

export default App;
