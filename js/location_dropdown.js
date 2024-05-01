console.log("running");
//object shorthand -> 
var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    cKey: 'asdasfdaf', //get the key of the api :(
    //implement the api using node js with database from
    //https://github.com/dr5hn/countries-states-cities-database
}

var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')

function loadCountries(){

    let apiEndPoint = config.cUrl;

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name
            countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error en la carga de paises', error));

    stateSelect.disabled = true;
    citySelect.disabled = true;
    stateSelect.style.pointerEvents = 'none';
    citySelect.style.pointerEvents = 'none';

}

function loadStates(){
    stateSelect.disabled = false;
    citySelect.disabled = true;
    stateSelect.style.pointerEvents = 'auto';
    citySelect.style.pointerEvents = 'none';
    const selectedCountryCode = "countrySelect.value"

    stateSelect.innerHTML = '<option value="">Seleccionar estado</option>'; //limpiar los estados
    fetch('${config.cUrl}/${selectedCountryCode}/states', {headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(response => response.json())
    .then(data => {
        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2;
            option.textContent = state.name;
            stateSelect.appendChild(option);;
        })
    })
    .catch(error => console.error('Error cargando los estados'), error)


}

function loadCities(){
    stateSelect.disabled = false;
    citySelect.disabled = false;
    stateSelect.style.pointerEvents = 'auto';
    citySelect.style.pointerEvents = 'auto';
    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;
    citySelect.innerHTML = '<option value ="">Seleccionar Ciudad</option>';
    fetch('${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities', {headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2;
            option.textContent = city.name;
            citySelect.appendChild(option);;
        })
    })
}

function fillLocation() {
    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;
    
    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.cKey}})
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const city = data[i];
                if (selectedCountryCode == city.country_code && selectedStateCode == city.country_code) {
                    var mod1 = document.querySelector('.lat');
                    var mod2 = document.querySelector('.long');
                    
                    mod1.value = city.latitude;
                    mod2.value = city.longitude;
                    break;
                }
            }
        });
}

//For select all locations
var allChecked = document.getElementById('all-country');
allChecked.addEventListener('change', function() {
    if (this.checked) {
        countrySelect.disabled = true;
        stateSelect.disabled = true;
        citySelect.disabled = true;
        countrySelect.style.pointerEvents = 'none';

        stateSelect.style.pointerEvents = 'none';
        citySelect.style.pointerEvents = 'none';

    } else {

        countrySelect.disabled = false;

        countrySelect.style.pointerEvents = 'auto';

    }
});



window.onload = loadCountries;