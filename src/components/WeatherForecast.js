import { useEffect, useState } from 'react';
// import { Dropdown } from "semantic-ui-react";
import axios from 'axios';

function WeatherForecast({ selectedCity }) {
	const [weather, setWeather] = useState(null)
	const [forecast, setForecast] = useState(null)

	const [datas, setDatas] = useState([])

	const [results, setResults] = useState([])

	// const [selectedDate, setSelectedDate] = useState('')

	const apiKey = 'ded12ce4e8b41d9da61a564251df3d52'

	useEffect(() => {
		// Fetch current weather data
		navigator.geolocation.getCurrentPosition(function (position) {
			axios
				.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
				.then(response => {
					setWeather(response.data)
				}).catch(error => {
					console.log('Error fetching current weather data:', error)
				});

			// Fetch 5-day current forecast data
			axios
				.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
				.then(response => {
					setForecast(response.data)
				}).catch(error => {
					console.log('Error fetching forecast data:', error)
				})
		})
	}, [])

	useEffect(() => {
		// Fetch weather data
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${apiKey}`)
			.then(response => {
				setWeather(response.data);
			}).catch(error => {
				console.log('Error fetching current weather data:', error);
			});

		// Fetch 5-day forecast data
		axios
			.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${apiKey}`)
			.then(response => {
				setForecast(response.data)
			}).catch(error => {
				console.log('Error fetching forecast data:', error)
			})
	}, [selectedCity])

	useEffect(() => {
		setDatas(forecast && forecast.list.map((item) => (
			{
				time: new Date(item.dt * 1000).getHours().toString().padStart(2, 'O'),
				day: new Date(item.dt * 1000).getDate().toString().padStart(2, 'O'),
				dayName: new Date(item.dt * 1000).toLocaleDateString("en", { weekday: "long" }),
				monthName: new Date(item.dt * 1000).toLocaleString("default", { month: "long" }),
				mainTemp: Math.floor(item.main.temp) + ' °C',
				feelsLike: Math.floor(item.main.feels_like) + ' °C',
				tempMax: Math.floor(item.main.temp_max) + ' °C',
				tempMin: Math.floor(item.main.temp_min) + ' °C',
				description: item.weather[0].description,
				humidity: item.main.humidity,
				windSpeed: item.wind.speed,
				iconId: item.weather[0].icon
			}
		)))
	}, [forecast])

	useEffect(() => {
		setResults(datas && datas.reduce((acc, obj) => {
			const key = obj['dayName']
			!acc[key] ? (acc[key] = []) : acc[key].push(obj)
			return acc
		}, []))
	}, [datas])

	// const dateOptions = (Object.values(results)).map((result, index) => ({
	// 	key: index,
	// 	value: result[0].dayName,
	// 	text: `${result[0].dayName} (${result[0].monthName} ${result[0].day})`
	// }))

	// const dateOptions = results.map((result) => (
	// 	{
	// 		value: result.dayName,
	// 		text: `${result.dayName} (${result.monthName} ${result.day})`
	// 	}
	// ))

	return (
		<div className='weatherFetchContainer'>
			{/* Render the current weather data */}
			{/* {console.log(weather)} */}
			{weather && (
				<div>
					<div className="headerCard">
						<p className="cityName">{weather.name}</p>
						<div className="feelsLike">
							<span>Feels like</span>
							<p>{Math.floor(weather.main.feels_like) + ' °C'}</p>
						</div>
					</div>

					<div className="mainCard">
						<div>
							<p className="mainCardTemp">{Math.floor(weather.main.temp) + ' °C'}</p>
						</div>
						<div className="tempMaxMin">
							<p className="description">{weather.weather[0].description}</p>
							<p>Max:  {Math.floor(weather.main.temp_max) + ' °C'}</p>
							<p>Min: {Math.floor(weather.main.temp_min) + ' °C'}</p>
						</div>
					</div>

					<div className="iconContainer">
						<img alt="icons" src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
					</div>

					<div className="footerCard">
						<div>
							<p>{weather.main.humidity + ' %'}</p>
							<span>Humidity</span>
						</div>
						<div>
							<p>{weather.wind.speed + ' km/h'}</p>
							<span>Wind Speed</span>
						</div>
					</div>
				</div>
			)}


			{console.log(forecast)}
			{forecast && (
				<div className="currentWeatherForecastContainer">
					<div className="currentResultForecastContainer">
						{forecast.list.map((item, index) => (
							<div className="currentForecast" key={index}>
								<div>{new Date(item.dt * 1000).getDate().toString().padStart(2, 'O')} {new Date(item.dt * 1000).toLocaleString("default", { month: "long" })}</div>
								<div>{new Date(item.dt * 1000).getHours().toString().padStart(2, 'O')}:{new Date(item.dt * 1000).getMinutes().toString().padStart(2, 'O')}</div>
								<div>{new Date(item.dt * 1000).toLocaleDateString("en", { weekday: "long" })}</div>
								<div className="forecastIconContainer">
									<img alt="icons" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
								</div>
								<div>
									<div>{item.weather[0].description}</div>
									<div>{Math.floor(item.main.temp) + ' °C'}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherForecast