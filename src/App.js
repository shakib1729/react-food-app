import React, { Component } from 'react';
import Recipe from './components/Recipe';
import Result from './components/Result';
import MyMeal from './components/MyMeal';
import Favourite from './components/Favourite';
import { Route, BrowserRouter, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './styles/searchForm.css';



class App extends Component {

constructor(){
  super();
  this.state = {
    query: 'chocolate',  // stores the input of user when 'Search' button is clicked
    calorieCounter: 0,  // stores the count of 'Calories' of food items which are added to 'myMeals'
    recipes: [],  // stores search result from APi
    myMeals: [],  // stores recipes which the user adds to 'My Meal'
    favourites:[]  // stores recipes which the user adds to 'Favourite'
  };
   this.text="";  // stores what is being typed in the search box
}

 APP_ID = "8d509d1c";
 APP_KEY = "ec1b866fdcc1327e06dff4b6a54a9ab3";
 
 getRecipes = async() => {  // gets Recipe from API when user clicks on 'Search'
    const response = await fetch( 
      `https://api.edamam.com/search?q=${this.state.query}&app_id=${this.APP_ID}&app_key=${this.APP_KEY}`
      );
    const data = await response.json();
    this.setState({recipes: data.hits});
};

componentDidMount(){
  this.getRecipes();
  // Load data from local storage
  const meals = JSON.parse(localStorage.getItem('myMeals')); 
  const calories = JSON.parse(localStorage.getItem('calorieCounter'));
  if(meals)
    this.setState({myMeals: meals, calorieCounter: calories}); 
  const fav = JSON.parse(localStorage.getItem('favourites'));
  if(fav)
    this.setState({favourites: fav});
}
 
  updateSearch = (e) => {
    this.text = e.target.value;
  };

  getSearch = (e) => {
    e.preventDefault();  // to prevent reloading each time
    // when user clicks on 'Search' save the input value to 'query' and make API call using 'query'
   this.setState({query: this.text}, this.getRecipes);  // setState() is asynchronous , so callback function is also used here
  };

  updateMeals = (e) => {
    e.preventDefault();
    const id = window.location.pathname.match(/\d+/)[0]; // get recipe id from current URL
    const tempMeals = [...this.state.myMeals, this.state.recipes[id]]; // add to 'MyMeals' the recipe[id]
    let calories = this.state.calorieCounter + Math.round(this.state.recipes[id].recipe.calories);
    // change state and make changes to localstorage
    this.setState({myMeals: tempMeals}, () => {   
                                                  localStorage.setItem('myMeals', JSON.stringify(tempMeals));
                                                  this.setState({calorieCounter: calories}, () => {localStorage.setItem('calorieCounter', JSON.stringify(calories))});   
                                              });
    
  }

  removeMeal = (e, id) => {
    e.preventDefault();
    let tempMeals = this.state.myMeals;
    let calories = this.state.calorieCounter - Math.round(tempMeals[id].recipe.calories);
    tempMeals.splice(id, 1);
    this.setState({myMeals: tempMeals}, () => {   
                                                  localStorage.setItem('myMeals', JSON.stringify(tempMeals));
                                                  this.setState({calorieCounter: calories}, () => {localStorage.setItem('calorieCounter', JSON.stringify(calories))});   
                                              });
  }

  updateFavourites = (e) => {
    e.preventDefault();
    const id = window.location.pathname.match(/\d+/)[0];
    const tempfavourites = [...this.state.favourites, this.state.recipes[id]];
    this.setState({favourites: tempfavourites}, localStorage.setItem('favourites', JSON.stringify(tempfavourites)));
    
  }

   removeFavourite = (e, id) => {
    e.preventDefault();
    const tempfavourites = this.state.favourites;
    tempfavourites.splice(id, 1);
     this.setState({favourites: tempfavourites}, localStorage.setItem('favourites', JSON.stringify(tempfavourites)));
  }


render(){

  
  return(
    <BrowserRouter>
     <div className="App">

         <header id="header">
         <form onSubmit = {this.getSearch} className="search-form">
           <input type="text" 
              className="search-bar" 
              onChange = {this.updateSearch}
              placeholder = "Search Recipes"
            />
           <button type="submit" className="search-button">Search</button>
          </form>
         </header>


        <main id="main">

         <section id="content">
           <div>
           <Route path="/recipe/:query/:id(\d+)" 
            render = { (props) =>{
              const id = props.location.pathname.match(/\d+/)[0];
              return(
                <Recipe {...props} id = {id} recipe = {this.state.recipes[id]} updateMeals = {this.updateMeals} updateFavourites = {this.updateFavourites} showButtons = {true}  />
              )
            }} 
           />
           <Route path="/mymeal/:id(\d+)" 
            render = { (props) =>{
              const id = props.location.pathname.match(/\d+/)[0];
              return(
                <Recipe {...props} id = {id} recipe = {this.state.myMeals[id]} updateMeals = {this.updateMeals} updateFavourites = {this.updateFavourites} showButtons = {false} />
              )
            }} 
            />
            <Route path="/favourite/:id(\d+)" 
            render = { (props) =>{
              const id = props.location.pathname.match(/\d+/)[0];
              return(
                <Recipe {...props} id = {id} recipe = {this.state.favourites[id]} updateMeals = {this.updateMeals}  updateFavourites = {this.updateFavourites} showButtons = {false} />
              )
            }} 
            />
         </div>
         </section>

           <section id="secondary">
            <ul>
              {this.state.recipes.map((recipe,idx) => (
                <Link to={`/recipe/${this.state.query}/${idx}`} className="link">
                 <Result recipe = {recipe.recipe} />
               </Link>
             ))}
            </ul>
           </section>

         <section id="tertiary">  
             <h2>My Meal</h2>
                <MyMeal meals = {this.state.myMeals} totalCalories = {this.state.calorieCounter} removeMeal = {this.removeMeal}/> 
             <br/>
             <h2>Favourites</h2>
                <Favourite meals = {this.state.favourites} removeFavourite = {this.removeFavourite}/> 
       </section>

     </main>

    <footer id="footer">
      <p >Developed by <a className="results-name" href="https://github.com/shakib1729/" target="_blank">Shakib Ahmed </a> </p>
    </footer>
    
    </div>
  </BrowserRouter>
    
  );
 }
}
export default App;