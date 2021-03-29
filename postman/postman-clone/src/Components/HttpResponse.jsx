import React, { Component } from "react";
var JSONpretty=require('react-json-pretty')
class HttpResponse extends Component {
    state = {  }
    render() { 
        return (  
            <div style={{height:290, overflow:'auto'}}>{this.props.result.length===0?null:<JSONpretty  data={this.props.result}/>}</div>
        );
    }
}
 
export default HttpResponse;