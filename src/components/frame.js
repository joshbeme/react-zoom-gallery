import React, { Component } from "react";
import AnchorNodes from "./AnchorNodes";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.imageLinks,
      nodes: undefined,
      percentX: undefined,
      percentY: undefined,
      nest: false,
      anchor: [],
      nests: [],
      history: undefined,
      display: "block",
      imgX: "0",
      imgY: "0",
      imgHW: "100%"
    };
    this.savePosition = this.savePosition.bind(this);
    this.zooming = this.zooming.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  anchors = {
    originX: undefined,
    originY: undefined,
    relativeWidth: undefined,
    relativeHeight: undefined,
    endX: undefined,
    endY: undefined
  };
  img = {
    W: undefined,
    H: undefined,
    HW: "100%",
    X: "0",
    Y: "0",
    percentX: undefined,
    percentY: undefined
  };
  // A promise that times out for await
  sleep(ms) {
    return new Promise(resolve => {
      return setTimeout(resolve, ms);
    });
  }

  //animates image to the relative position and zooms using sleep for frames
  async zooming(e) {
    console.log(this.props.imageLinks[e._targetInst.return.key].nest);
    e.persist();
    try {
      await this.savePosition(e);
      await this.zoomAction();
      console.log(e._targetInst.return.key);
      await this.sleep(100);
      await this.nextImage(e);
    } catch (error) {
      throw new Error();
    }
  }

  async zoomAction() {
    let imgX;
    let imgY;
    /* makes edge cases look better*/
    console.log(this.img.percentX, this.img.percentY);
    if (this.img.percentX <= 0.25) {
      imgX = 0;
    }
    if (this.img.percentY <= 0.25) {
      imgY = 0;
    }
    if (this.img.percentX >= 0.75) {
      imgX = 4;
    }
    if (this.img.percentY >= 0.75) {
      imgY = 4;
    }
    if (this.img.percentX > 0.25 && 0.75 > this.img.percentX) {
      imgX = this.img.percentX * 4;
    }
    if (this.img.percentY > 0.25 && 0.75 > this.img.percentY) {
      imgY = this.img.percentY * 4;
    }
    /* end edge cases*/

    for (let i = 0; i <= 25; i++) {
      const stuff = 100;
      // if(i<5){
      //   this.img.percentY < .51 ? imgY -= .15 : imgY += .15;
      //   this.img.percentX < .51 ? imgX -= .15 : imgX += .15;

      // }
      // else if(i<10){
      //   this.img.percentY < .51 ? imgY -= .05 : imgY += .05;
      //   this.img.percentX < .51 ? imgX -= .05 : imgX += .05;
      // }

      this.setState({
        imgHW: `${stuff + i * 4}%`,
        imgX: `${-i * imgX}%`,
        imgY: `${-i * imgY}%`
      });
      await this.sleep(16);
    }
  }

  //finds position of relitive anchor then turns off display of anchor
  savePosition(e) {
    console.log(this.anchors.originX);
    const tWidth = e.target.offsetWidth;
    const tHeight = e.target.offsetHeight;
    const targetRect = e.target.getBoundingClientRect();
    const targeterX = targetRect.x + tWidth;
    const targeterY = targetRect.y + tHeight;
    const frame = document.querySelector(".mainFrame");
    const frameRect = frame.getBoundingClientRect();
    const frameObj = {
      width: frame.offsetWidth,
      height: frame.offsetHeight,
      left: frameRect.x,
      top: frameRect.y
    };
    return new Promise(resolve => {
      const percentCalculator = () => {
        this.setState({
          display: "none",
          history: {
            anchor: this.state.anchor,
            nests: this.state.nests
          }
        });
      };
      resolve(percentCalculator);
    })
      .then(() => {
        console.log(this.state.display);
        this.img.percentX = (targeterX - frameObj.left) / frameObj.width;
        this.img.percentY = (targeterY - frameObj.top) / frameObj.height;
      })
      .then(() => {
        this.setState({
          anchor: undefined,
          nests: undefined
        });
      });
  }

  nextImage(e) {
    return new Promise(resolve => {
      this.setState({
        nest: this.props.imageLinks[e._targetInst.return.key].nest
      });
    });
  }

  //takes number of nested objects and creates anchor per object
  conditionalRender(props) {
    const anchor = [];
    const nests = [];
    const frame = document.querySelector(".mainFrame");
    const frameRect = frame.getBoundingClientRect();
    const frameObj = {
      width: frame.offsetWidth,
      height: frame.offsetHeight,
      left: frameRect.x,
      top: frameRect.y
    };
    this.anchors.originX = frameObj.left;
    this.anchors.originY = frameObj.top;
    this.anchors.endX = frameObj.left + frameObj.width;
    this.anchors.endY = frameObj.top + frameObj.height;
    const pusher = props => {
      return new Promise(resolve => {
        if (nests.length !== this.props.imageLinks.length) {
          const loop = () => {
            for (let i = 0; i < this.props.imageLinks.length; i++) {
              anchor.push(
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
      this.setState({
        anchor: anchor,
        nests: nests
      });
    });
  }

  componentDidMount(props) {
    // this.conditionalRender()
    this.conditionalRender(props);
    console.log(this.state.nest.length);
  }
  componentWillUnmount() {}

  componentDidCatch(error) {
    console.error(error);
  }
  render(props) {
    const heightWidth = this.state.imgHW;
    let img = (
      <img
        className="img"
        src={this.props.image}
        style={{
          width: heightWidth,
          height: heightWidth,
          left: this.state.imgX,
          top: this.state.imgY,
          //  transform: `translateY(${this.state.imgY})`
        }}
      />
    );
    if (this.state.nest) {
      img = undefined;
    }

    return (
      <div className="mainFrame" style={{width: "", height: "500px"}}>
        {this.state.anchor}
        {this.state.nest}

        {img}
      </div>
    );
  }
}

export default Frame;
