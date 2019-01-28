import React, { Component } from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "d3715170a4de4f1044f6aaec1b31582c";

class App extends React.Component {
    getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

        const data = await api_call.json();
        console.log(data);
    }
    render(){
        return(
          <div>
            <Titles />
            <Form getWeather={this.getWeather}/>
            <Weather />
          </div>
        );
    }
}

export default App;