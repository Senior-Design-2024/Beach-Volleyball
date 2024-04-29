//Takes an object and the name of the api call to make
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

    const responseJson = await response.json();

    console.log('Server reponse json:', responseJson);

  } catch (error) {
    console.error('Error posting json:', error.message);
  }
}

//Calls to server /find. t specifies table, property specifies lookup parameter, and search is what property must match
export const findRequest = async (t, property, search) => {
  try {
    const queryParams = new URLSearchParams({table: `${t}`});
    queryParams.append(`${property}`, search);
    
    const response = await fetch(`/find?${queryParams}`, {
      method: 'GET',
    });

    const responseJson = await response.json();

    console.log('Server response json:', responseJson);

    return(responseJson)

  } catch (error) {
    console.error('Error getting:', error.message);
  }
}

export const getAndSetArr = (t, property, search, setFunction, arrName) => {
  findRequest(t, property, search).then(
    (arr) => {
      setFunction(prevState => ({
        ...prevState,
        [arrName]: arr,
      }))
    }
  )
}