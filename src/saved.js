import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from './chef_icon.jpg';

export default class saved extends Component{

constructor(){
    super();
    this.state = {
        savedRecipes: [],
        url: 'http://localhost:3030/api/recipes'
    }
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.sortRecipe = this.sortRecipe.bind(this);

}
componentDidMount(){
    axios.get(this.state.url)
    .then(response => {
        this.setState({
            savedRecipes: response.data
        })
    })
}


deleteRecipe(id) {
    axios.delete(this.state.url + '/' + id)
    .then(response => {
        this.setState({
            savedRecipes: response.data
        })
    })
}

sortRecipe(order){
    axios.get(this.state.url + '/' + order)
    .then(response => {
        this.setState({
            savedRecipes: response.data
        })
    })
}
render(){
    let list = this.state.savedRecipes.map((recipe, i) =>{
        return(
          <div className= 'recipeCard' key={i}>
            <div className= 'RecipeTitleArea'>
            <h1 className= 'RecipeTitle'>{recipe.title}</h1></div>
            <div className= 'RecipeLower'>
             <p> by {recipe.publisher}</p>
             <div className= 'Content'>
            <img className= 'recipeImage' src={recipe.image}/>
            <button className= 'Delete' onClick={(e) => this.deleteRecipe(i) }>Delete</button>
            </div>
            <a href= {recipe.url} target='_blank'>Original Recipe</a></div>
          </div>
        )
    })
return(
    <div className= 'Container'>
          <div className="App-header">
              <div className="app-header-left">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Anyone Can Cook</h2>
              </div>
              <div className="app-header-right">
                 <Link to= '/'>Home</Link>  
    <button className= 'sortAsc' onClick= {(e) => this.sortRecipe('asc') } >Sort Ascending Order</button>
    <button className= 'sortDesc' onClick= {(e) => this.sortRecipe('desc') } >Sort Descending Order</button>
            
              </div>
          </div>
     
    
    {list}



    </div>

)
}

}
