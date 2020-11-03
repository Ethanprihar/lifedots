import React from "react";

import "./App.css";

import RandomStart from "./models/DotPlacers/RandomStart";
import RandomRain from "./models/FoodPlacers/RandomRain";
import CenterPit from "./models/TrapPlacers/CenterPit";
import Border from "./models/WallPlacers/Border";
import World from "./models/World";

import MainMenu from "./views/MainMenu";
import About from "./views/About";

const default_style = 
{
  width: '100vw',
  height: '100vh',
  color: '#b3b3b3',
  backgroundColor: '#000000',
  margin: 0,
  padding: 0,
  marginLeft  : 'auto',
  marginRight : 'auto',
}

export default class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      page: <MainMenu setPage={this.setPage} />
    }
  }
  
  
  world_test()
  {
    console.log('World Test')
    let dot_num = 20;
    let min_ally_min = 0;
    let max_ally_min = 100;
    let min_ally_max = 0;
    let max_ally_max = 100;
    let min_team_num = 0;
    let max_team_num = 10;
    let min_max_size = 10;
    let max_max_size = 100;
    let min_baby_frac = 0.1;
    let max_baby_frac = 0.9;
    let min_eat_ratio = 0;
    let max_eat_ratio = 1;
    let min_speed = 0;
    let max_speed = 10;
    let min_view = 0;
    let max_view = 2;
    let min_max_mut_pct = 0.01;
    let max_max_mut_pct = 0.1;
    let dot_placer = new RandomStart(dot_num, 
                                    min_ally_min, max_ally_min, 
                                    min_ally_max, max_ally_max, 
                                    min_team_num, max_team_num, 
                                    min_max_size, max_max_size, 
                                    min_baby_frac, max_baby_frac, 
                                    min_eat_ratio, max_eat_ratio, 
                                    min_speed, max_speed, 
                                    min_view, max_view, 
                                    min_max_mut_pct, max_max_mut_pct);
    let food_placer = new RandomRain(1, 50, 100);
    let trap_placer = new CenterPit(0, 0);
    let wall_placer = new Border(1);
    let start_time = new Date().getTime();
    let world = new World(10, 12, dot_placer, food_placer, trap_placer, wall_placer);
    let end_time = new Date().getTime();
    console.log(end_time - start_time);
    start_time = new Date().getTime();
    for (let i = 0; i < 100; i++)
    {
      world.update();
    }
    end_time = new Date().getTime();
    console.log(end_time - start_time);
    console.log(world);
  }

  setPage = (page) => 
  {
    switch(page)
    {
      case "MainMenu":
        this.setState({page: <MainMenu setPage={this.setPage} />});
      break;
      case "About":
        this.setState({page: <About setPage={this.setPage} />});
      break;
      default:
        alert("HOW DID YOU GET HERE");
    }
  }

  componentDidMount()
  {
    this.world_test();
  }
  
  render()
  {
    return (
      <div style={default_style}>
        {this.state.page}
      </div>
    );
  }
}