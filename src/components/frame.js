import React, { Component } from "react";
import AnchorNodes from "./AnchorNodes";
import { TiArrowBack } from "react-icons/ti";

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: props.imageLinks,
      nodes: undefined,
      nest: undefined,
      anchor: [],
      nests: [],
      history: undefined,
      display: "block",
      imgX: "0",
      imgY: "0",
      imgHW: "100%",
      back: undefined,
    };
    this.savePosition = this.savePosition.bind(this);
    this.zooming = this.zooming.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.back = this.back.bind(this);
    this.elementHandler = this.elementHandler.bind(this)
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
    e.persist();
    try {
      await this.savePosition(e);
      await this.zoomAction();
      await this.nextImage(e);
    } catch (error) {
      throw new Error();
    }
  }

  async zoomAction() {
    let imgX;
    let imgY;
    /* makes edge cases look better*/

    if (this.img.percentX <= 0.25) {
      imgX = 0;
    }
    if (this.img.percentY <= 0.25) {
      imgY = 0;
    }
    if (this.img.percentX >= 0.75) {
      imgX = 8;
    }
    if (this.img.percentY >= 0.75) {
      imgY = 8;
    }
    if (this.img.percentX > 0.25 && 0.75 > this.img.percentX) {
      imgX = this.img.percentX * 8;
    }
    if (this.img.percentY > 0.25 && 0.75 > this.img.percentY) {
      imgY = this.img.percentY * 8;
    }
    /* end edge cases*/

    for (let i = 0; i <= 25; i++) {
      const stuff = 100;
console.log(this.state.imgHW)
      this.setState({
        imgHW: `${stuff + i * 8}%`,
        imgX: `${-i * imgX}%`,
        imgY: `${-i * imgY}%`
      });
      await this.sleep(16);
    }
  }

  //finds position of relitive anchor then turns off display of anchor
  savePosition(e) {
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
          history: {
            anchor: this.state.anchor,
            nests: this.state.nests
          }
        });
      };
      resolve(percentCalculator());
    })
      .then(() => {
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
    const aa = (
      <a className="back"
      onClick={this.back}>
        <TiArrowBack className="arrow" style={{ width: "100%", height: "100%" }} />
      </a>
    )
    return new Promise(resolve => {
      this.setState({
        nest: this.props.imageLinks[e._targetInst.return.key].nest,
        back: aa,
      });
    });
  }
  
  back(){
this.setState({
  nest: undefined,
  imgHW: "100%",
  back: undefined
});
setTimeout(
this.setState(this.state.history), 500)
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
                  // display={this.display}
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

  elementHandler(){
    const heightWidth = this.state.imgHW;
    const img = (
      <img
        className="img"
        src={this.props.image}
        style={{
          width: heightWidth,
          height: heightWidth,
          left: this.state.imgX,
          top: this.state.imgY
         
        }}
      />
    );
    if (this.state.nest !== undefined) {
      // setTimeout(()=>{
 this.setState({
   img: undefined
 })
    //}, 500);
    }
    else if(this.state.nest == undefined){
      this.setState({
        img: img
      })
    }
  }

  componentDidMount(props) {
  this.elementHandler()

    this.conditionalRender(props);
 
  }
  componentWillUnmount() {}

  componentDidCatch(error) {
    console.error(error);
  }
  render(props) {
    const heightWidth = this.state.imgHW;
    const img = this.state.img ;
    // if (this.state.nest !== undefined) {
    //   // setTimeout(()=>{
    //     img = undefined;
    //   aa = (
    //     <a className="back"
    //     onClick={this.back}>
    //       <TiArrowBack className="arrow" style={{ width: "100%", height: "100%" }} />
    //     </a>
    //   )
    // //}, 500);
    // }
    // else if(this.state.nest == undefined){
    //   aa = null
    //   img = (
    //     <img
    //       className="img"
    //       src={this.props.image}
    //       style={{
    //         width: heightWidth,
    //         height: heightWidth,
    //         left: this.state.imgX,
    //         top: this.state.imgY
           
    //       }}
    //     />
    //   );
    // }

    return (
      <div className="mainFrame" style={{ width: "100%", height: "100%" }}>
        {this.state.anchor}
        {this.state.back}
        {this.state.nest}
      

  
        {img}
      </div>
    );
  }
}

export default Frame;
