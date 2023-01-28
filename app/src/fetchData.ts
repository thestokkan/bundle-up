export type LocationData = {
    locationName: string,
    latitude: number,
    longitude: number,
    timezone: string
}

async function getLocation(locationName: string): Promise<LocationData | null> {
    const locationUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + locationName + "&count=1";
    const locationDataIn = await fetch(locationUrl);
    const data = await locationDataIn.json();

    if (data.results == undefined) {
        return null;
    }

    return {
        locationName: data.results[0].name,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        timezone: data.results[0].timezone
    };
}

export async function getWeatherDataAndClothesCombo(locationData: LocationData | null) {
    if (locationData && locationData.latitude < 0) {
        locationData = await getLocation(locationData.locationName);
    }

    if (locationData == null
        || !locationData.locationName
        || !locationData.latitude
        || !locationData.longitude
        || !locationData.timezone) return null;

    console.log(locationData.locationName);
    console.log(locationData.latitude);
    console.log(locationData.longitude);
    console.log(locationData.timezone);

    const weatherUrl = "/weatherandcombo?latitude=" + locationData.latitude
        + "&longitude=" + locationData.longitude + "&timezone=" + locationData.timezone;

    const weatherDataIn = await fetch(weatherUrl);
    return await weatherDataIn.json();
}

export async function getDetailedWeatherData(locationData: LocationData | null) {
    if (locationData && locationData.latitude < 0) {
        locationData = await getLocation(locationData.locationName);
    }

    if (locationData == null) return null

    const weatherUrl = "/detailedweather?latitude=" + locationData.latitude
        + "&longitude=" + locationData.longitude + "&timezone=" + locationData.timezone;


    const weatherDataIn = await fetch(weatherUrl);
    return await weatherDataIn.json();
}