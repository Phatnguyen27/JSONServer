import React, { Component } from 'react';
import axios from 'axios';
import ResultSetCard from './SearchingResultCard'
// import VideoSong from '../ListSong/VideoSong';

import {serverlink} from '../../../server';

export default class SearchingResultSet extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: this.props.match.params.text,
            SongList : [],
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
                SongList : [],
                videoFound: true
            })
            this.getSongList(this.props.match.params.text);
        }
    }
    getSongList(value)
    {
        axios.get(serverlink + `/songs/search/${value}`)
             .then(response => {
                 if(response.data === 'No Video Found')
                    this.setState({ videoFound: false});
                 else{
                    this.setState({
                        text : value,
                        SongList: response.data.data,
                        videoFound: true
                    })
                 }
                 console.log(response.data);
             })
             .catch(error => console.log(error))
    }
    render()
    {
        const {text,videoFound,SongList} = this.state;
        return(
            <div>
                <div className = "search-area-header">
                    <span>Show results for <span className = "SearchInput">{text}</span></span>
                </div>
                <div className = "result-set">
                    {videoFound === false && <div>NO VIDEO FOUND</div>}
                    {videoFound === true && 
                        <div>
                            {SongList.map((value, key) => { 
                                return <ResultSetCard id = {value.videoId} song_title = {value.title} singer = {value.channelTitle} views = {'value.views'} imgsrc={value.thumbnails} key = {key}/> })
                            }
                        </div>
                    }
                </div>
            </div> 
        )
    }
}
