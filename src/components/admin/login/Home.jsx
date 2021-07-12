import React from 'react'
class Home extends React.Component{
    
    render(){
        
        return(
         
            <div>
                   
           
      <h1>  {this.props.location.state.data}</h1>
            </div>
           
        )
;    }
}
export default Home