import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class GalleryDetail extends Component {
  state = {
    gallery: []
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.getDetail();
    } else {
      window.location.href = "/";
    }
  }

  deleteGallery = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/gallery/delete", send_param)
        // 정상 수행
        .then(returnData => {
          alert("사진이 삭제되었습니다.");
          window.location.href = "/#/gallery";
        })
        // 에러
        .catch(err => {
          console.log(err);
          alert("사진 삭제 실패");
        });
    }
  };

  getDetail = () => {
    const send_param = {
      headers,
      _id: this.props.location.query._id
    };
    const marginBottom = {
      marginBottom: 5
    };
    axios
      .post("http://localhost:8080/gallery/detail", send_param)
      // 정상 수행
      .then(returnData => {
        if (returnData.data.gallery[0]) {
          const gallery = (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.gallery[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.gallery[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/galleryWrite",
                    query: {
                      title: returnData.data.gallery[0].title,
                      content: returnData.data.gallery[0].content,
                      _id: this.props.location.query._id
                    }
                  }}
                >
                  <Button block style={marginBottom}>
                    사진 수정
                  </Button>
                </NavLink>
                <Button
                  block
                  onClick={this.deleteGallery.bind(
                    null,
                    this.props.location.query._id
                  )}
                >
                  사진 삭제
                </Button>
              </div>
            </div>
          );
          this.setState({
            gallery: gallery
          });
        } else {
          alert("사진 상세 조회 실패");
        }
      })
      // 에러
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{this.state.gallery}</div>;
  }
}

export default GalleryDetail;
