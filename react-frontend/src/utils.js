//Takes a json of an object and the name of the api call to make
//Returns an object from the response
export const postRequest = async (jsonData, apiCall) => {
  try {
    const response = await fetch(`/${apiCall}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if(!response.ok){
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseObject = await response.json();

    console.log('Server reponse object:', responseObject);

  } catch (error) {
    console.error('Error submitting json:', error.message);
  }
}