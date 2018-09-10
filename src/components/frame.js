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
      anchorPosittionY: undefined,
      imgHW: '100%',
      percentX: undefined,
      percentY: undefined,
    };
    this.generateImgAnchors = this.generateImgAnchors.bind(this);
    this.zoomClick = this.zoomClick.bind(this);
    this.zooming = this.zooming.bind(this);
  }

// used to timeout with a promise for animations
  sleep(ms) {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
  }
//finds center position of image
  generateImgAnchors = () => {
    this.setState({
      anchorH: document.querySelector(".img").offsetHeight / 2,
      anchorW: document.querySelector(".img").offsetWidth / 2
    });
  };
  

  zoomClick(e){
    e.preventDefault();
    const targetRect = e.target.getBoundingClientRect();
    const targeterX = targetRect.x;
    const targeterY = targetRect.Y;
    const Frame = document.querySelector('.mainFrame');
    const frameWidth = Frame.offsetWidth
    const frameHeight = Frame.offsetHeight
    return new Promise(resolve =>
   { const stuff = this.setState({
      anchorPosittionX: targeterX,
      anchorPosittionY: targeterY
    }); 
    resolve(stuff)
  }).then(()=> console.log(this.state.anchorPosittionX))
  }
  async zooming(){
    console.log("zoom")
    for (let i=0; i<25; i++){
      let stuff = 100
      this.setState({
        imgHW: `${stuff + (i * 4)}%`
      });
      await this.sleep(16)
    }
  }

  componentDidMount() {
    this.generateImgAnchors();
    console.log(document.querySelector('.mainFrame').getBoundingClientRect().x)
  }
  componentWillUnmount() {}

  render(props) {
    const heightWidth = this.state.imgHW;

    
    return (
      <div className="mainFrame" style={{height: "700px", width:"1000px", backgroundColor: "#000000", left:"15%", top:"15%" }}>
        <a
          className="a"
          onClick={()=>this.zooming()}
          style={{ top: "50%", left: "50%" }}
        />
        <a
          className="a"
          onClick={()=>this.zooming()}
          style={{ top: "10%", left: "10%" }}
        />
        <a
          className="a"
          onClick={()=>this.zooming()}
          style={{ top: "10%", left: "70%" }}
        />
        <img
          className="img"
          src={this.props.image}
          style={{ width: heightWidth, height: heightWidth, top: "", left:"" }}
        />
      </div>
    );
  }
}

export default Frame;
