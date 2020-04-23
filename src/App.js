import React, { Component } from 'react';
import "./App.css"

class App extends Component{

  state = {
    notes: [],
    addNote: false,
    title: '',
    note: '',
    counter: 0
  }

  addNote = () =>{
    this.setState({
      addNote: !this.state.addNote
    })
  }

  titleHandler = e => {
    this.setState({
      title: e.target.value
    })
  }

  noteHandler = e => {
    this.setState({
      note: e.target.value
    })
  }

  submitToState = () => {
    const {title,note,counter} = this.state;

    const latestNote = {id: counter,title: title, note: note};

    this.toStorage(latestNote);

    this.setState({
      notes: [...this.state.notes,latestNote],
      title: '',
      note: '',
      counter: this.state.counter + 1,
      addNote: !this.state.addNote
    })
  } 
  
  deleteNote = id => {
    const array = this.state.notes;
    const index = array.findIndex(item => item.id === id);
    array.splice(index,1);
    this.setState({
      notes: array
    });
    this.removeFromStorage(id);
  } 

  toStorage = note => {
    localStorage.setItem(note.id,JSON.stringify(note));
  }

  removeFromStorage = (id) => {
    localStorage.removeItem(id);
  }

  componentDidMount(){
    if( localStorage.length!==0 ){
       const array = [];
       const limit = localStorage.length;
       let i = 0;
       let max = 0;
       for(let key in localStorage){
         if(i === limit){
           break;
         }
          array.push(JSON.parse(localStorage.getItem(key)));
          i++;
       }
       
       array.forEach(item =>{
         if(item.id>max){
           max = item.id;
         }
       })
       max++;


       this.setState({
         notes: array,
         counter: max
       })
    }
  }
 

  render(){

    const {notes,addNote} = this.state;
    

    return(
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">
              <i className="far fa-sticky-note"></i>
              <h3>NoteIt!</h3>
          </div>
          <i onClick={this.addNote} className="fas fa-plus text-primary"></i>
        </nav>

        <div className="container">
          <div className="row justify-content-around text-center ">

            {
              addNote ? 
              <div className="add-note">
                <div className="card note-form col-sm-10 col-6-md">
                  <div className="card-header text-center"><h3>Note</h3></div>
                  <div className="card-body h-100">
                      <input onChange={this.titleHandler} type="text" placeholder="Note title goes here" className="form-control"/>
                      <textarea onChange={this.noteHandler} id="textarea" className="form-control mt-2" placeholder="Your note goes here :)"></textarea>
                  </div>
                  <div className="card-footer">
                      <button onClick={this.submitToState} className="btn btn-success">Add</button>
                      <button onClick={this.addNote} className="btn btn-danger ml-1">Cancel</button>
                  </div>
                </div>
              </div>
              :
              notes.length===0 ? 
                <h2 className="font-weight-light mt-5">Currently you have no notes, maybe create one?</h2>
              :
                notes.map(note => 
                <div key={note.id} className="card col-md-5 col-sm-10 p-0 m-4">
                  <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p>
                     {note.note}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn w-50 text-primary">
                      Edit
                    </button>
                    <button onClick={() => this.deleteNote(note.id)} className="btn w-50 text-primary">
                      Delete
                    </button>
                  </div>
                </div>
              )
            }
            
          </div>
        </div>

      </div>
    );
  }
}



export default App;
