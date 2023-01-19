export type LocationData = {
    locationName: string,
    latitude: number,
    longitude: number,
    timezone: string
}

async function getLocation(): Promise<LocationData> {
    const locationUrl = "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1";
    const locationDataIn = await fetch(locationUrl);
    const data = await locationDataIn.json();

    const locationName: string = data.results[0].name;
    const latitude: number = data.results[0].latitude;
    const longitude: number = data.results[0].longitude;
    const timezone: string = data.results[0].timezone;

    const locationData = {
        locationName: locationName,
        latitude: latitude,
        longitude: longitude,
        timezone: timezone
    };

    return locationData;
}


export async function getWeatherData() {
    const locationData: LocationData = await getLocation();
    const weatherUrl = "http://localhost:8080/weather?latitude=" + locationData.latitude
        + "&longitude=" + locationData.longitude + "&timezone=Europe%2FBerlin";

    const weatherDataIn = await fetch(weatherUrl);
    const data = await weatherDataIn.json();

    console.log(data);

    return data;
}