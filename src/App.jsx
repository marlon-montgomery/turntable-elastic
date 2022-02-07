import React from "react";
import "./app.css";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import './stylesheets/layout.scss';
import Logo from './assets/images/Logo.png';
import search from './assets/images/search.png';
import { ResultItems } from './components/ResultItem/ResultItem';

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig()
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched, results }) => ({ wasSearched, results })}>
        {({ wasSearched, results }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  className="headerBackground"
                  header={
                    <div className="header">
                    <div className="align-center">
                      <img src={Logo} alt="logo" width="35" height="35" />
                      <SearchBox
                      autocompleteSuggestions={true}
                      inputView={({ getAutocomplete, getInputProps }) => (
                        <div className="search-bar-wrapper">
                          <input
                            className="search-input"
                            {...getInputProps({
                              placeholder: "Search for People, Companies, and/or keywords"
                            })}
                          />
                          {getAutocomplete()}
                          <img src={search} alt="search" className="search-icon" />
                        </div>
                      )}
                      />
                    </div>
                  </div>
                }
                  sideContent={
                    <div className="sideContent">
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map(field => (
                      <Facet
                        mapContextToProps={context => {
                          if (!context.facets[field]) return context;
                          return {
                            ...context,
                            facets: {
                              ...(context.facets || {}),
                              [field]: context.facets[field].map(s => ({
                                ...s,
                                data: s.data.filter( x => x.value !== "")
                              })),
                            }
                          };
                        }}
                        key={field}
                        field={field}
                        label={field}
                      />
                      ))}
                    </div>
                  }
                  bodyContent={
                    <ResultItems results={results} />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
