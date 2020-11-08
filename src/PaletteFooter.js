import React from "react";
import {withStyles} from "@material-ui/styles";
import styles from "./styles/PaletteFooterStyles";
class PaletteFooter extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.footer}>
                <p>{this.props.name}  {this.props.emoji}</p>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteFooter);