import algoliasearch from 'algoliasearch/lite';
import React, { Component } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  NumericMenu,
  HitsPerPage,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'PKWB206NKF',
  'cf9beace342b2f7c2816eedd5f03a6b0'
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>Student Record Search</h1>
        <InstantSearch indexName="student_record" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>City</h2>
            <RefinementList attribute="city" />
            <hr />
            <h2>College</h2>
            <RefinementList attribute="college" />
            <Configure />
            <hr />
            <h2>Age Group</h2>
            <NumericMenu
              attribute="age"
              items={[
                { label: '<= 25', end: 25 },
                { label: '25 - 30', start: 25, end: 30 },
                { label: '30 - 35', start: 30, end: 35 },
                { label: '>= 35', start: 35 },
              ]}
            />
          </div>
          <div className="right-panel">
            <HitsPerPage
              defaultRefinement={6}
              items={[
                { value: 10, label: 'Show 10 hits' },
                { value: 25, label: 'Show 25 hits' },
                { value: 50, label: 'Show 50 hits' },
                { value: 100, label: 'Show 100 hits' },
              ]}
            />
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      {/* <img src={props.hit.image} align="left" alt={props.hit.name} /> */}
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="email" hit={props.hit} />
      </div>
      <div className="hit-price">{props.hit.age}</div>
      <div className="hit-price">{props.hit.college}</div>
      <div className="hit-price">{props.hit.city}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
