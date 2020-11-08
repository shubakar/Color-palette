import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import ColorPalette from "./ColorPalette";
import SingleColorPalette from "./SingleColorPallet";
import NewPalette from "./NewPalette";
class App extends React.Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("seedColors"));
    this.state = { seedColors: savedPalettes || seedColors };
    //this.state = { seedColors: seedColors };
    this.getById=this.getById.bind(this);
    this.addPalette=this.addPalette.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
  }
  getById(id){
    let len=this.state.seedColors.length;
    let Colors=this.state.seedColors;
    for(let i=0;i<len;i++){
      if(id===Colors[i].id){
        return Colors[i];
      }
    }
  }
  addPalette(newPalette){
    this.setState(
      { seedColors: [...this.state.seedColors, newPalette] }, this.syncLocalStorage
    );
  }
  handleDelete(id){
    let newColors=this.state.seedColors.filter((curValue)=>(curValue.id!==id));
    this.setState({seedColors : newColors},this.syncLocalStorage);
    this.setState({seedColors : newColors});

  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "seedColors",
      JSON.stringify(this.state.seedColors)
    );
  }
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={routeProps=><PaletteList {...routeProps} seedColors={this.state.seedColors} handleDelete={this.handleDelete}/>}/>
          <Route exact path="/palette/new" render={(routeProps)=><NewPalette addPalette={this.addPalette} routeProps={routeProps} seedColors={this.state.seedColors}/>}/>
          <Route exact path="/palette/:id" render={(routeProps)=><ColorPalette colors={this.getById(routeProps.match.params.id)}/>} />
          <Route exact path="/palette/:paletteId/:colorId" render={(routeProps)=><SingleColorPalette routeProps={routeProps} seedColors={this.state.seedColors}/>} />
          <Route render={routeProps=><PaletteList {...routeProps} seedColors={this.state.seedColors} handleDelete={this.handleDelete}/>}/>
        </Switch>
      </div>
    );
  }
}
export default App;
