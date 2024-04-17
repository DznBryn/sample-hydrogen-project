export async function postScriptSmsAdd(phoneNumber) {
    const url = 'https://api.postscript.io/api/v2/subscribers';
    const data = {
      keyword: 'TULASMS',
      phone_number: `${phoneNumber.toString()}`,
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer sk_e05db5844c636065f4102f468b9867a3',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Nework response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  