import React, {Component} from 'react';
import axios from 'axios';
import {serverlink} from '../server';
import { confirmAlert } from 'react-confirm-alert';

export const PlaylistContext = React.createContext();

export class PlaylistProvider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            playlist: []
        };
       
        this.getPlaylist = this.getPlaylist.bind(this);
        this.addSongToPlayList = this.addSongToPlayList.bind(this);
    }
    componentWillMount()
    {
        axios.get(serverlink + '/songs/playlist')
        .then(response => {
           console.log(response);
           this.setState({
               playlist : response.data
           })
        })
        .catch(error => {console.log(error)})
        
    }
    componentDidMount()
    {
        console.log(this.state.playlist);
    }
    getPlaylist(data)
    {
        const token = localStorage.getItem('Token');
        if(token === null) alert("Please log in to add the song to the company's playlist")
        else
        {
            confirmAlert({
                title: 'Confirm to add the song !',
                message: 'Only 1 song can be added a day per account',
                buttons: [
                    {
                    label: 'Yes',
                    onClick: this.addSongToPlayList(data)
                    },
                    {
                    label: 'No',
                    onClick: () => alert('Song was not added')
                    }
                ]
            });    
        }     
    }
    addSongToPlayList(data)
    {   
        axios({
            method : 'POST',
            headers : { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token')).token},
            url : serverlink + '/songs/add',
            data : {
              id : data
            }
            })
          .then(response => { 
            console.log(response)
            if(response.status === 200)
            {
                alert('Your account has already added a song, try again tomorrow!!');
                return false;
            }
            else
            {
                alert('Success');
                return true;
            }  
            })
          .catch(error => { console.log(error);
                return false;
            })
        if(true)
        {
            axios.get(serverlink + '/songs/playlist')
            .then(response => {
                this.setState({
                    playlist : response.data
                })
            console.log(this.state.playlist);
            })
            .catch(error => {console.log(error)})
        }
    }
    render()
    {
        const { playlist } = this.state;
        return(
            <PlaylistContext.Provider value = {{
                    playlist: playlist,
                    getPlaylist: this.getPlaylist
                }}>
                {this.props.children}
            </PlaylistContext.Provider>
        )
    }
}