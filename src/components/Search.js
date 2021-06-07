import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react'
import '../App.css';

function Search() {
  const [result, setResult] = useState("")
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    fetch("https://api.github.com/users/xavierloos/repos")
      .then(res => res.json())
      .then(data => {
        const languages = data.map(language => (
          language.language
        ))
        favLanguage(languages)
      });
  }, [])

  const setData = result => {
    setResult(result)
  }

  const favLanguage = lang => {
    var countLang = {}, counter = 0, favorite = [];
    lang.forEach(item => {
      (!countLang[item]) ? countLang[item] = 1 : countLang[item]++;
      if (countLang[item] > counter) {
        counter = countLang[item];
        favorite = [item];
      } else if (countLang[item] === counter) {
        favorite.push(item);
      }
    });
    setData(favorite)
  }

  const handleSearch = e => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${searchInput}/repos`)
      .then(res => res.json())
      .then(data => {
        const languages = data.map(language => (
          language.language
        ))
        favLanguage(languages)
      });
  }

  return (
    <div className="search-container">
      <div className="container-fluid search ">
        <div className="container ">
          <div className="row row-header ">
            <div className="col-12 col-sm-12 mx-auto align-content-center ">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Input placeholder="Search for a github username" name="username" onChange={handleSearch} />
                  <Form.Button content="Search" />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row row-header">
          <div className="col-12 col-sm-12 mx-auto align-content-center">
            <div>
              {result}
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}


export default Search;