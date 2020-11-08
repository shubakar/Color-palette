import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import {Link} from "react-router-dom";
import classNames from "classnames";
import NewPaletteDialogBox from "./NewPaletteDialogBox";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NewPaletteNavBarStyles";
class NewPaletteNavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
          showSavePaletteDialogBox : false,
          showEmojiDialogBox : false            
        }
        this.handleSavePaletteDialogBox=this.handleSavePaletteDialogBox.bind(this);
    }
    handleSavePaletteDialogBox(){
      this.setState({showSavePaletteDialogBox: !this.state.showSavePaletteDialogBox});
    }
    render(){
        const {classes, open}=this.props;
        return(
          <div className={classes.root}>
            <CssBaseline />
              <AppBar
                position='fixed'
                color = "default"
                className={classNames(classes.appBar, {
                  [classes.appBarShift]: open
                })}
              >
                <Toolbar disableGutters={!open}>
                  <IconButton
                    color='inherit'
                    aria-label='Open drawer'
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                  >
                    <LibraryAddIcon />
                  </IconButton>
                  <Typography variant='h6' color='inherit' noWrap>
                    Create New Palette
                  </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                  <Link  to="/" className={classes.button}>
                    <Button variant="contained"  color="secondary">
                      Go Back
                    </Button>
                  </Link>
                  <Button variant="contained"   color="primary" onClick={this.handleSavePaletteDialogBox}>
                    Save Palette
                  </Button>
                </div>
              </AppBar>
                {
                  (this.state.showSavePaletteDialogBox && 
                    <NewPaletteDialogBox
                      handlePaletteNameSubmit={this.props.handlePaletteNameSubmit}
                      handleSavePaletteDialogBox={this.handleSavePaletteDialogBox}
                      seedColors={this.props.seedColors}
                    />
                  )
                }
          </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteNavBar);
