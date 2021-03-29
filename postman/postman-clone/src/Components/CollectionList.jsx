import React, {Component} from 'react';
import CollectionDetails from './CollectionDetails';
 

class CollectionList extends Component{
    deletingCollection=(id)=>{
        this.props.deletingCollection(id);
    }
    render(){
        return this.props.list.map((collectionData)=>(
            <CollectionDetails key={collectionData.collectionId} collection={collectionData} deletingCollection={this.deletingCollection}/>
        )
        )
    }
}   

export default CollectionList;