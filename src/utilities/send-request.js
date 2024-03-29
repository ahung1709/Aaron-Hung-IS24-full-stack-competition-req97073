
export default async function sendRequest(url, method = "GET", payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc.
    const options = { method }
    if (payload) {
        options.headers = { "Content-Type": "application/json" }
        options.body = JSON.stringify(payload)
    }
  
    const res = await fetch(url, options);
    if (res.ok) { 
      if (res.status === 200) {
        return res.json() 
      } else {
        return null;
      }
    }
    throw new Error('Bad Request');
  }
  
