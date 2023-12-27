const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};




const fetchLocationData = async (locationName) => {
  try {
    const response = await fetch(`https://us1.locationiq.com/v1/search?key=pk.49ad2364bb90d278bfe4a789de9e2922&q=${locationName}&format=json`);
    const results = await response.json();

    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';

    if (!Array.isArray(results) || (results.length === 0 && locationName === "")) {
      suggestionsList.style.display = 'none';
    } 
    else {
      (Array.isArray(results) ? results : [results]).slice(0, 5).forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result.display_name;
      

        listItem.addEventListener('click', () => {
          const words = result.display_name.split(",");
          document.getElementById('cityInput').value = words;
          suggestionsList.innerHTML = '';
        });

        suggestionsList.appendChild(listItem);
      });

      suggestionsList.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
};




const cityInput = document.getElementById('cityInput');
const suggestionsList = document.getElementById('suggestionsList');

cityInput.addEventListener('input', debounce(event => {
  const locationName = event.target.value.trim();
  if (locationName.length > 0) {
    fetchLocationData(locationName);
  } else {
    suggestionsList.style.display = 'none';
  }
}, 10));
