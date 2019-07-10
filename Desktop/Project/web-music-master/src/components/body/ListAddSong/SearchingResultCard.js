import React, { Component } from 'react';
import './SearchingResultCard.css'
// import axios from 'axios';
import {Button, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {serverLink} from '../../../server';

import { PlaylistContext } from '../../../context/PlaylistContext';

export default class SearchingResultCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoggedIn: true,
            imgsrc : this.props.imgsrc,
            song_title : this.props.song_title,
            singer : this.props.singer,
            id : this.props.id
        }      
    }
    onClickHandle = () => {
      const token = localStorage.getItem('Token');
      if(token === null) alert("Please log in to add the song to the company's playlist");
      else
      {
        alert('Song Added');
      }       
    }
    render()
    {
        const{song_title,singer,id,isLoggedIn,imgsrc} = this.state;
        return(
            <Row className="result-card">
                <Col xs="3" className="picture">
                <img src={imgsrc} alt="#" className="img-fluid"/>
                </Col>
                <Col xs="7" className="info">
                    <div className="song-title"><Link to={{pathname : '/playing/' + id,state: {title:song_title,singer: singer}}}>{song_title}</Link></div>
                    <div className="singer">{singer}</div>
                </Col>
                <Col xs="2" className="button-add">
                <PlaylistContext.Consumer>
                    {({getPlaylist}) => (
                        <Button outline color = "primary" className="addBtn" onClick = {() =>   getPlaylist(id)}>Add</Button>
                    )}
                </PlaylistContext.Consumer>
                </Col>
                
            </Row>
        )
    }
}