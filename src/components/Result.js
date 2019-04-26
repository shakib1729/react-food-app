import React, { Component } from 'react';
import '../styles/result.css';

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

class Result extends Component {

  render(){
    const {recipe} = this.props;

     return(
        <div className="result1">
           <li>
                        <img className="results-img" src={recipe.image} alt="{recipe.label}" />
                       
                            <h4 className="results-name">{limitRecipeTitle(recipe.label)}</h4>
                            <p className="results-name">Calories :{Math.round(recipe.calories)} kcal</p>
                       
                
           </li> 
        </div>
    )
  }
   
}

export default Result;