import React, { Component } from "react";
import CKEditor from "ckeditor4-react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class GalleryWriteForm extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.galleryTitle.value = this.props.location.query.title;
    }
  }

  componentWillMount(){
    if (this.props.location.query !== undefined) {
      this.setState({
        data: this.props.location.query.content
      });
    }
  }

  writeGallery = () => {
    let url;
    let send_param;

    const galleryTitle = this.galleryTitle.value;
    const galleryContent = this.state.data;

    if (galleryTitle === undefined || galleryTitle === "") {
      alert("사진 제목을 입력해 주세요.");
      galleryTitle.focus();
      return;
    } else if (galleryContent === undefined || galleryContent === "") {
      alert("사진을 첨부해 주세요.");
      galleryContent.focus();
    }
    
    if (this.props.location.query !== undefined) {
      url = "http://localhost:8080/gallery/update";
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        "title": galleryTitle,
        "content": galleryContent
      };
    } else {
      url = "http://localhost:8080/gallery/write";
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),
        "title": galleryTitle,
        "content": galleryContent
      };

    }

    axios
      .post(url, send_param)
      // 정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.href = "/#/gallery";
        } else {
          alert("사진 업로드 실패");
        }
      })
      // 에러
      .catch(err => {
        console.log(err);
      });
  };

  onEditorChange = evt => {
    this.setState({
      data: evt.editor.getData()
    });
  };

  render() {
    const divStyle = {
      margin: 50
    };
    const titleStyle = {
      marginBottom: 5
    };
    const buttonStyle = {
      marginTop: 5
    };

    return (
      <div style={divStyle} className="App">
        <h2>사진 업로드</h2>
        <Form.Control
          type="text"
          style={titleStyle}
          placeholder="사진 제목"
          ref={ref => (this.galleryTitle = ref)}
        />
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange}
        ></CKEditor>
        <Button style={buttonStyle} onClick={this.writeGallery} block>
          저장하기
        </Button>
      </div>
    );
  }
}

export default GalleryWriteForm;
