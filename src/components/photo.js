import React from "react";
import "../styles/photo.scss";

function addToFav(data) {

  let favourites = [];
  let getLs = localStorage.getItem("fav-data");

  if (getLs != null) {
    favourites = JSON.parse(getLs);
  }

  if (favourites.filter(item => item.id === data.id).length === 0) {
    favourites.push(data);
    localStorage.setItem("fav-data", JSON.stringify(favourites));
  }

}

const Photo = ({ photos, showFav }) => {
  return (
    <div className="Photo">
      {photos.map((photo, i) => (
        <div className="outer-box col-xs-12 col-md-6 col-lg-4" key={i}>
          <div className="photobox">
            <div
              className="thumbnail"
              style={{
                backgroundImage: `url(${photo.url_t})`
              }}
            />
            <div className="info">
              <strong>Title:</strong>
              <br />
              {photo.title}
              {!showFav ? (
                <div className="addToFav" onClick={() => addToFav(photo)}>
                  Add to Favourites
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Photo;
