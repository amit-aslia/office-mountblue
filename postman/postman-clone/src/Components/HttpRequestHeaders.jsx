import React, { Component } from "react";
class HttpRequestHeaders extends Component {
    state = {  }
    render() { 
        return ( 
       
  <div style={{height:170, overflow:'auto',border: 'solid 1px'}}>
    {this.props.headerKeys.map((headerKey, index) => {
      return (
        <div key={index}>
          <div className="header-input-container">
            <input
            placeholder={"Key"}
            value={headerKey}
            onChange={e => {
              this.props.handleHeaderKeyChange(e, index);
            }}
          />
         
         <input
            placeholder={"value"}
            value={this.props.headerValues[index]}
            onChange={e => {
              this.props.handleHeaderValueChange(e, index);
            }}
          />
          
          <button className="remove-header" onClick={() => this.props.handleHeaderRemove(index)}>
            X
          </button>
          </div>
        </div>
      );
    })}
    <button className="add-header" onClick={e => this.props.addHeader(e)}>Add Header</button>
    
  </div>
 
        );
    }
}
 
export default HttpRequestHeaders;