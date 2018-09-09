import React, { Component } from "react";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.imageLinks,
      nodes: undefined,
      imageW: undefined,
      imageH: undefined,
      anchorPosittionX: undefined,
      anchorPosittionY: undefined
    };
    this.generateAnchors = this.generateAnchors.bind(this);
    this.zoomClick = this.zoomClick.bind(this)
  }

  links(props) {}
  sleep(ms) {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
  }

  generateAnchors = () => {
    this.setState({
      anchorH: document.querySelector(".img").height / 2,
      anchorW: document.querySelector(".img").width / 2
    });
  };

  zoomClick(e){
    e.preventDefault();
    const targeter = e.target.getBoundingClientRect()
    return new Promise(resolve =>
   { const stuff = this.setState({
      anchorPosittionX: targeter.x
    }); 
    resolve(stuff)
  }).then(()=> console.log(this.state.anchorPosittionX))
  }


  componentDidMount() {
    this.generateAnchors();
    console.log(document.querySelector('.mainFrame').getBoundingClientRect().x)
  }
  componentWillUnmount() {}

  render(props) {
    const heightWidth = "100%";

    
    return (
      <div className="mainFrame" style={{ backgroundColor: "#000000" }}>
        <a
          className="a"
          onClick={e => {this.zoomClick(e)}}
          style={{ top: "50%", left: "50%" }}
        />
        <a
          className="a"
          onClick={e => {this.zoomClick(e)}}
          style={{ top: "40%", left: "60%" }}
        />
        <a
          className="a"
          onClick={e => { this.zoomClick(e)
          }}
          style={{ top: "10%", left: "70%" }}
        />
        <img
          className="img"
          src={this.props.image}
          style={{ width: heightWidth, height: heightWidth }}
        />
      </div>
    );
  }
}

export default Frame;
