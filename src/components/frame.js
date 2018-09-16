import React, { Component } from "react";
import AnchorNodes from "./AnchorNodes";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.imageLinks,
      nodes: undefined,
      imageW: undefined,
      imageH: undefined,
      imgHW: "100%",
      percentX: undefined,
      percentY: undefined,
      imgX: "0",
      imgY: "0",
      anchors: [],
      nests: [],
      history: undefined,
      display: "block"
    };
    this.zoomClick = this.zoomClick.bind(this);
    this.zooming = this.zooming.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  // used to timeout with a promise for animations
  sleep(ms) {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
  }
  //finds position of relitive anchor then turns off display of anchors
  zoomClick(e) {
    const tWidth = e.target.offsetWidth;
    const tHeight = e.target.offsetHeight;
    const targetRect = e.target.getBoundingClientRect();
    const targeterX = targetRect.x + tWidth;
    const targeterY = targetRect.y + tHeight;
    const Frame = document.querySelector(".mainFrame");
    const frameRect = Frame.getBoundingClientRect();
    const frameWidth = Frame.offsetWidth;
    const frameHeight = Frame.offsetHeight;
    const frameLeft = frameRect.x;
    const frameTop = frameRect.y;
    return new Promise(resolve => {
      const stuff = this.setState({
        percentX: (targeterX - frameLeft) / frameWidth,
        percentY: (targeterY - frameTop) / frameHeight
      });
      resolve(stuff);
    }).then(() => {
      console.log(this.state.display);
      this.setState({
        display: "none",
        history: {
          anchors: this.state.anchors,
          nests: this.state.nests
        }
      });
    }).then(()=>{
      this.setState({
        anchors: undefined,
        nests: undefined
      })
    });
  }

  //animates image to the relative position and zooms using sleep for frames
  async zooming(e) {
    console.log(e);
    e.persist();
    try {
      await this.zoomClick(e);
      let imgX;
      let imgY;
      // makes edge cases closer to edge
      if (this.state.percentX <= 0.25) {
        imgX = 0;
      }
      if (this.state.percentY <= 0.25) {
        imgY = 0;
      }
      if (this.state.percentX >= 0.75) {
        imgX = 4;
      }
      if (this.state.percentY >= 0.75) {
        imgY = 4;
      }
      if (this.state.percentX > 0.25 && 0.75 > this.state.percentX) {
        imgX = this.state.percentX * 4;
      }
      if (this.state.percentY > 0.25 && 0.75 > this.state.percentY) {
        imgY = this.state.percentY * 4;
      }

      console.log(e.target.value);
      for (let i = 0; i <= 25; i++) {
        let stuff = 100;
        this.setState({
          imgHW: `${stuff + i * 4}%`,
          imgX: `-${i * imgX}%`,
          imgY: `-${i * imgY}%`
        });

        await this.sleep(6);
      }
    } catch (error) {
      throw error;
    }
  }

  //takes number of nested objects and creates anchors for them
  conditionalRender(props) {
    const anchors = [];
    const nests = [];
    const pusher = props => {
      return new Promise((resolve, props) => {
        if (nests.length != this.props.imageLinks.length) {
          const loop = () => {
            for (let i = 0; i < this.props.imageLinks.length; i++) {
              anchors.push(
                <AnchorNodes
                  x={this.props.imageLinks[i].x}
                  y={this.props.imageLinks[i].y}
                  display={this.display}
                  click={e => this.zooming(e)}
                  key={i}
                />
              );
          
              nests.push(this.props.imageLinks[i].nest);
            }
          };
          resolve(loop());
        }
      });
    };
    pusher(props).then(() => {
      console.log(anchors);
      console.log(nests);
      this.setState({
        anchors: anchors,
        nests: nests
      });
    });
  }

  componentDidMount(props) {
    // this.conditionalRender()
    this.conditionalRender(props);
    
  }
  componentWillUnmount() {}

  componentDidCatch(error) {
    console.error(error);
  }
  render(props) {
    const heightWidth = this.state.imgHW;
    
    return (
      <div className="mainFrame" style={{ height: "50%", width: "50%" }}>
        {this.state.anchors}
        {/* <a
          className="a"
          onClick={e => this.zooming(e)}
          style={{ top: "50%", left: "50%", display: this.state.display }}
        /> */}

        <img
          className="img"
          src={this.props.image}
          style={{
            width: heightWidth,
            height: heightWidth,
            top: this.state.imgY,
            left: this.state.imgX
          }}
        />
      </div>
    );
  }
}

export default Frame;
