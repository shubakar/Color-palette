import React from "react";
import chroma from "chroma-js";
import ColorBox from "./colorBox";
import NavBar from "./NavBar";
import {withStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/SingleColorPaletteStyles";


class SingleColorPalette extends React.Component{
    constructor(props){
        super(props);
        this.state={
            formate : "hex"
        }
        this.getShades=this.getShades.bind(this);
        this.generateShades=this.generateShades.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }
    changeFormat(format){
        this.setState({formate : format});
    }
    generateShades(color){
        return chroma.scale([chroma(color).brighten(3),chroma(color).darker(1)]).colors(9);
    }
    getShades(seedColors, paletteId, colorId){
        let len=seedColors.length;
        let newColors=[];
        for(let i=0;i<len;i++){
            if(seedColors[i].id===paletteId){
                let colorlen=seedColors[i].colors.length;
                for(let k=0;k<colorlen;k++){
                    if(seedColors[i].colors[k].name===colorId){
                        let name=colorId;
                        let paletteName = seedColors[i].paletteName;
                        let emoji = seedColors[i].emoji;
                        let shades=[100,200,300,400,500,600,700,800,900];
                        let temp=this.generateShades(seedColors[i].colors[k].color);
                        for(let j=0;j<9;j++){
                            let rgbColor=chroma(temp[j]).css();
                            let rgbaColor=rgbColor.replace("rgb","rgba").replace(")",",1.0)");
                            newColors.push({name : `${name} ${shades[j]}`, hex : `${temp[j]}`, rgb : rgbColor , rgba : rgbaColor});
                        }
                        return {newColors, paletteName, emoji};
                    }
                }
            }
        }
    }
    render(){
        const {colorId, paletteId}=this.props.routeProps.match.params;
        const {classes}=this.props;
        let {newColors, paletteName, emoji}=this.getShades(this.props.seedColors, paletteId, colorId);
        let format=this.state.formate;
        let shadesPalette=newColors.map((curValue)=>(<ColorBox  name={curValue.name} background={curValue[`${format}`]} key={curValue.name} paletteId={paletteId} colorId={colorId} showMore={false}/>));
        return(
            <div className={classes.Palette}>
                <NavBar  changeFormat={this.changeFormat} showSlider={false}/>
                <div className={classes.paletteColors}>
                    <div className={classes.paletteContainer}>
                        {shadesPalette}
                    </div>
                    <Link to={`/palette/${paletteId}`} className={classes.goBack} ><span className={classes.goBackButton}>Go Back</span></Link>
                </div>
                <PaletteFooter name={paletteName} emoji={emoji} />
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette);