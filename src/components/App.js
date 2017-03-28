import React from 'react';
import { Link } from 'react-router';
import './App.css'

class App extends React.Component {
  constructor() {
      super();
      this.state = {list:null};
  }
  componentDidMount() {
      fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        this.setState({list: data.data});
      })

  }
  getListComponent=(data)=>{
    let component = null;
    if (data) {
      component = data.map((obj,key)=>{
        return (
          <div key={key} className="imageDiv">
            <Link to={obj.url} target="_blank"><img src={obj.images.fixed_height.url} /></Link>
          </div>
        )
      })
    }
    return component
  }
  render() {
      const list = this.state.list;
      let listComponent = this.getListComponent(list);
      return (
          <div className="main-app">
              <header className="main-header">
                  <h1><Link to="/">Daily dose of Gif</Link></h1>
              </header>
              <div className="listContainer">
                {listComponent}
              </div>
          </div>
      );
  }
};

// (data)=>{this.setState({gif:data.json()})}

export default App;
