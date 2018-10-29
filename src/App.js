import React, { Component } from "react";
import Radium, { StyleRoot } from "radium";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "12345", name: "Dey", age: 24 },
      { id: "12456", name: "Joe", age: 23 },
      { id: "12567", name: "Alex", age: 21 }
    ],
    otherState: "some other value",
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // !!This mutates the state directly!! const person = this.state.persons[personIndex];
    // The one below create's a new JS obect and use the spread operator
    const person = { ...this.state.persons[personIndex] };

    // update the person name which we can because we have a copy
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    //.slice without areguments simply copies the orignal array and returns a new one into the const variable
    //const persons = this.state.persons.slice();
    //user ... (spread operator) is the more common way to make a new array with the objects of the old array added in to create a new one but now the old one itself
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "green",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      color: "white",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black",
        fontWeight: "bold"
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((persons, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={persons.name}
                age={persons.age}
                key={persons.id}
                changed={event => this.nameChangedHandler(event, persons.id)}
              />
            );
          })}
        </div>
      );
      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black",
        fontWeight: "bold"
      };
    }

    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push("red"); //classes = 'red'
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); //classes = 'red', 'bold'
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(" ")}>This is really working!!</p>
          <button style={style} onClick={this.togglePersonHandler}>
            Switch Name
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}

export default Radium(App);
