const fs = require('fs/promises')

const homepage = (response) => {
    response.render('index', {
        title : 'BINAR Rent Car | Landing Page',
        layout : 'layouts/main-layout',
    });
}
const explore = async(response) => {
    let JSONData;
    
    JSONData = await fs.readFile('./data/cars.json', 'utf-8');

    response.render('car-search', {
        title : 'BINAR Rent Car | Explore',
        layout : 'layouts/main-layout',
        cars : JSON.stringify(JSON.parse(JSONData)), 
    });
}

module.exports = {
    homepage, explore,
}