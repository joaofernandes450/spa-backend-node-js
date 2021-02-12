var express = require('express');
var router = express.Router();

var authenticationMiddleware = require('../app/helper/authentication');
var Restaurant = require('../app/models/restaurant');

/* Async Helper*/
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

/**
* Return all Restaurants
*/
router.get('/', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    const restaurants = await Restaurant.find();
    return res.status(200).send({ success: true, message: 'Restaurants successfully queried!', data: restaurants })
}))

router.post('/populate', asyncMiddleware(async (req, res, next) => {
    const restaurant1 = {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTe5iVdlAzg4Ah4MLH3jVffp77nNfVRGiog&usqp=CAU",
        name: "McDonald's® (Colombo)",
        description: "20-30min",
        address: {
            street: 'Avenida dos Lusiadas',
            postalCode: '1500-000',
            city: "Lisboa",
            latitude: 38.753570,
            longitude: -9.189630
        },
        popularity: 250,
        rating: [5, 5, 5, 5, 5, 5, 5, 4, 3, 5, 5]
    }

    const restaurant2 = {
        image: "https://d1ralsognjng37.cloudfront.net/92fd48a4-a91b-420e-9f33-bd9825841f69.jpeg",
        name: "Burguer King (Colombo)",
        description: "25-35min",
        address: {
            street: 'Avenida dos Lusiadas',
            postalCode: '1500-000',
            city: "Lisboa",
            latitude: 38.753570,
            longitude: -9.189630
        },
        popularity: 150,
        rating: [5, 5, 5, 5, 5, 5, 5, 4, 3, 4, 5]
    }

    const restaurant3 = {
        image: "https://d1ralsognjng37.cloudfront.net/2443c71c-c00f-4ca5-bc13-31fe42341537.jpeg",
        name: "Taco Bell (Colombo)",
        description: "20-30",
        address: {
            street: 'Avenida dos Lusiadas',
            postalCode: '1500-000',
            city: "Lisboa",
            latitude: 38.753570,
            longitude: -9.189630
        },
        popularity: 100,
        rating: [5, 4, 5, 5, 5, 5, 5, 4, 3, 3, 3]
    }

    const restaurant4 = {
        image: "https://pplware.sapo.pt/wp-content/uploads/2020/07/kfc-nuggets.jpg",
        name: "KFC (Colombo)",
        description: "20-30min",
        address: {
            street: 'Avenida dos Lusiadas',
            postalCode: '1500-000',
            city: "Lisboa",
            latitude: 38.753570,
            longitude: -9.189630
        },
        popularity: 120,
        rating: [5, 4, 5, 5, 5, 5, 5, 4, 3, 3, 3]
    }

    const restaurant5 = {
        image: "https://www.joshuas.pt/home/wp-content/uploads/2020/04/veggieevegan.jpg",
        name: "Veggie Joshua's (Colombo)",
        description: "20-30min",
        address: {
            street: 'Avenida dos Lusiadas',
            postalCode: '1500-000',
            city: "Lisboa",
            latitude: 38.753570,
            longitude: -9.189630
        },
        popularity: 75,
        rating: []
    }

    await Restaurant.create(restaurant1);
    await Restaurant.create(restaurant2);
    await Restaurant.create(restaurant3);
    await Restaurant.create(restaurant4);
    await Restaurant.create(restaurant5);

    return res.status(200).send({ success: true, message: 'Database populated!' })
}))

module.exports = router;