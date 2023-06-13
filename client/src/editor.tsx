import React, { ChangeEvent, Component, MouseEvent } from "react";
import { Square, Path, split, solid, Color } from './square';
import { SquareElem } from "./square_draw";
import { retrieve_the_root, return_a_new_square } from './square';
import { len, prefix } from "./list";

interface EditorProps {
  initialState: Square;
  onSave?: (_: MouseEvent<HTMLButtonElement>) => void;  
  onClick?: (_: MouseEvent<HTMLButtonElement>) => void;
}

interface EditorState {
  root: Square;
  selected?: Path;
}

export let theSquare: Square | undefined 

export class Editor extends Component<EditorProps, EditorState> {

  constructor(props: any) {
    super(props);
    this.state = {root: props.initialState}; 
  }

  render = (): JSX.Element => { 
    theSquare = this.state.root
    
    return (
      <div>
        <button onClick={this.handleSplit}>Split</button>    
        <button onClick={this.handleMerge}>Merge</button>
        <select onChange={this.handleColorChange}>
          <option value="white">white</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="purple">purple</option>
        </select>
        <button onClick={this.props.onSave}>Save</button>
        <button onClick={this.props.onClick}>Back</button>
        <SquareElem width={600} height={600}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.handleClick}></SquareElem>; 
      </div>
    )
  };

  handleClick = (path: Path): void => {
    this.setState({selected: path}) 
  }

  handleSplit = (): void => { 
    let newSquare:Square
    let color:Color

    if (this.state.selected !== undefined) {
      newSquare = retrieve_the_root(this.state.selected, this.state.root)
      if (newSquare.kind === "solid") {
        color = newSquare.color
        newSquare = split(solid(color), solid(color), solid(color), solid(color));
        if (this.state.selected !== undefined) {
          this.setState({ root: return_a_new_square(this.state.root, this.state.selected, newSquare)})
        }
      }
    } 
  
  };

  handleMerge = (): void => {
    if(this.state.root !== undefined && this.state.selected !== undefined) {
      const parentPath = prefix(len(this.state.selected) - 1, this.state.selected);
      const getSubSquare = retrieve_the_root(this.state.selected, this.state.root);
      const updatedRoot = return_a_new_square(this.state.root, parentPath, getSubSquare);
      this.setState({root: updatedRoot});
    }
    this.setState({selected: undefined});
  };

  handleColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => { 
    let newSquare:Square
    if (evt.target.value === "white") {
      newSquare = {kind: "solid", color: "white"}
    } else if (evt.target.value === "red") {
      newSquare = {kind: "solid", color: "red"}
    } else if (evt.target.value === "orange") {
      newSquare = {kind: "solid", color: "orange"}
    } else if (evt.target.value === "yellow") {
      newSquare = {kind: "solid", color: "yellow"}
    } else if (evt.target.value === "green") {
      newSquare = {kind: "solid", color: "green"}
    } else if (evt.target.value === "blue") {
      newSquare = {kind: "solid", color: "blue"}
    } else if (evt.target.value === "purple") {
      newSquare = {kind: "solid", color: "purple"}
    } else {
      throw new Error("It shuold be one of the six colors")
    }

    if (this.state.selected !== undefined) {
      const result:Square = return_a_new_square(this.state.root, this.state.selected, newSquare)
      this.setState( {root: result} )
    }
  };


}