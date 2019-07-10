import React, {Component} from 'react';
import './App.css';
import Header from './components/header/Header';
// import Body from './components/body/Body';
import {BrowserRouter as Router, Route} from "react-router-dom";

import { Container, Row, Col } from 'reactstrap';
// import Playlist from './components/body/ListSong/Playlist';
import SidebarPlaylist from './components/body/ListAddSong/SidebarPlaylist';
import VideoSong from './components/body/ListSong/VideoSong';
import SearchingResultSet from './components/body/ListAddSong/SearchingResultSet';
import MainPlaylist from './components/body/ListAddSong/MainPlaylist';

import { PlaylistProvider } from './context/PlaylistContext';

class App extends Component {
  
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <PlaylistProvider>
          <div className = "body">
            <Container>
              <Route exact path = "/" component={MainPlaylist}></Route>
              <Row style={{backgroundColor: "white", paddingTop: "20px"}}>                  
                  <Col xs="7">
                      <Route path = "/searching/:text" component={SearchingResultSet}></Route>
                      <Route path = "/playing/:id" component={VideoSong}></Route>
                  </Col>
                  <Col xs="5" >
                    <Route path = "/playing/:id" component={SidebarPlaylist}></Route>
                    <Route path = "/searching/" component={SidebarPlaylist}></Route>
                  </Col>
              </Row> 
            </Container>
           </div>
           </PlaylistProvider>
        </div>
      </Router>
    
    );
  }
}

export default App;
