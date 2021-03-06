import React from "react";
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import {withStyles} from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./styles/PaletteListStyles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
class PaletteList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          openDeleteDialog: false,
          deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    openDialog(id) {
      this.setState({ openDeleteDialog: true, deletingId: id });
    }
    closeDialog() {
      this.setState({ openDeleteDialog: false, deletingId: "" });
    }
    goToPalette(id) {
      this.props.history.push(`/palette/${id}`);
    }
    handleDelete() {
      this.props.handleDelete(this.state.deletingId);
      this.closeDialog();
    }
    render(){
      const {classes}=this.props;
      return(
        <div className={classes.root}>
          <div className={classes.container}>
            <nav className={classes.nav}>
              <h1 className={classes.heading}>React Colors</h1>
              <Link to="/palette/new">Create New Palette</Link>
            </nav>
            <div className={classes.palettes}>
              {
                this.props.seedColors.map((curValue)=>(
                  //<Link to={`/pallet/${curValue.id}`} key={curValue.id} className={classes.palette}>
                    <MiniPalette {...curValue} key={curValue.id} handleDelete={this.openDialog} handleClick={() => this.goToPalette(curValue.id)}/>
                  //</Link>
                ))
              }
            </div>
          </div>
          <Dialog
            open={this.state.openDeleteDialog}
            aria-labelledby='delete-dialog-title'
            onClose={this.closeDialog}
          >
            <DialogTitle id='delete-dialog-title'>
              Delete This Palette?
            </DialogTitle>
            <List>
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Delete' />
              </ListItem>
              <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Cancel' />
              </ListItem>
            </List>
          </Dialog>
        </div>
      )
    }
}
export default withStyles(styles)(PaletteList);