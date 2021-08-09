import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import ReactHtmlParser from "react-html-parser";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class GalleryRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <div>{this.props.title}</div>
        </td>
        <td>
          <div>{this.props.writer.substring(0, 24)}</div>
        </td>
        <td>
          <div>{this.props.createdAt.substring(0, 10)}</div>
        </td>
        <td>
          <div>{ReactHtmlParser(this.props.content)}</div>
        </td>
        <td>
          <NavLink
            to={{ pathname: "/galleryDetail", query: { _id: this.props._id } }}
          >자세히 보기
          </NavLink>
        </td>
      </tr>
    );
  }
}

class GalleryForm extends Component {
  state = {
    galleryList: []
  };

  componentDidMount() {
    this.getGalleryList();
  }

  getGalleryList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/gallery/getGalleryList", send_param)
      .then(returnData => {
        let galleryList;
        if (returnData.data.list.length > 0) {
          const galleries = returnData.data.list;
          galleryList = galleries.map(item => (
            <GalleryRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              title={item.title}
              writer={item.writer}
              createdAt={item.createdAt}
              content={item.content}
            ></GalleryRow>
          ));
          this.setState({
            galleryList: galleryList
          });
        } else {
          galleryList = (
            <tr>
              <td colSpan="5">업로드한 사진이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            galleryList: galleryList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 50
    };

    return (
      <div>
        <div style={divStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>사진 미리보기</th>
                <th>사진으로 이동</th>
              </tr>
            </thead>
            <tbody>{this.state.galleryList}</tbody>
          </Table>
          <Link to="/galleryWrite">
            <Button>사진 업로드</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default GalleryForm;
