import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/myMeal.css';

const limitRecipeTitle = (title, limit=30) => { // we want all the recipe titles in a single line
       const newTitle = []; // 
        if(title.length > limit){
             title.split('').reduce((acc, cur) => { // splitting the title into its constituent words
                if(acc + cur.length <= limit){
                    newTitle.push(cur);
                }
                return acc + cur.length; //the value we return will be the new accumulator

             },0);
            //return the result
             return `${newTitle.join('')}...`;   //joins the elements of an array into a string separated by spaces
        }
        return title; 
}

class MyMeal extends Component {
 
 render(){
  const {meals, totalCalories, removeMeal} = this.props;
  if(meals == undefined)
    return (null);
    return(
          <div>
              <ul className="mymeal">
                 {meals.map((meal, idx) => (
                  <div>
                    <Link to={`/mymeal/${idx}`}  className="link meal-name">
                             <li > 
                            {meal != undefined ? limitRecipeTitle(meal.recipe.label) : ''}
                          </li>
                        </Link>
                      <Link  onClick = {(e) => {removeMeal(e, idx)}} >
                              (Remove)
                      </Link>
                  </div> 
                  ))}
             </ul>
          <h3 className="totalCalorie">Total Calories: {totalCalories} kcal</h3>
        </div>
      
      )

 }
 

}



export default MyMeal;