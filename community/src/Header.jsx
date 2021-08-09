import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    buttonDisplay: "none"
  };

  componentDidMount() {
    if ($.cookie("login_id")) {
      this.setState({
        buttonDisplay: "block"
      });
    } else {
      this.setState({
        buttonDisplay: "none"
      });
    }
  }

  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다.");
          window.location.href = "/";
        }
      });
  };
  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.buttonDisplay
    };

    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/"><strong>Community Service</strong></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NavLink to="/about">
              <Button style={buttonStyle} variant="primary">
                소개
              </Button>
            </NavLink>
            <NavLink to="/board">
              <Button style={buttonStyle} variant="primary">
                게시판
              </Button>
            </NavLink>
            <NavLink to="/gallery">
              <Button style={buttonStyle} variant="primary">
                갤러리
              </Button>
            </NavLink>
            <Button style={buttonStyle} onClick={this.logout} variant="primary">
              로그아웃
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
