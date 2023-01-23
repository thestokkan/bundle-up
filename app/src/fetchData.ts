export type LocationData = {
    locationName: string,
    latitude: number,
    longitude: number,
    timezone: string
}

async function getLocation(locationName: String): Promise<LocationData> {
    const locationUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + locationName + "&count=1";
    const locationDataIn = await fetch(locationUrl);
    const data = await locationDataIn.json();

    return {
        locationName: data.results[0].name,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        timezone: data.results[0].timezone
    };
}

export async function getWeatherDataAndClothesCombo(locationName: String) {
    const locationData: LocationData = await getLocation(locationName);
    const timezone = "Europe%2FBerlin";

    const weatherUrl = "/weatherandcombo?latitude=" + locationData.latitude
        + "&longitude=" + locationData.longitude + "&timezone=" + timezone;

    const weatherDataIn = await fetch(weatherUrl);
    return await weatherDataIn.json();
}

export async function getDetailedWeatherData(locationName: String) {
    const locationData: LocationData = await getLocation(locationName);

    const weatherUrl = "/detailedweather?latitude=" + locationData.latitude
        + "&longitude=" + locationData.longitude + "&timezone=" + locationData.timezone;


    const weatherDataIn = await fetch(weatherUrl);
    return await weatherDataIn.json();
}