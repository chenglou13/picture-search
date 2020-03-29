import React from "react";
import { useInput } from "../hooks/input-hook";
import axios from "axios";
import "../styles/search.scss";

export function Search(props) {
  const { value: lat, bind: bindLat, reset: resetLat } = useInput("");
  const { value: lon, bind: bindLon, reset: resetLon } = useInput("");

  const handleSubmit = evt => {
    evt.preventDefault();
    resetLat();
    resetLon();

    if (lat && lon) {
      let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fab6774497d7b47f5f42bdc60b09c8a6&lat=${
        lat
      }&lon=${lon}&per_page=10&format=json&extras=url_t&nojsoncallback=1`;

      axios.get(url)
        .then(res => {
          if (res.data.stat === 'ok') {
            props.searched(res.data, lat, lon, true);
          } else {
            props.searched(res.data, lat, lon, false, res.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      props.searched(
        null,
        null,
        null,
        false,
        "Please enter a Lattitude and Longitude!"
      );
    }
  };

  return (
    <div className="Search">
      <div className="labels">
        <label>
          Lattitude:
          <input type="text" {...bindLat} />
        </label>
        <label>
          Longitude:
          <input type="text" {...bindLon} />
        </label>
      </div>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default Search;
