import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);
  const fetchDrinks = useCallback(async () => {
    try {
      const res = await fetch(`${url}${searchTerm}`);
      const data = await res.json();
      const { drinks } = data;
      setLoading(false);
      if (drinks) {
        const newCocktails = drinks.map((drink, index) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass };
        })
        setCocktails(newCocktails);
      }
      else {
        setCocktails([]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [searchTerm])

  useEffect(() => {
    setLoading(true)
    fetchDrinks()
  }, [searchTerm, fetchDrinks])

  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm
  }}>{children}</AppContext.Provider>
}
// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
