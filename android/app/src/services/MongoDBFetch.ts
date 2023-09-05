export async function fetchListData(url: string){
    try {
        const response = await fetch(url)
        if (!response.ok) {
            return `Error. HTTP Response Code: ${response?.status}`
        }
        if (response.headers.get("content-type") != "text/html; charset=utf-8") {
            const data = await response.json()
            return data
        }
        else {
            return 'No results'
        }
    }
    catch (error: any) {return `Fetch error: ${error}`}
}

export async function fetchPreviewListData(url: string){
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log('Response not OK: ' + response)
            return `Error. HTTP Response Code: ${response?.status}`
        }
        if (response.headers.get("content-type") != "text/html; charset=utf-8") {
            const data = await response.json()
            console.log('Response ok: ' + data)
            return data}
        else return 'No results'
    }
    catch (error: any) {return `Fetch error: ${error}`}
}

export async function fetchFilmData(url: string){
    try {
        const response = await fetch(url)
        if (!response.ok) {
            return `Error. HTTP Response Code: ${response?.status}`
        }
        else {
            const data = await response.json()
            return data}
    }
    catch (error: any) {return `Fetch error: ${error}`}
    
}

export async function fetchVideo(url: string){
    try {
        const response = await fetch(url)
        if (!response.ok) {
            return `Error. HTTP Response Code: ${response?.status}`
        }
        else {
            const data = await response.json()
            return data
        }
    }
    catch (error: any) {return `Fetch error: ${error}`}
}

export async function addToFavaurites(uid: string | null | undefined, filmid: string){
    const data = {'userid': uid, filmid: filmid}
    try {
    await fetch('http://10.0.2.2:3000/users.favaurites', {
        method: "POST", 
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify(data)}).
    then(response => console.log(response))
    }
    catch (error: any) {console.log(error); return `Fetch error: ${error}`}

}

export async function removeFromFavaurites(uid: string | null | undefined, filmid: string){
    // let data = 'data'
    const data = {'userid': uid, 'filmid': filmid}
    try {
    await fetch('http://10.0.2.2:3000/users.favaurites', {
        method: "DELETE", 
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify(data)})
    .then(response => console.log(response))
    }
    catch (error: any) {console.log(error); return `Fetch error: ${error}`}
}

export async function addUserMongoDB(userid: string){
    const data = {'userid': userid, 'favauritefilms': new Array()}
    console.log(data)
    try {
    await fetch('http://10.0.2.2:3000/users', {
        method: "POST", 
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify(data)}).
        then(response => console.log(response))
    }
    catch (error: any) {console.log(error); return `Fetch error: ${error}`}
}

export async function fetchFavauriteFilms(uid: string | null | undefined){
    try {
        const response = await fetch('http://10.0.2.2:3000/users.favaurites/' + uid)
        const data = await response.json()
        console.log(data)
        return data
    }
    catch (error: any) {console.log(error); return `Fetch error: ${error}`}

}
