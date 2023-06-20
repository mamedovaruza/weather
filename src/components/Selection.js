import { useState } from 'react'
import { Country, City } from 'country-state-city'
import { Dropdown } from 'semantic-ui-react'
// import WeatherFetch from './WeatherFetch'
import WeatherForecast from './WeatherForecast'
import 'semantic-ui-css/semantic.min.css'

function DropdownSearchSelection() {
	const [selectedCountry, setSelectedCountry] = useState('')
	const [selectedCity, setSelectedCity] = useState('')

	const countries = Country.getAllCountries()
	let cities = City.getCitiesOfCountry(selectedCountry)

	const countryOptions = countries.map((country, index) => ({
		key: index, value: country.isoCode, text: country.name
	}))
	const cityOptions = cities.map((city, index) => ({
		key: index, value: city.name, text: city.name
	}))

	return (
		<div className="container">
			<div className='dropdownContainer'>
				<Dropdown
					placeholder='Select Country'
					fluid
					search
					selection
					value={selectedCountry}
					options={countryOptions}
					onChange={(e, data) => setSelectedCountry(data.value)}>
				</Dropdown>{' '}
				<Dropdown
					placeholder='Select City'
					fluid
					search
					selection
					value={selectedCity}
					options={cityOptions}
					onChange={(e, data) => setSelectedCity(data.value)}>
				</Dropdown>
			</div>
			<div>
				{/* <WeatherFetch selectedCity={selectedCity} /> */}
				<WeatherForecast selectedCity={selectedCity} />
			</div>
		</div>
	)
}


export default DropdownSearchSelection