import React, { Component } from "react";
import About from "./About";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import GalleryForm from "./GalleryForm";
import GalleryWriteForm from "./GalleryWriteForm";
import GalleryDetail from "./GalleryDetail";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends Component {
  render() {
    let resultForm;
    function getResultForm() {
      if (!($.cookie("login_id"))) {
        resultForm = <Route exact path="/" component={LoginForm}></Route>;
        return resultForm;
      }
    }
    getResultForm();
    return (
      <div>
        <Route path="/about" component={About}></Route>
        <Route path="/board" component={BoardForm}></Route>
        <Route path="/boardWrite" component={BoardWriteForm}></Route>
        <Route path="/boardDetail" component={BoardDetail}></Route>
        <Route path="/gallery" component={GalleryForm}></Route>
        <Route path="/galleryWrite" component={GalleryWriteForm}></Route>
        <Route path="/galleryDetail" component={GalleryDetail}></Route>
        {resultForm}
      </div>
    );
  }
}

export default Body;
