import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const  name = this.props.name;
    const background=this.props.background;
    const { copied } = this.state;
    const {classes}= this.props;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.colorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${copied && classes.overlayShow}`}
          />
          <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
            <h1>copied!</h1>
            <p>{this.props.background}</p>
          </div>
          <div className='copy-container'>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {
                this.props.showMore &&
                <Link to={`/palette/${this.props.paletteId}/${this.props.colorId}`} className={classes.seeMore} onClick={(evt)=>(evt.stopPropagation())}>More</Link>
          }
          </div>
      </CopyToClipboard>
    );
  }
}
export default withStyles(styles)(ColorBox);