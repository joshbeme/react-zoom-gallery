import React, { Component } from 'react';

class Frame extends Component {
    constructor(props){
        super(props);
        this.state={
            links: props.imageLinks
        }
    }
  render(props) {
    return (
      <div className="">
<img src={props.image}/>
      </div>
    );
  }
}

export default Frame;
