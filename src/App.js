import React, {useEffect, useState} from 'react'
import Recipe from "./Recipe";
import './App.css'
export default function App() {
  
  const APP_ID = "2d635b6e";
  const API_KEY = "5412feb1ec9ee72f95a62216bd5919c3";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  // Only submit and fetch data after we submit search
  const [query, setQuery] = useState("chicken")

  useEffect(() =>{
    getRecipes();

  }, [query]);

  const getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
    console.log(data.hits);

  }

  // Search empty search to whatever is written in the input
  const updateSearch = e =>{
    setSearch(e.target.value);
    // console.log(search);
  }
  // Get search only when we submit the form
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form" >
        <input classname="search-bar" type="text" id="ss" value={search} onChange={updateSearch}/>
        <button className="search-button"  type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.title}
        title={recipe.recipe.label} calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>  
  )
}
