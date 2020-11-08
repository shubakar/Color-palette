import chroma from "chroma-js";
function getShades(colors){
    let newColors={
        paletteName: colors.paletteName,
        id : colors.id,
        emoji : colors.emoji,
        colors : {
            100 : [],
            200 : [],
            300 : [],
            400 : [],
            500 : [],
            600 : [],
            700 : [],
            800 : [],
            900 : []
        }

    };
    let shades=[100,200,300,400,500,600,700,800,900];
    let len = colors.colors.length;
    for(let i=0 ;i<len;i++){
        let temp=generateShades(colors.colors[i].color);
        for(let j=0;j<9;j++){
            let rgbColor=chroma(temp[j]).css();
            let rgbaColor=rgbColor.replace("rgb","rgba").replace(")",",1.0)");
            newColors.colors[shades[j]].push({name : `${colors.colors[i].name} ${shades[j]}`, hex : `${temp[j]}`, rgb : rgbColor , rgba : rgbaColor});
        }
    }
    return newColors;
}
function generateShades(color){
    return chroma.scale([chroma(color).brighten(3),chroma(color).darker(1)]).colors(9);
}
export default getShades;