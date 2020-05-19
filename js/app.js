import {$} from './utils.js';
import {countriesAndTopCities, searchCity} from './functions.js';

$('#select-cities').addEventListener('click', countriesAndTopCities)
$('#select-cities').addEventListener('input', searchCity)