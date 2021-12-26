import React from 'react';

const divStyle = {
  margin: 50
};

const About = () => {
  return (
    <div style={divStyle}>
      <h1>
        <strong>소개</strong>
      </h1>
      <br></br>
      <p>20180763 백지연</p>
      <p>웹프로그래밍설계및실습 커뮤니티 서비스 과제입니다.</p>
      <div>1. 기본 기능 구성</div>
      <ul>
        <li>사용자 등록, 로그인, 로그아웃 (/)</li>
        <li>소개 페이지 (/about)</li>
        <li>게시판 (/board)</li>
        <li>갤러리 (/gallery)</li>
      </ul>
      <div>2. 개발 환경</div>
      <ul>
        <li>Front-end : React</li>
        <li>Back-end : Node.js</li>
        <li>Database : MongoDB</li>
      </ul>
    </div>
  );
};

export default About;