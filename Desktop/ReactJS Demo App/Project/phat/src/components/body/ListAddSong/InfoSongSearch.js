import React, { Component } from 'react';
import './InfoSongSearch.css'
// import axios from 'axios';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PlaylistContext } from '../../../contexts/PlaylistContext';

export default class InfoSongSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            imgsrc: this.props.imgsrc,
            song_title: this.props.song_title,
            singer: this.props.singer,
            id: this.props.id
        }
    }
    render() {
        const { song_title, singer, id, isLoggedIn, imgsrc } = this.state;
        return (
            <Row className="musicCard">
                <Col xs="3" className="picture">
                    <img src={imgsrc} alt="#" className="img-fluid" />
                </Col>
                <Col xs="7" className="info">
                    <div className="song-title"><Link to={{ pathname: '/playing/' + id, state: { title: song_title, singer: singer } }}>{song_title}</Link></div>
                    <div className="singer">{singer}</div>
                </Col>
                <Col xs="2" className="button-add">
                    <PlaylistContext.Consumer>
                        {({ addToPlaylist }) =>
                            (
                                <Button outline color="primary" className="addBtn" onClick={() => addToPlaylist(id)}>Add</Button>
                            )}
                    </PlaylistContext.Consumer>
                </Col>
            </Row>
        )
    }
}