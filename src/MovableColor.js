import React from "react";
import {withStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/MovableColorStyles";
const movableComponent = SortableElement(props=>{
    const {classes} = props;
    return(
        <div style={{backgroundColor : props.color}} className={classes.colorBox}>
            <div className={classes.boxContent}>
                <span className={classes.name}>{props.name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={()=>props.handleClick()}/>
            </div>
        </div>
    )
});
export default withStyles(styles)(movableComponent);