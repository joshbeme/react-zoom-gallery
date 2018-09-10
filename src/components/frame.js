import React, { Component } from "react";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.imageLinks,
      nodes: undefined,
      imageW: undefined,
      imageH: undefined,
      imgHW: '100%',
      percentX: undefined,
      percentY: undefined,
      imgX: undefined,
      imgY: undefined
    };
    this.zoomClick = this.zoomClick.bind(this);
    this.zooming = this.zooming.bind(this);
  }

// used to timeout with a promise for animations
  sleep(ms) {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
  }

  zoomClick(e){
    const tWidth = e.target.offsetWidth;
    const tHeight = e.target.offsetHeight;
    const targetRect = e.target.getBoundingClientRect();
    const targeterX = targetRect.x + tWidth;
    const targeterY = targetRect.y + tHeight;
    const Frame = document.querySelector('.mainFrame');
    const frameRect = Frame.getBoundingClientRect();
    const frameWidth = Frame.offsetWidth;
    const frameHeight = Frame.offsetHeight;
    const frameLeft = frameRect.x;
    const frameRight = frameRect.x + frameWidth;
    const frameTop = frameRect.y;
    const frameBot = frameRect.y + frameHeight;
    return new Promise(resolve =>
   { const stuff = this.setState({
      percentX: (targeterX - frameLeft ) / frameWidth,
      percentY: (targeterY - frameTop)/frameHeight,
    }); 
    resolve(stuff)
  }).then(()=> console.log(this.state.percentY))
  }
  async zooming(e){
    e.persist(); 
    await this.zoomClick(e);
    let imgX = this.state.percentX * 4;
    let imgY = this.state.percentY * 4;

    console.log("zoom")
    for (let i=0; i<=25; i++){
      let stuff = 100
      this.setState({
        imgHW: `${stuff + (i * 4)}%`,
        imgX: `-${i * imgX}%`,
        imgY: `-${i * imgY}%`
      });
      
      await this.sleep(8);
    }
   
  }

  componentDidMount() {
    console.log(document.querySelector('.mainFrame').getBoundingClientRect().x)
  }
  componentWillUnmount() {}

  render(props) {
    const heightWidth = this.state.imgHW;

    
    return (
      <div className="mainFrame" style={{height: "700px", width:"1000px", backgroundColor: "#000000", left:"15%", top:"15%" }}>
        <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "50%", left: "50%" }}
        />
        <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "10%", left: "10%" }}
        />
        <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "10%", left: "70%" }}
        />
                <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "62%", left: "70%" }}
        />
                <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "75%", left: "30%" }}
        />
                        <a
          className="a"
          onClick={(e)=>this.zooming(e)}
          style={{ top: "100%", left: "100%" }}
        />
        <img
          className="img"
          src={this.props.image}
          style={{ width: heightWidth, height: heightWidth, top: this.state.imgY, left:this.state.imgX }}
        />
      </div>
    );
  }
}

export default Frame;
