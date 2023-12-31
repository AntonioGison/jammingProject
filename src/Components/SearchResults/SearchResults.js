import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  render() {
    // console.log(this.props.searchResults);
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          isRemoval={false}
          onAdd={this.props.onAdd}
          tracks={this.props.searchResults}
        />
      </div>
    );
  }
}

export default SearchResults;
