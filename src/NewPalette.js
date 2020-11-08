import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import NewPaletteNavBar from "./NewPaletteNavBar";
import MovableColorList from "./MovableColorList";
import { arrayMove } from "react-sortable-hoc";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteStyles";
import seedColors from "./seedColors";

class NewPalette extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open: false,
            colors : seedColors[0].colors
        };
        this.handleDrawerClose=this.handleDrawerClose.bind(this);
        this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.removeColor=this.removeColor.bind(this);
        this.clearPalette=this.clearPalette.bind(this);
        this.handlePaletteNameSubmit=this.handlePaletteNameSubmit.bind(this);
        this.addRandomColor=this.addRandomColor.bind(this);
    }
    handleDrawerOpen(){
        this.setState({ open: true });
    };
    handleDrawerClose(){
        this.setState({ open: false });
    };
    handleSubmit(newColor){
        this.setState({ colors : [...this.state.colors, newColor]});
    }
    handlePaletteNameSubmit(newName){
        let paletteName=newName.name;
        let id = paletteName.toLowerCase().replace(" ","-");
        let emoji=newName.emoji;
        let newPalette={paletteName : paletteName, id : id, emoji : emoji, colors : this.state.colors};
        this.props.addPalette(newPalette);
        this.props.routeProps.history.push("/");
    }
    removeColor(colorName) {
        this.setState({
          colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }
    clearPalette(){
        this.setState({colors : []});
    }
    flattenColors(seedColors){
        let flatColors=[]
        let len=seedColors.length;
        for(let i=0;i<len;i++){
            let colorsLen=seedColors[i].colors.length;
            for(let j=0;j<colorsLen;j++){
                flatColors.push(seedColors[i].colors[j]);
            }
        }
        return flatColors;
    }
    getRandomColor(){
        let flatColors=this.flattenColors(this.props.seedColors);
        var len = flatColors.length;
        let newPaletteLen = this.state.colors.length;
        while(true){
            let randomColor = Math.floor(Math.random()*len);
            if(newPaletteLen===0 || this.state.colors.every(({ color }) => color !== flatColors[randomColor].color)){
                return flatColors[randomColor];
            }
        }
    }
    addRandomColor(){
        let newColor=this.getRandomColor();
        if(newColor){
            this.setState({colors : [...this.state.colors, newColor]});
        }
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
          colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
          <div className={classes.root}>
            <NewPaletteNavBar classes={classes}
                open={open}
                handleDrawerOpen={this.handleDrawerOpen}
                handlePaletteNameSubmit={this.handlePaletteNameSubmit}
                seedColors={this.props.seedColors}
            />
            <Drawer
              className={classes.drawer}
              variant='persistent'
              anchor='left'
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <div className={classes.container}>
                <Typography variant='h4' gutterBottom>
                  Design Your Palette
                </Typography>
                <div className={classes.buttons}>
                  <Button variant="contained"  color="primary" onClick={this.clearPalette} className={classes.button}>
                    Clear Palette
                  </Button>
                  <Button variant="contained"  
                    color="secondary" 
                    onClick={this.addRandomColor}
                    disabled={this.state.colors.length>=20}
                    className={classes.button}>
                      Random Color
                  </Button>
                </div>
                <ColorPickerForm 
                  paletteIsFull={this.state.colors.length>=20}
                  colors={this.state.colors}
                  handleSubmit={this.handleSubmit}
                />
              </div>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
              <div className={classes.boxContainer}>
                <MovableColorList
                  colors={this.state.colors}
                  removeColor={this.removeColor}
                  axis='xy'
                  onSortEnd={this.onSortEnd}
                  distance="20"
                />
              </div>
            </main>
          </div>
        );
    }
}
export default withStyles(styles,{ withTheme: true })(NewPalette);