import React from 'react';
import './App.css';
import cloudy from '../images/cloudy.png';
import humidity from '../images/humidity-unscreen.gif';
import wind from '../images/wind-unscreen.gif';
import max from '../images/max.png';
import sunrise1 from '../images/sunrise-unscreen.gif';
import sunset1 from '../images/sunset-unscreen.gif';
import github from '../images/github-logo.png';
import { useState } from 'react';

const Weather = () => {
    const [text, setText] = useState('salem');
    const [item, setItem] = useState([]);
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');


    const btn = () => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=bf527d6586f2f3bbad1e11c0f5d1206c&units=metric`
        )
            .then((res) => res.json())
            .then((data) => {
                setItem(data)
                setText('')
                let date1 = new Date(data.sys.sunrise * 1000).toString();
                setSunrise(date1.slice(16, 24))
                let date2 = new Date(data.sys.sunset * 1000).toString();
                setSunset(date2.slice(16, 24))
            }
            );
    }
    const keyEvent = (e) => {
        if (e.key == 'Enter') {
            btn()
        }
    }

    return (
        <>
            <div className='container'>
                <div className="nav">
                    <h1><img src={cloudy} alt="Weather Icon" />Weather Drop</h1>
                    <p><a href='https://github.com/ajith-1/React-weather-app'><img src={github} alt='GitHub' /></a></p>
                </div>

                {/* --------------------------------------------Search------------------------------------------------ */}

                <div className="weather">
                    <div className="search">
                        <h2>"A Change In The Weather Is Sufficient To Recreat The World And Ourselves"</h2>
                        <div className="box">
                            <h2>Search Your City </h2>
                            <input
                                type="text"
                                className='name'
                                value={text}
                                placeholder="e.g Bengaluru"
                                onChange={(e) => setText(e.target.value)}
                                onKeyUp={keyEvent}
                            />
                            <button onClick={btn} id="btn">Search</button>
                        </div>
                    </div>

                    {/* -------------------------------------Weather Data------------------------------------------------- */}

                    <div className='showData'>
                        {typeof item.main === 'undefined' ? (<div>
                            <h2 className='helpText' >Welcome Please Enter City Name </h2>
                        </div>) : (<div id="show" className="show">

                            <div id="description">
                                <figure>
                                    <img className="city-icon" src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${item.weather[0].icon}.svg`} alt={item.weather[0].description} />
                                </figure>
                            </div>
                            <div className="temp"><span id="temp">{Math.round(item.main.temp)}</span><span id="deg">&deg; C</span><br /><p>{item.weather[0].description}</p></div>
                            <h3 id="cityName">{item.name},{item.sys.country}</h3>
                            <div className="value"><img className="img1" src={humidity} /> Humidity : <span id="humidity">{item.main.humidity}</span>%</div>
                            <div className="value"><img className="img1" src={wind} /> Wind : <span id="wind">{(Math.ceil(item.wind.speed)) * 3.6} </span>kph</div>
                            <div className="value maxmin"><img className="img1" src={max} /> Max/Min<br /><span id="max">{Math.ceil(item.main.temp_max)} &deg;C</span>/<span id="min">{Math.floor(item.main.temp_min)} &deg;C</span></div>
                            <div className="sunrise">
                                <div className="value "><img className="img1" src={sunrise1} />Sunrise<br />
                                    <span id="sunrise">{sunrise}  </span> AM</div>
                                <div className="value "><img className="img1" src={sunset1} />Sunset <br /><span
                                    id="sunset">{sunset} </span> PM</div>
                            </div>
                        </div>)}
                        {item.cod === '404' ? (<h2 className='helpText'> ? City Not Found</h2>) : (<> </>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
