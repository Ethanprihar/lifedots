import React from "react";

import RandomDots from "../models/placers/RandomDots"
import RandomFood from "../models/placers/RandomFood"
import RandomTrap from "../models/placers/RandomTrap"
import RandomWall from "../models/placers/RandomWall"
import World from "../models/World"

const setup_style = 
{
    textAlign: "center",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    overflowX: "hidden"
}

const header_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderBottom: "0.25vh solid #b3b3b3",
    position: "fixed",
    top: "0",
    width: "100%",
    height: "22.8vh",
    overflow: "auto",
}

const title_style = 
{
    fontSize: "10vh",
    marginBottom: "0",
    marginTop: "0",
}

const header_flex_style = 
{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}

const header_button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
}

const form_style = 
{
    position: "center",
    marginTop: "24vh",
    marginBottom: "14vh",
    fontSize: "100px",
}

const subtitle_style = 
{
    fontSize: "5vh",
    marginTop: "1vh",
    marginBottom: "1vh",
}

const description_style = 
{
    fontSize: "20px",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "2%",
    textAlign: "justify",
}

const table_style = 
{
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: "20px",
}

const label_entry = 
{
    textAlign: "right",
}

const input_entry = 
{
    textAlign: "left",
}

const input_style = 
{
    color: '#b3b3b3',
    backgroundColor: "#000000",
    border: "2px solid #b3b3b3",
    borderRadius: "3px",
    width: "10vw"
}

const footer_style = 
{
    color: "#b3b3b3",
    backgroundColor: "#000000",
    borderTop: "0.25vh solid #b3b3b3",
    position: "fixed",
    bottom: "0",
    width: "100%",
    overflow: "auto",
}

const footer_button_style = 
{
    borderRadius: "1vh",
    height: "7vh",
    width: "20vh",
    marginLeft: "1.25vh",
    marginRight: "1.25vh",
    marginTop: "2.5vh",
    marginBottom: "2.5vh",
    color: "#b3b3b3",
    backgroundColor: "#000000",
    fontSize: "4vh",
    border: "0.25vh solid #b3b3b3",
}

export default class SetupView extends React.Component
{   
    constructor(props)
    {
        super(props);
        this.state = 
        {
            cell_size: 15,
            tick_time: 100,
            
            dot_num: 100, 
            min_max_size: 50, 
            max_max_size: 200, 
            min_split_frac: 0, 
            max_split_frac: 1, 
            min_eat_ratio: 0, 
            max_eat_ratio: 1, 
            min_speed: 1, 
            max_speed: 10, 
            min_view: 1, 
            max_view: 1, 
            min_max_mut_pct: 0.01, 
            max_max_mut_pct: 0.1, 
            reset_on_extinction: true,

            funiform: false,
            ticks_between_rain: 10, 
            drops_per_rain: 20, 
            min_drop_size: 1, 
            max_drop_size: 1,
            min_food_per_drop: 10, 
            max_food_per_drop: 100, 
            delta_ticks_between_rain: 0, 
            delta_drops_per_rain: 0, 
            delta_min_drop_size: 0, 
            delta_max_drop_size: 0, 
            delta_min_food_per_drop: 0, 
            delta_max_food_per_drop: 0, 
            phase_length: 0, 
            will_cycle: false,

            tuniform: true, 
            trap_num: 5, 
            min_trap_size: 3, 
            max_trap_size: 3, 
            min_trap_damage: 100, 
            max_trap_damage: 100,

            section_rows: 1, 
            section_cols: 1, 
            density: 0,
        };
        this.change_input = this.change_input.bind(this);
    }

    key_press(event)
    {
        // Do nothing when enter is pressed.
        if (event.which === 13)
        {
            event.preventDefault();
        }
    }

    change_input(event)
    {
        const name = event.target.name;
        let value = event.target.valueAsNumber;
        if (value === undefined)
        {
            this.setState({[name]: event.target.value === "true"});
        }
        else
        {
            this.setState({[name]: value});
            if (name.startsWith("min_") && (this.state["max" + name.substring(3)] < value))
            {
                this.setState({["max" + name.substring(3)]: value});
            }
            if (name.startsWith("max_") && (this.state["min" + name.substring(3)] > value))
            {
                this.setState({["min" + name.substring(3)]: value});
            }
        }
    }
    
    render()
    {
        return (
        <div style={setup_style}>
            <div style={header_style}>
                <span style={title_style}>
                    World Builder
                </span>
                <div style={header_flex_style}>
                    <div>
                        <button style={header_button_style} onClick={this}>
                            Save
                        </button>
                        <button style={header_button_style} onClick={this}>
                            Load
                        </button>
                    </div>
                    <div>
                        <button style={header_button_style} onClick={this}>
                            Import
                        </button>
                        <button style={header_button_style} onClick={this}>
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <form id="config" style={form_style} onChange={this.change_input} onKeyPress={this.key_press} onSubmit={this.submit}>
                <div style={subtitle_style}>
                    World Configuration
                </div>
                <div style={description_style}>
                    The world will occupy the entire browser window when generated. The cell size specifies the 
                    dimensions of each cell in the world. A larger cell size will result in fewer, larger cells. 
                    The tick time of the world determines how fast the cells will update. Higher tick time 
                    will result in less frequent updates.
                </div>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Cell Size (Pixel Width):
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="cell_size" 
                            value={this.state.cell_size} 
                            type="number" min="5" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Tick Time (Milliseconds):
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="tick_time" 
                            value={this.state.tick_time} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </table>
                
                <p style={subtitle_style}>Dot Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Starting Dots:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="dot_num" 
                            value={this.state.dot_num} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Spawn More Dots Upon Extinction:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="reset_on_extinction" 
                            value={this.state.reset_on_extinction}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_max_size" 
                            value={this.state.min_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Dot Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_max_size" 
                            value={this.state.max_max_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Split Fraction:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_split_frac" 
                            value={this.state.min_split_frac} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Split Fraction:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_split_frac" 
                            value={this.state.max_split_frac} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Absorbtion:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_eat_ratio" 
                            value={this.state.min_eat_ratio} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Absorbtion:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_eat_ratio" 
                            value={this.state.max_eat_ratio} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Speed:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_speed" 
                            value={this.state.min_speed} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Speed:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_speed" 
                            value={this.state.max_speed} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_view" 
                            value={this.state.min_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Perception:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_view" 
                            value={this.state.max_view} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_max_mut_pct" 
                            value={this.state.min_max_mut_pct} 
                            type="number" min="0" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Mutation Rate:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_max_mut_pct" 
                            value={this.state.max_max_mut_pct} 
                            type="number"  min="0" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Food Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="funiform" 
                            value={this.state.funiform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                        <td style={label_entry}>
                            Food Distribution Cycle:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="will_cycle" 
                            value={this.state.will_cycle}>
                                <option value={true}>On</option>
                                <option value={false}>Off</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="ticks_between_rain" 
                            value={this.state.ticks_between_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Drops Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="drops_per_rain" 
                            value={this.state.drops_per_rain} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Spawn Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_drop_size" 
                            value={this.state.min_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Spawn Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_drop_size" 
                            value={this.state.max_drop_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_food_per_drop" 
                            value={this.state.min_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Per Spawn:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_food_per_drop" 
                            value={this.state.max_food_per_drop} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Spawns Per Phase:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="phase_length" 
                            value={this.state.phase_length} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Ticks Between Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_ticks_between_rain" 
                            value={this.state.delta_ticks_between_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Drops Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_drops_per_rain" 
                            value={this.state.delta_drops_per_rain} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Spawn Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_min_drop_size" 
                            value={this.state.delta_min_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Spawn Size Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_max_drop_size" 
                            value={this.state.delta_max_drop_size} 
                            type="number" min="-99999" max="99999" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Food Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_min_food_per_drop" 
                            value={this.state.delta_min_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Food Per Spawn Change:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="delta_max_food_per_drop" 
                            value={this.state.delta_max_food_per_drop} 
                            type="number" min="-99999" max="99999" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Trap Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Trap Number:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="trap_num" 
                            value={this.state.trap_num} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Distribution:
                        </td>
                        <td style={input_entry}>
                            <select style={input_style}
                            name="tuniform" 
                            value={this.state.tuniform}>
                                <option value={true}>Uniform</option>
                                <option value={false}>Normal</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_trap_size" 
                            value={this.state.min_trap_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Trap Size:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_trap_size" 
                            value={this.state.max_trap_size} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Minimum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="min_trap_damage" 
                            value={this.state.min_trap_damage} 
                            type="number" min="0" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Maximum Trap Damage:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="max_trap_damage" 
                            value={this.state.max_trap_damage} 
                            type="number" min="0" max="99999" required/>
                        </td>
                    </tr>
                </table>

                <p style={subtitle_style}>Wall Configuration</p>
                <table style={table_style}>
                    <tr>
                        <td style={label_entry}>
                            Wall Density:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="density" 
                            value={this.state.density} 
                            type="number" min="0" max="1" step="0.0001" required/>
                        </td>
                    </tr>
                    <tr>
                        <td style={label_entry}>
                            Partition Rows:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="section_rows" 
                            value={this.state.section_rows} 
                            type="number" min="1" max="99999" required/>
                        </td>
                        <td style={label_entry}>
                            Partition Columns:
                        </td>
                        <td style={input_entry}>
                            <input style={input_style} 
                            name="section_cols" 
                            value={this.state.section_cols} 
                            type="number" min="1" max="99999" required/>
                        </td>
                    </tr>
                </table>
            </form>

            <div style={footer_style}>
                    <div>
                        <button style={footer_button_style} onClick={this}>
                            Menu
                        </button>
                        <button style={footer_button_style} onClick={this}>
                            Start
                        </button>
                    </div>
            </div>
        </div>
        );
    }
}