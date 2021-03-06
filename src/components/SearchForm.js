import React from 'react'
import { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm, searchTerm } = useGlobalContext();
  const searchValue = useRef('');

  useEffect(() => {
    searchValue.current.focus();
  }, [])

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input onChange={searchCocktail} type="text" id='name' ref={searchValue} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
