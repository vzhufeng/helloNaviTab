import React from 'react';
 
class List extends React.Component {

  render() {
    const { dataList = [1,2,3] } = this.props;
    return (
      <ul>
        { dataList.map(function(item, index){
          return ( <li key={index}>{item}</li> )
        }) }
      </ul>
    )
  }
}

export default List;