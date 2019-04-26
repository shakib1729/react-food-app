import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/recipe.css';


class Recipe extends Component {

  render(){
  const {recipe, id, updateMeals, updateFavourites, showButtons} = this.props;

  if(recipe == undefined)
  	return (null);

 
  const {label, image, calories, ingredients, url} = recipe.recipe;

   return(

       	<div className='recipe'>
    			  <h1>{label}</h1>
    			  <img className='image' src={image} alt=""/>
            <h2 >Ingredients</h2>
      			<ol>
      				{ingredients.map(ingredient => (
      				 <li>{ingredient.text}</li>
      			   ))}
      			</ol>
             <br/>
    			  <p><em>Calories: {Math.round(calories)} kcal</em></p>
             <br/>
    			  <a href={url} className="link" target="_blank">View Instructions to prepare</a>
             <br/>
                {/* when a recipe is opened from My Meals or Favourites section , 
                we don't want to show the buttons to add them again*/}
          			{showButtons ?<div>
          				<Link className="link" onClick = {updateMeals}>
                           Add to My Meal
                  </Link>
                   <br/>
                  <Link className="link" onClick = {updateFavourites}>
                           Add to Favourites
                   </Link> 
          			</div> : ''}

    		</div>
   	)

  }

}

export default Recipe;