import React, { Component } from 'react';
import axios from 'axios';
import PlaylistCard from './PlaylistCard';
import './MainPlaylist.css';
// import playlistHeader from './playlist-header.svg';
import {serverlink} from '../../../server';
import { PlaylistContext } from '../../../context/PlaylistContext';

export default class MainPlaylist extends Component
{
    constructor()
    {
        super();
    }
    componentDidMount()
    {
        console.log('playlist-mounted');
    }
    render()
    {
        return(
            <div className = "main-playlist">
                <div className = "playlist-header">
                    <span>CES's FAVOURITE SONGs TOURNAMENT</span>
                    {/* <img src = {playlistHeader} alt = "header"/> */}
                </div>
                <PlaylistContext.Consumer>
                {({playlist}) => 
                (
                    playlist.map((value,index) => {
                    return <PlaylistCard id = {value.videoID} song_title = {value.title} singer = {value.channelTitle} adder = {value.user}
                    thumbnail = {value.thumbnails} upvote = {value.upvote} downvote = {value.downvote} key = {index} votingID ={value._id}/>
                }))}
                </PlaylistContext.Consumer>
            </div>
        )
    }
} 