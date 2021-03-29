import React, { Component } from "react";
class HttpRequestBody extends Component {
    
    render() { 
        return (
       
           <span>
              <textarea
                className="body-raw-input"
                placeholder={"Body"}
                value={this.props.body}
                onChange={e => {
                  this.props.handleBodyRawInputChange(e);
                }}
              />
            </span>

     );
     

         
    }
}
 
export default HttpRequestBody;