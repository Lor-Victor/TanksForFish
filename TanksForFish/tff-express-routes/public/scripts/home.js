async function getFishData() {
    const url = 'https://fish-species.p.rapidapi.com/fish_api/fish/betta';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ed0028f60emsh96629febd798225p123275jsnb5a388feb1a6',
        'x-rapidapi-host': 'fish-species.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json(); // assuming it's JSON
      console.log(result);
    } catch (error) {
      console.error('API fetch error:', error);
    }
  }
  
  getFishData();
  