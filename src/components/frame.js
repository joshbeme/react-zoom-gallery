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
      nest: false,
      anchors: [],
      nests: [],
      history: undefined,
      display: "block"
    };
    this.zoomClick = this.zoomClick.bind(this);
    this.zooming = this.zooming.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.nextImage = this.nextImage.bind(this);
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
    })
      .then(() => {
        console.log(this.state.display);
        this.setState({
          display: "none",
          history: {
            anchors: this.state.anchors,
            nests: this.state.nests
          }
        });
      })
      .then(() => {
        this.setState({
          anchors: undefined,
          nests: undefined
        });
      });
  }

  //animates image to the relative position and zooms using sleep for frames
  async zooming(e) {
    console.log(this.props.imageLinks[e._targetInst.return.key].nest);
    e.persist();
    try {
      await this.zoomClick(e);
      let imgX;
      let imgY;
      /* makes edge cases closer to edge*/
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
      /* end edge cases*/
      console.log(e._targetInst.return.key);
      for (let i = 0; i <= 25; i++) {
        let stuff = 100;
        this.setState({
          imgHW: `${stuff + i * 4}%`,
          imgX: `-${i * imgX}%`,
          imgY: `-${i * imgY}%`
        });

        await this.sleep(6);
      }
      await this.nextImage(e)
    } catch (error) {
      throw error;
    }
  }
  nextImage(e){
    return new Promise((resolve)=>{
this.setState({
nest: this.props.imageLinks[e._targetInst.return.key].nest
})
    })
  }

  //takes number of nested objects and creates anchors per object
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
    console.log(this.state.nest.length)
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
          top: this.state.imgY,
          left: this.state.imgX
        }}
      />
    );
 if(this.state.nest){
   img = undefined
 }

    return (
      <div className="mainFrame" style={{ height: "75%", width: "75%" }}>
        {this.state.anchors}
        {this.state.nest}

        {img}
      </div>
    );
  }
}

export default Frame;
