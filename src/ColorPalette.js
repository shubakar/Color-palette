import React from "react";
import ColorBox from "./colorBox";
import NavBar from "./NavBar";
import getShades from "./Getshades";
import PaletteFooter from "./PaletteFooter";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/ColorPaletteStyles";

class ColorPalette extends React.Component{
    constructor(props){
        super(props);
        this.state={
            level : 500,
            format : "hex"
        }
        this.handleChanege=this.handleChanege.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }
    handleChanege(value){
        this.setState({level:value});
    }
    changeFormat(format){
        this.setState({format : format});
    }
    render(){
        const {classes}=this.props;
        let colorShades=getShades(this.props.colors);
        let level=this.state.level;
        let format=this.state.format;
        let palette=colorShades.colors[level].map((curValue)=>(<ColorBox  name={curValue.name} background={curValue[`${format}`]} key={curValue.name} paletteId={colorShades.id} colorId={curValue.name.split(" ")[0]} showMore={true}/>))
        return(
            <div className={classes.palette}>
                <NavBar handleChanege={this.handleChanege} changeFormat={this.changeFormat} level={level} showSlider={true}/>
                <div className={classes.paletteColors}>
                    {palette}
                </div>
                <PaletteFooter name={this.props.colors.paletteName} emoji={this.props.colors.emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPalette);