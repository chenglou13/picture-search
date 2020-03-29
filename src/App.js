import React, { Component } from "react";
import "./App.scss";
import Photo from "./components/photo";
import Search from "./components/search";
import Pagination from "./components/pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosData: [],
      favouriteData: [],
      isLoaded: false,
      value: "",
      lat: null,
      lon: null,
      displayMsg: "Start by searching a Lattitude and Longitude",
      showFav: false
    };
  }

  componentDidMount() {}

  searched = (photoData, lat, lon, isLoaded, msg) => {
    this.setState({
      photosData: photoData,
      lat: lat,
      lon: lon,
      isLoaded: isLoaded,
      displayMsg: msg,
      showFav: false
    });
  };

  render() {
    const { isLoaded } = this.state;


    let favourites = [];
    let getLs = localStorage.getItem("fav-data");

    if (getLs != null) {
      favourites = JSON.parse(getLs);
    }

    if (!isLoaded || (favourites.length === 0 && this.state.showFav )) {
      return (
        <div className="App">
          <Search searched={this.searched} props={this.props} />
          <div className="nonText">{this.state.displayMsg}</div>
            <div className="myFavs" onClick={ () => this.setState({ favouriteData: favourites, isLoaded: true, showFav: true, displayMsg: 'You have not added any favourites'})}>
              My Favourites
            </div>
        </div>
      );
    }

    if (this.state.showFav) {
      return (
        <div className="App">
          <Search searched={this.searched} props={this.props} />
          <Photo photos={this.state.favouriteData} showFav={this.state.showFav} />
        </div>

      )
    }

    return (
      <div className="App">
        <Search searched={this.searched} props={this.props} />
        {this.state.lat && this.state.lon ? (
          <div className="resultsFor">
            Results for <strong>Lattitude</strong> {this.state.lat}{" "}
            <strong>Longitude</strong> {this.state.lon}
          </div>
        ) : (
          <div />
        )}
        <Photo photos={this.state.photosData.photos.photo} />
        <div className="myFavs" onClick={ () => this.setState({ favouriteData: favourites, isLoaded: true, showFav: true, displayMsg: 'You have not added any favourites'})}>
          My Favourites
        </div>
        <Pagination
          page={this.state.photosData.photos.page}
          pages={this.state.photosData.photos.pages}
          lat={this.state.lat}
          lon={this.state.lon}
          props={this.props}
          searched={this.searched}
        />
      </div>
    );
  }
}

export default App;
