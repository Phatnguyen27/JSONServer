import React, {Component} from 'react';
import axios from 'axios';
import SidebarPlaylistCard from './SidebarPlaylistCard';

import {serverlink} from '../../../server';

import { PlaylistContext } from '../../../context/PlaylistContext';

export default class SidebarPlaylist extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="sidebar-playlist">
                <PlaylistContext.Consumer>
                {({playlist}) => 
                (
                    playlist.map((value,index) => {
                    return <SidebarPlaylistCard id = {value.videoID} song_title = {value.title} singer = {value.channelTitle} adder = {value.user}
                    thumbnail = {value.thumbnails} upvote = {value.upvote} downvote = {value.downvote} key = {index} votingID ={value._id}/>
                }))}
                </PlaylistContext.Consumer>
            </div>

        )
    }
}