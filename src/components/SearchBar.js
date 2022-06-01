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
    // myAsyncMethod()

  } 

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: `https://api.github.com/users/${username}/repos`,
  //   })
  //   .then(res => {
  //     setUsers(res.data);
  //   })
  // }, [username]);


    const handleSubmit = (event) => {
      event.preventDefault();
    }

    const searchRepo = () => {
      console.log(username)
    }

    const focusHandler = () => {
      setFocus(true)
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

      <div className={styled.searches}>
        {
            users.length > 0 && users.map((item,inx) => {
                return (<div className={styled.item} key={inx}>
                  <img src={item.avatar_url} />
                  <a className={styled.link} href={item.owner.url}>{item.full_name}</a>
                  </div>)
            })
        }

        {
          focus === true && users.length === 0 && username.length > 0 ? <div className={styled.searches}>Hmmm...no usernames found by that title</div> : "" 
        }
         <div className={styled.searches}>Hmmm...no usernames found by that title</div>
      </div>
    </div>
  )
}

export default SearchBar;