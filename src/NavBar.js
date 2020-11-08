import React from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import "rc-slider/assets/index.css";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/NavBarStyles";

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            format : "hex",
            open : false
        }
        this.changeFormat=this.changeFormat.bind(this);
        this.closeSnackbar=this.closeSnackbar.bind(this);
    }
    changeFormat(evt){
        this.setState({format:evt.target.value, open: true});
        this.props.changeFormat(evt.target.value);
    }
    closeSnackbar(){
        this.setState({open:false});
    }
    render(){
        let format=this.state.format;
        const {classes}=this.props;
        return(
            <header className={classes.NavBar}>
                <div className={classes.logo}>
                    <Link to="/">React Color Pallet</Link>
                </div>
                {
                    this.props.showSlider &&
                    <div>
                        <span>Level: {this.props.level}</span>
                        <Slider min={100} max={900} step={100} defaultValue={500} onChange={this.props.handleChanege} className={classes.slider}/>
                    </div>
                }
                <div className={classes.menu}>
                    <Select value={this.state.format} onChange={this.changeFormat}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <div>
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        message={
                            <span id='message-id'>
                                Format Changed To {format.toUpperCase()}
                            </span>
                        }
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        onClose={this.closeSnackbar}
                        action={[
                            <IconButton
                                onClick={this.closeSnackbar}
                                color='inherit'
                                key='close'
                                aria-label='close'
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </div>
            </header>
        )
    }
}
export default withStyles(styles)(NavBar);