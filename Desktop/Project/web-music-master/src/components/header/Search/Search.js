import React, {Component} from 'react';
import './Search.css'
import { Redirect } from 'react-router-dom';


class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            searchingStart: false
        }
        this.enterBtnClick = this.enterBtnClick.bind(this);
    }
    componentDidUpdate()
    {
        if(this.state.searchingStart === true)
        {
            this.setState({
                searchingStart: false
            })
        }
    }
    enterBtnClick (event){
        event.preventDefault();
        console.log(this.state.searchingStart);
        console.log(event.target.value);
        if(event.keyCode === 13 && event.target.value !== ''){
            this.setState({
                searchText: event.target.value,
                searchingStart: true
            });
        }
    }

    render(){
        const {searchingStart, searchText} = this.state;
        return(
            <div className="search">
                <input className = "SearchInput" type="search" placeholder="Search" onKeyUp = {this.enterBtnClick}/>                
                {(searchingStart) && <Redirect to={"/searching/" + searchText}/>}
            </div>
        )
    }
}
export default Search;
