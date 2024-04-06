//Takes a json of an object and the name of the api call to make
//Returns an object from the response
const postRequest = async (json, apiCall) => {
  /*
  try {
    const response = await fetch(`/${apiCall}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if(!response.ok){
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseObject = await response.json();

    console.log('Server reponse object:', responseObject);

    return(responseObject);

  } catch (error) {
    console.error('Error submitting json:', error.message);
  }
  */
 console.log('testig');
}