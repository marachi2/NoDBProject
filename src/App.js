import React, { Component } from 'react';
import logo from './chef_icon.jpg';
import './reset.css';
import './App.css';
import './Main.js';
import { lookUp } from './Main.js';
import vegan from './img/richard_simmons.jpg';
import axios from 'axios'
import { Link } from 'react-router-dom'


class App extends Component {
  constructor(){
    super();
    this.state = {
      listofFood:[],
      search: '',
      richard: false 
    }
    this.updateSearchBox = this.updateSearchBox.bind(this)
    this.getFood = this.getFood.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }
  getFood(event)  {
    event.preventDefault()
    if(this.state.search.toLowerCase().includes('vegan')){
      this.setState({
        richard: true
      })

    } else {

    lookUp(this.state.search).then((response) => {
      this.setState({
        listofFood: response.data.recipes,
        search: '', 
        richard: false
      })
      console.log(this.state.listofFood)
    })
      }
  }
  updateSearchBox(event) {
    this.setState ({search: event.target.value})
  }
  addRecipe(title, publisher, url, image, id){
    axios.post("http://localhost:3030/api/recipes", {title: title, publisher: publisher, url: url, image: image, id: id})
    

}
  
  
  


  render() {
    const list = this.state.listofFood.map((food, i) =>{
        return(
          <div className= 'recipeCard' key={i}>
              <div className= 'RecipeTitleArea'>
                  <h1 className= 'RecipeTitle'>{food.title}</h1>
                  <p> by {food.publisher}</p>
              </div>
              <div className= 'RecipeLower'> 
                  <div className= 'Content'>
                      <img className='recipeImage' src={food.image_url}/>
                      <p> Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.</p>
                  </div>
                  <a href= {food.source_url} target='_blank'>Original Recipe</a>
                  <button className= 'Add' onClick={(e) => this.addRecipe(food.title, food.publisher, food.source_url, food.image_url, i)}>Save Recipe</button>
              </div>
          </div>
        )
    })
    return (
      <div className="App">
          <div className="App-header">
              <div className="app-header-left">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2>Anyone Can Cook</h2>
              </div>
              <div className="app-header-right">
                <h1 >Search For Recipes By Ingredient(s)</h1>
                <form className= 'SearchForm' onSubmit= { event => this.getFood(event) }>
                    <input className='SearchInput' placeholder= 'Ex: chicken, potato, carrot' value={this.state.search} onChange={this.updateSearchBox}/>
                          
                    <button type="submit" >Search</button>
                </form>
                <Link to= '/savedrecipes'><p>Saved Recipes</p></Link>
              </div>
          </div>
          
          <div className="Background">
                   
              {
                this.state.richard
                ?
                <div className='vegan close'>
                  <h1>I'm sorry this site does not have any vegan recipes!! </h1>
                </div>
                :
                list
              }
          </div>
      </div>
        
        
    )
  }
       
}

export default App
