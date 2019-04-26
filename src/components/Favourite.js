import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/favourite.css';

const limitRecipeTitle = (title, limit=30) => { // we want all the recipe titles in a single line
       const newTitle = []; 
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

class Favourite extends Component {
 
 render(){
    const {meals, removeFavourite} = this.props;
    if(meals == undefined)
      return (null);
 return(
        <div>
          <ul className="favourite">
              {meals.map((meal, idx) => (
                    <div>
                      <Link to={`/favourite/${idx}`}  className="link favourite-name ">
                               <li  >
                                {meal != undefined ? limitRecipeTitle(meal.recipe.label) : ''}
                               </li>
                      </Link>
                      <Link  onClick = {(e) => {removeFavourite(e, idx)}}  >
                                (Remove)
                      </Link>
                    </div>
                 ))}
          </ul>
        </div>
  )
 }
}

export default Favourite;