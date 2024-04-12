import React, { Component } from 'react'

export default class classComponent extends Component {

    constructor(){
        super();
        this.state={name:'asd', age: 10};
    }
  render() {
    return (
      <div>
        {this.state.name}{this.state.age}
      </div>
    )
  }
}
