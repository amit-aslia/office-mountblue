import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteHTTPHistory, toRenderHistory } from '../store/actions/httpHistoryActions'
import moment from 'moment';


class HistorySummary extends Component {
    state = {
        data: []
    }
    handleDelete = (e) => {
        
        this.props.deleteHTTPHistory(this.props.historyData);
    }
    handleClick = (e) => {

        this.props.toRenderHistory(this.props.historyData)
    }
    render() {
        return (<React-fragment>
            {this.props.historyData.userId === this.props.auth.uid && <div className='container' style={{position:'relative'}}  >
                <Link to={'/'}>
                    <div onClick={() => this.handleClick(this)} style={{ color: 'green', textDecoration: 'none', fontWeight: 'bold' }}>{this.props.historyData.method}</div>
                </Link>
                <div><div style={{maxWidth:'80%'}}>{this.props.historyData.url}</div>
                    <i style={{position:'absolute' , right:10 , top:40}} className="fa fa-trash" aria-hidden="true" onClick={() => this.handleDelete(this)} ></i>
                </div>

                <p style={{ fontWeight: 'bold' }}>{moment(this.props.historyData.createdAt.toDate()).fromNow()}</p>
            </div>}

        </React-fragment>);



    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteHTTPHistory: (history) => dispatch(deleteHTTPHistory(history)),
        toRenderHistory: (renderData) => dispatch(toRenderHistory(renderData))
    };

};


export default connect(null, mapDispatchToProps)(HistorySummary) 