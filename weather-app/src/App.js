import React, { Component } from 'react';

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "d3715170a4de4f1044f6aaec1b31582c";

class App extends React.Component {
    state = {
        temper: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
    }
    getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

        const data = await api_call.json();
        console.log(data);

        if (city && country) {
            this.setState({
                temper: data.main.temp_max,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
            });
        }else{
            this.setState({
                temper: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter a country/city",
            });
        }
    }
    render(){
        return(
          <div>
            <Titles />
            <Form getWeather={this.getWeather}/>
            <Weather temperature={this.state.temper}
                     city={this.state.city}
                     country={this.state.country}
                     humidity={this.state.humidity}
                     description={this.state.description}
                     error={this.state.error}/>
          </div>
        );
    }
}

export default App;