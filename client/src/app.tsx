import React, { ChangeEvent, Component, MouseEvent} from "react";
import { Path, Square, fromJson, toJson } from './square';
import { solid } from './square'
import { Editor } from "./editor";
import { theSquare } from './editor'

interface AppState {
  currSquare: Square | undefined
  currName: string
  curr_names_array: string[] | undefined
}


export class App extends Component<{}, AppState> {
  handleClick: ((path: Path) => void) | undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      currSquare: props.initialState, 
      currName: props.initialState, 
      curr_names_array: props.initialState,
    };
  }

  // componentDidMount is a method that is called when the component is first shown in the UI. 
  // (render is a method that is called every time the React needs to update the HTML on the page.)

  handleBack = (_: MouseEvent<HTMLButtonElement>): void => {       
    this.setState({currSquare: undefined})
  }

  createSquare = (_: MouseEvent<HTMLButtonElement>): void => {
    this.setState({currSquare: solid("blue")})
  }

  setName = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({currName: evt.target.value})
  }

  handleServerError = (_: Response) => {
    console.log("something bad happened");
  }

  render = (): JSX.Element => {
    let names_for_rendering: JSX.Element[] = [];
    if (this.state.currSquare === undefined) {

      if (this.state.curr_names_array !== undefined) { // so, as of now, this.state.curr_names_array is undefiend.

        let i:number = 0
        for (const name of this.state.curr_names_array) { // when the hyperlink is clicked, show that square. So, it has to related to the load functionality.
          names_for_rendering.push(<li key={i}><a href="#" onClick={() => this.handleLoad(name)}>{name}</a></li>)
          i = i + 1;
        }
        return (<div><ul>{names_for_rendering}</ul>
          Name: <input type="text" value={this.state.currName} onChange={this.setName}/>
          <button type="button" onClick={this.createSquare}>Create</button>
          </div>
        )
      } else {
        return (<div>
          Name: <input type="text" className = "new-item" value={this.state.currName} onChange={this.setName}/>
          <button type="button" className="btn btn-link" onClick={this.createSquare}>Create</button>
          </div>
      )
      }
    } else {
      return <Editor initialState={this.state.currSquare} 
                        onSave={this.handleSave} onClick={this.handleBack}></Editor>;  
    }
  };

//////////////////////////////////////////////////

  handleSave = (): void => { 
    if (this.state.currSquare !== undefined) {
      const stringified = JSON.stringify(toJson(this.state.currSquare))
      fetch("/api/save?name=" + encodeURIComponent(this.state.currName), 
        {method: "POST",
        body: JSON.stringify({"name": this.state.currName, "contents": stringified}),
        headers: {"Content-Type": "application/json"}})
        .then(this.handleSaveResponse)
        .catch(this.handleServerError);
    }
    this.handleList_names()
  }

  handleSaveResponse = (res: Response) => {
    if(res.status !== 200 ) {
      console.error(`Error talking to the server: ${res.status}`);
    }
  }

///////////////////////////////////////////////////

  handleLoad = (file: string): void => {   
    this.setState({currSquare: theSquare})
    
    if(file !== undefined) {
      this.setState({currName:file})
      const url = "/api/load?name=" + encodeURIComponent(file)
      console.log(url)
      fetch(url)
      .then(this.handleLoadResponse)
      .catch(this.handleServerError)
    }
  };
  
  handleLoadResponse = (res: Response) => {
    if (res.status === 200) {
      res.json().then(this.handleLoadJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }

  handleLoadJson = (vals: string) => {    
    console.log(vals)
    this.setState({currSquare: fromJson(JSON.parse(vals))}) 
  }

///////////////////////////////////////////////

  handleList_names = (): void => {
    fetch("/api/list_names")
    .then(this.handleList_namesResponse)
    .catch(this.handleServerError)
  }

  handleList_namesResponse = (res: Response) => {
    if (res.status === 200) {
      res.json().then(this.handleListJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }

  handleListJson = (vals: string[]) => { // vals: string[] might not be right.
    this.setState({curr_names_array: vals}) 
  }
}