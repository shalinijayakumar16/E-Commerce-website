const API_KEY = 'cae7d3c7c61f494ea493a30b88936195'
const IP_URL = `https://api.ipgeolocation.io/getip`
const LOC_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=`

function getRealLocation() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

async function fetchJson(url) {
    return await (await fetch(url)).json()
}

async function getSimulatedLocation() {
    const ip = (await fetchJson(IP_URL)).ip
    return (await fetchJson(LOC_URL + ip)).time_zone.name
}

async function detectVPN() {
    const real = getRealLocation()
    const simulated = await getSimulatedLocation()
    return {
        result: real == simulated,
        real,
        simulated
    }
}