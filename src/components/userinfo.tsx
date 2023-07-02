import React from 'react';
import {useState, useEffect,} from 'react';

export default class UserInfo extends React.Component{
  render() {
    
    return (
      <div className="profile">
<img className = "profileImg" src="https://img.icons8.com/color/48/000000/github.png" />
<div className = "profileInfo">
  <h2 className = "profileName">Austin Pizano</h2>
  <h6 className = "profileLocation">Nashville, TN</h6>
  <h3 className = "profileTitle">Jr. Web Developer</h3>
    </div>
</div>
    );
  }
}