
export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  
    // console.log("options")
    // console.log(options)
    // console.log("before fetching")
    // console.log(url)

    const res = await fetch(url, options);
    console.log("res: ")
    console.log(res)
    const resJson = res.json()
    console.log("resJson: ")
    console.log(resJson)
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return resJson;
    // if (res.ok) return res.json();
    throw new Error('Bad Request');
  }
  
