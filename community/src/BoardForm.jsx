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

class BoardRow extends Component {
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
            to={{ pathname: "/boardDetail", query: { _id: this.props._id } }}
          >자세히 보기
          </NavLink>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: []
  };

  componentDidMount() {
    this.getBoardList();
  }

  getBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              title={item.title}
              writer={item.writer}
              createdAt={item.createdAt}
              content={item.content}
            ></BoardRow>
          ));
          this.setState({
            boardList: boardList
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="5">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList
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
                <th>본문 미리보기</th>
                <th>글로 이동</th>
              </tr>
            </thead>
            <tbody>{this.state.boardList}</tbody>
          </Table>
          <Link to="/boardWrite">
            <Button>글쓰기</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BoardForm;
