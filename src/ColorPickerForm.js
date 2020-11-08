import React from "react";
import {ChromePicker} from "react-color";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";
class ColorPickerForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            buttonColor : "#800080",
            colorName : "",
        }
        this.changeButtonColor=this.changeButtonColor.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
        this.props.colors.every(({ color }) => color !== this.state.buttonColor)
        );
    }
    handleNameChange(evt){
        this.setState({[evt.target.name]: evt.target.value});
    }
    handleSubmit(evt){
        let temp={name : this.state.colorName, color : this.state.buttonColor};
        this.props.handleSubmit(temp);
        this.setState({colorName : ""});
    }
    changeButtonColor(color, evt){
        this.setState({buttonColor: color.hex});
    };
    render(){
        let {buttonColor}=this.state;
        const {classes, paletteIsFull}=this.props;
        return(
            <div>
                <ChromePicker color={buttonColor}
                    onChangeComplete={this.changeButtonColor}
                    className={classes.picker}/>
                    <ValidatorForm
                        ref="form"
                        onError={errors => console.log(errors)}
                        onSubmit={this.handleSubmit}
                        instantValidate={false}
                    >
                    <TextValidator
                        label="Color Name"
                        onChange={this.handleNameChange}
                        className={classes.colorNameInput}
                        placeholder='Color Name'
                        name="colorName"
                        margin='normal'
                        value={this.state.colorName}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used!"
                        ]}
                    />
                    <Button variant="contained" 
                        className={classes.addColor} 
                        disabled={paletteIsFull} 
                        type="submit"  color="primary" style={{
                            backgroundColor: paletteIsFull ? "grey" : buttonColor
                    }}>
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>

        )
    }
}
export default withStyles(styles)(ColorPickerForm);