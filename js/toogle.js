
var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    cKey: 'YmFIRDRlcUlVcXJYN3BZaDAySXI4UDRzWThpeThaVld3S01ZRTRRSQ==',
    //implement the api using node js with database from
    //https://github.com/dr5hn/countries-states-cities-database
}

var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')

    countrySelect.disabled = false;
    countrySelect.style.pointerEvents = 'auto';

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
    const selectedCountryCode = countrySelect.value

    stateSelect.innerHTML = '<option value="">Seleccionar estado</option>'; //limpiar los estados
    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(response => response.json())
    .then(data => {
        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2;
            option.textContent = state.name;
            stateSelect.appendChild(option);;
        })
    })
    .catch(error => console.error('Error cargando los estados', error))
}


function loadCities(){
    stateSelect.disabled = false;
    citySelect.disabled = false;
    stateSelect.style.pointerEvents = 'auto';
    citySelect.style.pointerEvents = 'auto';
    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;
    citySelect.innerHTML = '<option value ="">Seleccionar Ciudad</option>';
    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.cKey}})
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2;
            option.textContent = city.name;
            citySelect.appendChild(option);
        })
    })
}






function toggleSelect() {
    var allCountryCheckbox = document.getElementById('all-country');
    const countrySelect = document.querySelector('.country');
    const stateSelect = document.querySelector('.state');
    const citySelect = document.querySelector('.city');

    if (allCountryCheckbox.checked) {
        countrySelect.disabled = true;
        stateSelect.disabled = true;
        citySelect.disabled = true;
        countrySelect.innerHTML = '<option selected>Seleccionar Pais</option>'; 
        stateSelect.innerHTML = '<option selected>Seleccionar Estado</option>'; 
        citySelect.innerHTML = '<option selected>Seleccionar Ciudad</option>'; 
    } else {
        console.log("waos");
        countrySelect.disabled = false;
        loadCountries();

    }
}

function fillBoxes() {
    console.log("fillLocation!!!");
    const my_cityName = citySelect.options[citySelect.selectedIndex].textContent;
    const my_stateName = stateSelect.options[stateSelect.selectedIndex].textContent;
    const my_countryName = countrySelect.options[countrySelect.selectedIndex].textContent;

    const selectedCountryCode = countrySelect.value;
    const selectedStateCode = stateSelect.value;

    var fcountry = document.getElementById('fcountry');
    var fstate= document.getElementById('fstate');
    var fcity = document.getElementById('fcity');

    fcountry.value = my_countryName;
    fstate.value = my_stateName;
    fcity.value = my_cityName;
    
}
window.onload = loadCountries;