const fs = require('fs/promises')

const homepage = (response) => {
    response.render('index', {
        title : 'BINAR Rent Car | Landing Page',
        layout : 'layouts/main-layout',
    });
}
const explore = (response) => {
    response.render('car-search', {
        title : 'BINAR Rent Car | Explore',
        layout : 'layouts/main-layout',
    });
}

module.exports = {
    homepage, explore,
}