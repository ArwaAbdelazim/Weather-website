particlesJS.load('particles-js', './particles.json', function() {
    console.log('callback - particles.js config loaded');
  });
let finalResult;
async function getWeather(city, numOfDays)
{
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71b9135f94f74745b02195417221901&q=${city}&days=${numOfDays}`);
    finalResult = await apiResponse.json();
}

( async function()
{
    await getWeather(`cairo`, 3);
    displayWeather();
}

)();

function displayWeather()
{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    const d = new Date();
    let dayNumber = d.getDate();
    let month = months[d.getMonth()];
    let dayName = days[d.getDay()-1];
    let nextDayName = days[d.getDay()];
    let thirdDayName = days[d.getDay()+1];

    let x = ``;
    x += `
        <p>${dayName}</p>
        <p>${dayNumber} ${month}</p>`;

    document.getElementById("day&date").innerHTML = x;

    document.getElementById("city1").innerHTML = finalResult.location.name;

    let y = ``;
    y += `
            <div class="fs-1">
            ${finalResult.current.temp_c}
             <sup>o</sup>C
            </div>`;

    document.getElementById("temp1").innerHTML = y;
    
    let imgsrc = finalResult.current.condition.icon;
    document.getElementById("img1").setAttribute('src',`https:${imgsrc}`);

    document.getElementById("condition1").innerHTML = finalResult.current.condition.text;

    

    document.getElementById("umberella").innerHTML = `${finalResult.current.cloud}%`;
    document.getElementById("wind").innerHTML = `${finalResult.current.wind_kph}km/h`;
    document.getElementById("compass").innerHTML = finalResult.current.wind_dir;

    ///////////////////////////////////////////////////////////////////////////////////////
    document.getElementById("nextDay").innerHTML = nextDayName;
    document.getElementById("thirdDay").innerHTML = thirdDayName;

    let imgsrc2 = finalResult.forecast.forecastday[1].day.condition.icon;
    document.getElementById("img2").setAttribute('src',`https:${imgsrc2}`);


    let z = ``;
    z += `
            <div class="fs-1">
            ${finalResult.forecast.forecastday[1].day.maxtemp_c}
             <sup>o</sup>C
            </div>`;

    document.getElementById("temp2").innerHTML = z;

    let s = ``;
    s += `
            <div class="fs-4">
            ${finalResult.forecast.forecastday[1].day.mintemp_c}
             <sup>o</sup>C
            </div>`;

    document.getElementById("temp2min").innerHTML = s;


    document.getElementById("condition2").innerHTML = finalResult.forecast.forecastday[1].day.condition.text;

    ///////////////////////////////////////////////////////////////////////////////////////

    let imgsrc3 = finalResult.forecast.forecastday[2].day.condition.icon;
    document.getElementById("img3").setAttribute('src',`https:${imgsrc3}`);


    let n = ``;
    n += `
            <div class="fs-1">
            ${finalResult.forecast.forecastday[2].day.maxtemp_c}
             <sup>o</sup>C
            </div>`;

    document.getElementById("temp3").innerHTML = n;

    let m = ``;
    m += `
            <div class="fs-4">
            ${finalResult.forecast.forecastday[2].day.mintemp_c}
             <sup>o</sup>C
            </div>`;

    document.getElementById("temp3min").innerHTML = m;


    document.getElementById("condition3").innerHTML = finalResult.forecast.forecastday[2].day.condition.text;

}

async function searchByCityName(cityName)
{
    await getWeather(cityName, 3);
    displayWeather();
}

$('body').on( "keyup", "#findLocation", function( e ) {
    if ( $("#findLocation").val().length >= 3 ) 
    {
        searchByCityName($(this).val());
    }
    else
    {
        ( async function()
            {
                await getWeather(`cairo`, 3);
                displayWeather();
            }

        )();
    }
    
});