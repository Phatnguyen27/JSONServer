import React, {Component} from 'react';
import './App.css';
import Header from './components/header/Header';
// import Body from './components/body/Body';
import {BrowserRouter as Router, Route} from "react-router-dom";

import { PlaylistProvider } from './contexts/PlaylistContext';

import { Container, Row, Col } from 'reactstrap';
// import Playlist from './components/body/ListSong/Playlist';
import SidebarPlaylist from './components/body/ListAddSong/SidebarPlaylist'
import VideoSong from './components/body/ListSong/VideoSong'
import ListSongSearch from './components/body/ListAddSong/ListSongSearch'
import ListSongAdded from './components/body/ListAddSong/ListSongAdded'


class App extends Component {
  
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className = "body">
            <PlaylistProvider>
            <Container>
              <Route exact path = "/" component={ListSongAdded}></Route>
              <Row style={{backgroundColor: "white", paddingTop: "20px"}}>                  
                  <Col xs="7">
                      <Route path = "/searching/:text" component={ListSongSearch}></Route>
                      <Route path = "/playing/:id" component={VideoSong}></Route>
                  </Col>
                  <Col xs="5" >
                    <Route path = "/playing/:id" component={SidebarPlaylist}></Route>
                    <Route path = "/searching/" component={SidebarPlaylist}></Route>
                  </Col>
              </Row>
            </Container>
            </PlaylistProvider>
           </div>
        </div>
      </Router>
    
    );
  }
}

export default App;
