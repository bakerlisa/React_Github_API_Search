// auth: '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'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Octokit, App } from "octokit";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styled from './modules/SearchBar.module.scss'

const SearchBar = () => {
  const [username,setUsername] = useState("")
  const [users,setUsers] = useState([])
  const [focus,setFocus] = useState(false)

  const octokit = new Octokit({ 
    auth: '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',
    userAgent: "github_fetch_users/v1.2.3",
    baseUrl: `https://api.github.com/users/${username}/repos` 
  });


  const onChangeHandler = (event) => {
    setUsername(event.target.value);
  } 

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    })
    .then(res => {
      setUsers(res.data);
    })
  }, [username]);


    const handleSubmit = (event) => {
      event.preventDefault();
    }


  return(
    <div className={styled.wrapper}>

      <div className={styled.searchWrap}>
        <input type="text" name="search" placeholder="Search Users" onChange={onChangeHandler} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
      </div>

      <div className={styled.submitWrp}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="submit" className={styled.submit} value="" onClick={handleSubmit}/>
      </div>
      
      { users.length > 0 ? <div className={styled.searches}>
          {
              users.map((item,inx) => {
                  return ( <a className={styled.link} href={item.owner.html_url}> 
                    <img className={styled.profileImg} src={item.owner.avatar_url} />
                    <div className={styled.txtInfo}>
                      <p className={styled.name}>{item.owner.login}</p>
                      <p className={styled.url}>{item.owner.html_url}</p>
                    </div>
                  </a>)
              })
          }
          </div> : ""
      }

        {
          focus === true && users.length === 0 && username.length > 0 ? <div className={styled.searches}>Hmmm...no usernames found by that title</div> : "" 
        }

      
    </div>
  )
}

export default SearchBar;