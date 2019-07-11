import React, { Component } from 'react';
import axios from 'axios';
import InfoSongAdded from './InfoSongAdded';
import './ListSongAdded.css';
// import playlistHeader from './playlist-header.svg';

import { PlaylistContext } from '../../../contexts/PlaylistContext';

export default class ListSongAdded extends Component {
    constructor() {
        super();
        this.state = {
            playlist: []
        }
    }
    render() {
        const { playlist } = this.state;
        return (
            <div className="main-playlist">
                <div className="playlist-header">
                    <span>CES's FAVOURITE SONGs TOURNAMENT</span>
                    {/* <img src = {playlistHeader} alt = "header"/> */}
                </div>
                <div>
                    <PlaylistContext.Consumer>
                        {({ playlist }) => (
                            playlist.map((value, index) => {
                                return <InfoSongAdded id={value.videoId} song_title={value.title} singer={value.channelTitle} adder={value.user}
                                    thumbnail={value.thumbnails} upvote={value.upvote} downvote={value.downvote} key={index} duration={value.duration}
                                    votingID={value._id} />
                            })
                        )
                        }
                    </PlaylistContext.Consumer>
                </div>
            </div>
        )
    }
} 