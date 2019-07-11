import React, { Component } from 'react';
import axios from 'axios';
import InfoSongSearch from './InfoSongSearch'
// import VideoSong from '../ListSong/VideoSong';

import { server } from '../../../server';

export default class ListSongSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: this.props.match.params.text,
            songList : [],
            videoFound : true
        }
        this.getSongList = this.getSongList.bind(this);
    }
    componentDidMount()
    {
        var value = this.props.match.params.text;
        this.getSongList(value);
    }
    componentDidUpdate()
    {
        
        if(this.state.text !== this.props.match.params.text)
        {
            this.setState({
                text : this.props.match.params.text,
                songList : [],
                videoFound: true
            })
            this.getSongList(this.props.match.params.text);
        }
    }
    getSongList(value)
    {
        axios.get( server + `/songs/search/${value}`)
             .then(response => {
                 if(response.data.toString().toLowerCase() === 'no video found')
                    this.setState({ videoFound: false});
                 else{
                    this.setState({
                        text : value,
                        songList: response.data.data,
                        videoFound: true
                    })
                 }
             })
             .catch(error => console.log(error))
    }
    render()
    {
        const {text,videoFound, songList} = this.state;
        return(
            <div>
                <div className = "SearchAreaHeader">
                    <span>Show results for <span className = "SearchInput">{text}</span></span>
                </div>
                <div className = "ResultSet">
                    {videoFound === false && <div>NO VIDEO FOUND</div>}
                    {videoFound === true && 
                        <div>
                        {songList.map((value,key) => { 
                        return <InfoSongSearch id = {value.videoId} song_title = {value.title} singer = {value.channelTitle} views = {'value.views'} imgsrc={value.thumbnails} key = {key}/> })}
                    </div>}
                </div>
            </div> 
        )
    }
}
