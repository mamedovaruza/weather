import { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
// import axios from "axios";

function WeatherFetch({ selectedCity }) {
	// const [list, setList] = useState([])
	// const [results, setResults] = useState([])
	// const [currentResults, setCurrentResults] = useState([])
	// const [datas, setDatas] = useState([])
	// const [currentDatas, setCurrentDatas] = useState([])

	const [cityName, setCityName] = useState('')
	const [mainTemp, setMainTemp] = useState('')
	const [feels_like, setFeelsLike] = useState('');
	const [description, setDescription] = useState('');
	const [humidity, setHumidity] = useState('')
	const [temp_max, setTempMax] = useState('')
	const [temp_min, setTempMin] = useState('')
	const [iconID, setIconID] = useState('');
	const [windSpeed, setWindSpeed] = useState('')
	const apiKey = 'ded12ce4e8b41d9da61a564251df3d52'
	// const [selectedDate, setSelectedDate] = useState('')

	useEffect(() => {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${apiKey}`)
			.then(res => res.json())
			.then(results => {
				setCityName(results.name)
				setMainTemp(Math.floor(results.main.temp) + ' °C');
				setFeelsLike(Math.floor(results.main.feels_like) + ' °C');
				setDescription(results.weather[0].description);
				setHumidity(results.main.humidity)
				setTempMax(Math.floor(results.main.temp_max) + ' °C');
				setTempMin(Math.floor(results.main.temp_min) + ' °C');
				setWindSpeed(results.wind.speed)
				setIconID(results.weather[0].icon);
			}).catch(error => {
				// useEffect throws, but this will never be called
			})

		// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=7b3277b0a44a97e483109e34d50dd0a1`)
		// 	.then(res => res.json())
		// 	.then(results => {
		// 		setList(results.list)
		// 		setDatas(results.list.map((data) => ({
		// 			day: (new Date(data.dt * 1000)).getDate().toString().padStart(2, 'O'),
		// 			time: (new Date(data.dt * 1000)).getHours().toString().padStart(2, 'O') + ':' + (new Date(data.dt * 1000)).getMinutes().toString().padStart(2, 'O'),
		// 			dayName: (new Date(data.dt * 1000)).toLocaleDateString("en", { weekday: "long" }),
		// 			monthName: (new Date(data.dt * 1000)).toLocaleString('default', { month: 'long' }),
		// 			mainTemp: Math.floor(data.main.temp) + ' °C',
		// 			feelsLike: Math.floor(data.main.feels_like) + ' °C',
		// 			tempMax: Math.floor(data.main.temp_max) + ' °C',
		// 			tempMin: Math.floor(data.main.temp_min) + ' °C',
		// 			description: data.weather[0].description,
		// 			humidity: data.main.humidity,
		// 			windSpeed: data.wind.speed,
		// 			iconId: data.weather[0].icon
		// 		})))
		// 		setResults(datas.reduce((acc, obj) => {
		// 			const key = obj['dayName']
		// 			!acc[key] ? (acc[key] = []) : acc[key].push(obj)
		// 			return acc
		// 		}, {}))
		// 	})
	}, [selectedCity])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {

			fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
				.then(loc => loc.json())
				.then(locations => {
					setCityName(locations.name)
					setFeelsLike(Math.floor(locations.main.feels_like) + ' °C');
					setMainTemp(Math.floor(locations.main.temp) + ' °C');
					setDescription(locations.weather[0].description);
					setHumidity(locations.main.humidity)
					setTempMax(Math.floor(locations.main.temp_max) + ' °C');
					setTempMin(Math.floor(locations.main.min) + ' °C');
					setWindSpeed(locations.wind.speed)
					setIconID(locations.weather[0].icon);
				}).catch(error => {
					// useEffect throws, but this will never be called
				})
		})
	}, [])

	// if ()
	// const dateOptions = (Object.values(currentResults)).map((result, index) => {
	// 	return {
	// 		key: index,
	// 		value: result[0].dayName,
	// 		text: `${result[0].dayName} (${result[0].monthName} ${result[0].day})`
	// 	}
	// })

	// const currentDate = currentResults[selectedDate]

	return (
		<div className="weatherFetchContainer">
			<div className="headerCard">
				<p className="cityName">{cityName}</p>
				<div className="feelsLike">
					<span>Feels like</span>
					<p>{feels_like}</p>
				</div>
			</div>

			<div className="mainCard">
				<div>
					<p className="mainCardTemp">{mainTemp}</p>
				</div>
				<div className="tempMaxMin">
					<p className="description">{description}</p>
					<p>Max:  {temp_max}</p>
					<p>Min: {temp_min}</p>
				</div>
			</div>

			<div className="iconContainer">
				<img alt="icons" src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} />
			</div>

			<div className="footerCard">
				<div>
					<p>{humidity + ' %'}</p>
					<span>Humidity</span>
				</div>
				<div>
					<p>{windSpeed + ' km/h'}</p>
					<span>Wind Speed</span>
				</div>
			</div>

			<div className="weatherForecastContainer">
				<div>
					<Dropdown
						placeholder='Select Date'
						fluid
						search
						selection
						value={selectedDate}
						options={dateOptions}
						onChange={(e, data) => setSelectedDate(data.value)}>
					</Dropdown>
				</div>
				<div className="currentWeatherForecastContainer">
					<div>{selectedDate}</div>
					<div className="currentResultForecastContainer">
						{currentDate.map((data) => {
							return (
								<div className="currentForecast">
									<div>{data.time}</div>
									<div className="forecastIconContainer">
										<img alt="icons" src={`http://openweathermap.org/img/wn/${data.iconId}@2x.png`} />
									</div>
									<div>
										<div>{data.description}</div>
										<div>{data.mainTemp}</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
//Friday[6].time
export default WeatherFetch;