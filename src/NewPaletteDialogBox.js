import React from "react";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class NewPaletteDialogBox extends React.Component{
    static defaultProps = {
        open : "name"
    }
    constructor(props){
        super(props);
        this.state={
            open : this.props.open,
            setOpen : this.props.open,
            paletteName : "",
        }
        this.handlePaletteNameChange=this.handlePaletteNameChange.bind(this);
        this.handlePaletteNameSubmit=this.handlePaletteNameSubmit.bind(this);
        this.addEmoji=this.addEmoji.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
        this.props.seedColors.every(({ paletteName }) => paletteName !== this.state.paletteName)
        );
    }
    handleClickOpen = () => {
        this.setState({open : "name"});
    };
    handleClose = () => {
        this.setState({open : "name"});
        this.props.handleSavePaletteDialogBox();
    };
    handlePaletteNameChange(evt){
        this.setState({paletteName: evt.target.value});
    }
    handlePaletteNameSubmit(){
        this.setState({open : "emoji"});
    }
    addEmoji(emoji){
        this.props.handlePaletteNameSubmit({name : this.state.paletteName, emoji : emoji.native});
    }
    render(){
        return(
            <div>      
              <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
              </Button>
              <Dialog open={this.state.open==="emoji"}>
                <Picker onSelect={this.addEmoji}/>
              </Dialog>
              <Dialog open={this.state.open==="name"} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Palette Name</DialogTitle>
                <ValidatorForm
                    ref="form"
                    onError={errors => console.log(errors)}
                    onSubmit={this.handlePaletteNameSubmit}
                >
                  <DialogContent>
                    <DialogContentText>
                      Add Palette Name and save your Color Palette
                    </DialogContentText>
                    <TextValidator
                        label="Palette Name"
                        onChange={this.handlePaletteNameChange}
                        name="text"
                        value={this.state.paletteName}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "Palette name must be unique"
                        ]}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="secondary" variant="contained">
                      Cancel
                    </Button>
                    <Button variant="contained"  type="submit"  color="primary">
                      Save Palette
                    </Button>
                  </DialogActions>
                </ValidatorForm>
              </Dialog>
            </div>
        )
    }
}
export default NewPaletteDialogBox;