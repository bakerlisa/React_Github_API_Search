import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styled from './modules/SearchBar.module.scss'

const SearchBar = () => {
  const [username,setUsername] = useState("")
  const [users,setUsers] = useState([])
  const [focus,setFocus] = useState(false)


  const onChangeHandler = (event) => {
    setUsername(event.target.value)
    searchGitHub();
  } 
  
  const searchGitHub = () => {
    axios({
      method: "get",
      url: `https://api.github.com/search/users?q=${username}+in:user`,
    })
    .then(res => {
      setUsers(res.data.items);
    })
  }

  const blurHandler = (event) => {
    setFocus(false)
    
    // this is so that when you're no longer typing in the input / click out of the input and the input has nothing in it the search clears
    if(username.length <= 0){ 
      setUsername("")
      setUsers([])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <div className={styled.wrapper}>

      <div className={styled.searchWrap}>
        <input type="text" name="search" placeholder="Search Users" onChange={onChangeHandler} onFocus={() => setFocus(true)} onBlur={blurHandler} />
      </div>

      <div className={styled.submitWrp}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="submit" className={styled.submit} value="" onClick={handleSubmit}/>
      </div>
      
      { users.length > 0 ? <div className={styled.searches}>
          {
              users.map((item,inx) => {
                  return ( <a key={inx} className={styled.link} href={item.html_url} target="_blank"> 
                    <img className={styled.profileImg} src={item.avatar_url} />
                    <div className={styled.txtInfo}>
                      <p className={styled.name}>{item.login}</p>
                      <p className={styled.url}>{item.html_url}</p>
                    </div>
                  </a>)
              })
          }
          </div> : ""
      }

      {
        focus === true && users.length === 0 && username.length > 0 ? <div className={styled.nosearches}>Hmmm...no usernames found</div> : "" 
      }
    </div>
  )
}

export default SearchBar;