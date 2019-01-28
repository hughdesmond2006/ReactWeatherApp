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
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: "",
            });
        }else{
            this.setState({
                temp: undefined,
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
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Titles />
                                </div>
                                <div className="col-xs-6 form-container">
                                    <Form getWeather={this.getWeather} />
                                    <Weather
                                        temp={this.state.temp}
                                        humidity={this.state.humidity}
                                        city={this.state.city}
                                        country={this.state.country}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;