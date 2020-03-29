import React from "react";
import axios from "axios";
import "../styles/pagination.scss";

export function Pagination(props) {

  const pageChange = action => {

    let currentPage = props.page;

    if (action === "next") {
      currentPage++;
    } else {
      currentPage--;
    }
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fab6774497d7b47f5f42bdc60b09c8a6&lat=${
      props.lat
    }&lon=${
      props.lon
    }&per_page=10&format=json&extras=url_t&nojsoncallback=1&page=${
      currentPage
    }`;

    axios.get(url)
      .then(res => {
        if (res.data.stat === 'ok') {
          props.searched(res.data, props.lat, props.lon, true);
        } else {
          props.searched(res.data, props.lat, props.lon, false, res.data.message);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="Pagination">
        {props.page > 1 ? (
          <div className="prev" onClick={() => pageChange("prev")}>
            Prev
          </div>
        ) : (
          <div />
        )}
        <div className="pages">
          {props.page}/{props.pages}
        </div>
        {props.page !== props.pages ? (
          <div className="next" onClick={() => pageChange("next")}>
            Next
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="line" />
    </div>
  );
}

export default Pagination;
