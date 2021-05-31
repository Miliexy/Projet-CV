import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/authRoute";
import EditRoute from "./util/editPost"

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Postusr from "./pages/Postusr";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Confirm from "./pages/Confirm";
import UploadTest from "./pages/UploadTest";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/confirm/:token" component={Confirm}/>
          <Route exact path="/postusr" component={Postusr}/>
          <Route exact path="/posts/:postId" component={SinglePost}/>
          <Route exact path="/test" component={UploadTest}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
