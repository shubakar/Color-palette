import sizes from "./sizes";
export default {
    Palette : {
        height: "100vh"
    },
    paletteColors : {
        height: "90vh"
    },
    paletteContainer : {
        display : "inline"
    },
    goBack : {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        backgroundColor : "black",
        color : "white",
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showMore ? "20%" : "33.333%")
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showMore ? "10%" : "20%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showMore ? "5%" : "10%")
        }
    },
    goBackButton : {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        color: "white",
        textTransform: "uppercase",
        border: "none",
    }

};