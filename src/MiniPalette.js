import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from "./styles/MiniPaletteStyles";

class miniPalette extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete=this.handleDelete.bind(this);
    }
    handleDelete(evt){
        evt.stopPropagation();
        this.props.handleDelete(this.props.id);
    }
    render(){
        const {classes}=this.props;
        const minicolors=this.props.colors.map((curValue)=>(<div className={classes.miniColor} key={curValue.name} style={{backgroundColor: curValue.color}}/>));
        return(
            <div className={classes.miniPalette} onClick={this.props.handleClick}>
                <DeleteIcon className={classes.deleteIcon} style={{ transition: "all 0.3s ease-in-out" }} onClick={this.handleDelete}/>
                <div className={classes.color}>
                    {minicolors}
                </div>
                <h5 className={classes.title}>
                    {this.props.paletteName}
                    <span className={classes.emoji}>
                        {this.props.emoji}
                    </span>
                </h5>
            </div>
        );
    }
}
export default withStyles(styles)(miniPalette);