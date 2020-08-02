const API_URL = "http://localhost:1337"

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/routes/logs`)
    return response.json()
}

export async function createLogEntries(entry) {
    const response = await fetch(`${API_URL}/routes/logs`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(entry)
    })
    return response.json()
}