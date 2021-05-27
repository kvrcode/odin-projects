export const getCityId = (city, state) => {
    console.log('getting city ID from city list json file...');
    let result = [];
    fetch('src/data/city.list.min.json', {mode: 'no-cors'})
      .then(response => response.json())
      .then(data => {
        console.log(data);
          console.log('city.js', city, state)
        let id;
        // data.filter((data, key) => {
        //   if(data[key].name === city && data[key].state === state){
        //     id = data[key].id;
        //     console.log(id);
        //   }
        // })
        data.forEach((dataItem, key) => {
          console.log('searching');
           if(dataItem.name === city && dataItem.state === state) {
            id = dataItem.id;
            console.log(id);
        } 
        })
      })
      .catch(error => console.error(error));
}