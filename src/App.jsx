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

// mui button imported here
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// popup model components imported here


import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";
import { Link } from "@mui/material";

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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  textAlign: 'center',
  boxShadow: 24,
  p: 4,
};


export default function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                          className="search-box-custome"
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
                      <div className="create-btn"><Button variant="contained" style={{ backgroundColor: "var(--btn-color)" }} onClick={handleOpen}>Create Profile</Button></div>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography variant="h6" id="modal-modal-title" padding={2} paddingBottom={5}><b>Account already exists ?</b></Typography>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                          >
                            <Button onClick={handleClose} target="_blank" href="https://mediatech.ventures/login/" id="modal-modal-title" variant="contained" style={{ backgroundColor: "var(--btn-color)" }}>
                              yes
                            </Button>
                            <Button onClick={handleClose} target="_blank" href="https://mediatech.ventures/join/" id="modal-modal-description" variant="contained" style={{ backgroundColor: "var(--btn-color)" }}>
                              no
                            </Button>
                          </Grid>
                        </Box>
                      </Modal>
                    </div>
                  }
                  sideContent={
                    <div className="sideContent" stle={{}}>
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
                                  data: s.data.filter(x => x.value != "—" && x.value != "")
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
      </WithSearch >
    </SearchProvider >
  );
}
