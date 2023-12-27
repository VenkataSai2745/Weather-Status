
//accessing the button which has class btn
let btn = document.querySelector(".btn");



//adding an event listener for button 
btn.addEventListener("click", async () => {

  //adding try block for rror handling
  try {
    //accessing input value and some other elements form the html file
    const txt = document.querySelector(".locationName");
    const city = txt.value;
      const words =city.split(",");
      console.log(words[0]);  
    const temp = document.querySelector(".temperature");
    const humidity = document.querySelector(".humidity");
    const lon = document.querySelector(".longitude");
    const lat = document.querySelector(".latitude");
    const cityName = document.querySelector(".cityName");
    const sectionTwo = document.querySelector(".section2");
    const overCast = document.querySelector(".overCast");
    const windSpeed = document.querySelector(".windSpeed");

    //my api key 
    const apikey = `0e83ee9867d3bbbce9bd04249f5a4480`;

    //url for api and fetching details from the api link
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(url);
    const result = await response.json();
    const data = result;

    //condition for input value and displaying alert if input alue is null
    if (txt.value === "") {
    // document.querySelector(".section3").style.display = "none";
    // sectionTwo.style.display = "none";
      alert("Enter The Details");
    }

    //condition if input value is not null and changing the values for the html file
    else {
      
      sectionTwo.style.display = "flex";
      document.querySelector(".section3").style.display = "none";
      sectionTwo.style.justifyContent = "space-around";
      let temperature = Math.round(data.main.temp - 273.15);
      cityName.innerHTML = ` ${data.name}, ${data.sys.country} `;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      lon.innerHTML = `Long: ${data.coord.lon} `;
      lat.innerHTML = `Lat:   ${data.coord.lat} `;
      temp.innerHTML = `${temperature} &#8451`;
      overCast.innerHTML = `Overcast: ${data.weather[0].description}`;    
      windSpeed.innerHTML = `Wind Speed: ${Math.round(data.wind.speed*3.6)} km/hr`
      txt.value = "";
     

    }
  }

  //if the user input is not found 
  catch (error) {
    const sectionTwo = document.querySelector(".section2");
    const errorMsg = document.querySelector(".errorMsg"); const txt = document.querySelector(".locationName");
    const city = txt.value;
    txt.value = "";
    sectionTwo.style.display = "none";
    document.querySelector(".section3").style.display = "flex";
    document.querySelector(".section3").style.justifyContent = "center";
    document.querySelector(".section3").style.alignItems = "center";
    errorMsg.innerHTML = `<p>City Name Not Found</p><p> Enter correct Details</p>`;
  }
})