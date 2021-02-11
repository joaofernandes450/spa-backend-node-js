var express = require('express');
var router = express.Router();

var authenticationMiddleware = require('../app/helper/authentication');
var Product = require('../app/models/product');

/* Async Helper*/
const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

/**
 * Return all Products
 */
router.get('/', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    const products = await Product.find();
    return res.status(200).send({ success: true, message: 'Products successfully queried!', data: products })
}))

/**
 * Returns Products based on type (i.e., "soup", "desert")
 */
router.get('/filter/:type', authenticationMiddleware.verifyToken, asyncMiddleware(async (req, res, next) => {
    const products = await Product.find({ type: req.params.type });
    return res.status(200).send({ success: true, message: 'Products successfully queried!', data: products })
}))

router.post('/populate', asyncMiddleware(async (req, res, next) => {
    const dish1 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1596101665/web-2070_bpr6sp.jpg",
        title: "Smoked Salmon Wrap",
        description: "Smoked Salmon Wrap with Avocado, Arugula, Chives and Cream Cheese",
        weight: 300,
        ingredients: ["Avocado", "Chives", "Cream Cheese", "Lemon juice Bio", "Rocket", "Smoked Salmon", "Tortilla Wrap"],
        nutricional: {
            energyValueKCAL: 196,
            energyValueKJ: 802,
            fat: 10.7,
            fatSaturates: 4.1,
            carbohydrate: 14.3,
            sugar: 2.4,
            fiber: 0.5,
            protein: 8.9,
            sodium: 1.3
        },
        price: 4,
        tags: ["fish"],
        type: "dish"
    }
    const dish2 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1602860041/2071-polvo_g3vmqz.jpg",
        title: "Cape Verdean Stewed Octopus",
        description: "Stewed Octopus with Bell Peppers, Coriander and White Rice",
        weight: 400,
        ingredients: ["Coriander", "Curry", "Extra Virgin Olive Oil", "Garlic", "Green Bell Pepper", "Hot Sauce", "Octopus", "Onion", "Red Bell Pepper", "White Rice"],
        nutricional: {
            energyValueKCAL: 103,
            energyValueKJ: 434,
            fat: 2.7,
            fatSaturates: 0.4,
            carbohydrate: 13,
            sugar: 0.5,
            fiber: 0.9,
            protein: 6.1,
            sodium: 0.6
        },
        price: 4,
        tags: ["fish"],
        type: "dish"
    }
    const dish3 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/v1593860278/web__3049_qqoz6d.jpg",
        title: "Starter - Thay Salad (200 gr)",
        description: "Quinoa with Vegetables, Chick Pea, Coriander, Cashew and Peanut Ginger Sauce",
        weight: 200,
        ingredients: ["Cachew", "Black Pepper", "Carrot", "Chickpea", "Coriander", "Curry", "Ginger", "Peanut Butter", "Purple Cabbage", "Quinoa", "Red Bell Pepper", "Vinegar (sulphites)"],
        nutricional: {
            energyValueKCAL: 94,
            energyValueKJ: 395,
            fat: 2.5,
            fatSaturates: 0.9,
            carbohydrate: 11.8,
            sugar: 2.0,
            fiber: 3.3,
            protein: 4.3,
            sodium: 0.4
        },
        price: 4,
        tags: ["veggie"],
        type: "dish"
    }

    const drink1 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1608306502/4044-Litchi_Bubble_Tea_u1ygjd.jpg",
        title: "Lychees Bubble Tea",
        description: "Jasmine and Lychees Cold Tea with Green Apple Bubbles",
        weight: 100,
        ingredients: ["Green Apple Bubbles", "Green Tea", "Homemade Litchi Pulp", "Jasmine Green Tea", "Litchi Syrup"],
        nutricional: {
            energyValueKCAL: 31,
            energyValueKJ: 131,
            fat: 0,
            fatSaturates: 0,
            carbohydrate: 7.7,
            sugar: 6.8,
            fiber: 0,
            protein: 0,
            sodium: 0
        },
        price: 1,
        tags: ["veggie"],
        type: "drink"
    }


    const drink2 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1608306553/4043_Maracuja-Bubble-Tea_hs2mxp.jpg",
        title: "Passion Fruit Bubble Tea",
        description: "Jasmine and Passion Fruit Cold Tea with Strawberry Bubbles",
        weight: 100,
        ingredients: ["Green Tea", "Jasmine Green Tea", "Maracuja Syrup", "Passion Fruit Pulp", "Strawberry Bubbles"],
        nutricional: {
            energyValueKCAL: 33,
            energyValueKJ: 140,
            fat: 0,
            fatSaturates: 0,
            carbohydrate: 8.2,
            sugar: 7.3,
            fiber: 0.1,
            protein: 0.1,
            sodium: 0
        },
        price: 1,
        tags: ["veggie"],
        type: "drink"
    }

    const desert1 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1606573811/7041-tartelete-limao_ndzggx.jpg",
        title: "Lemon Meringue Tartlet",
        description: "Tartlet with Lemon Curd and Toasted Meringue",
        weight: 120,
        ingredients: ["Caster Sugar", "Condensed Milk", "Egg white", "Eggs", "Lemon juice Bio", "Sheet of gelatin", "Unsalted Butter (milk ferments)", "Vanilla Aroma", "Wheat Flour (wheat)", "Yeast"],
        nutricional: {
            energyValueKCAL: 275,
            energyValueKJ: 1160,
            fat: 8.6,
            fatSaturates: 5.3,
            carbohydrate: 44.4,
            sugar: 43.3,
            fiber: 0.1,
            protein: 4.9,
            sodium: 0.2
        },
        price: 1,
        tags: ["veggie"],
        type: "desert"
    }

    const desert2 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1606573817/7039-cheesecake-caramelo_bktr4a.jpg",
        title: "Salted Caramel Cheesecake",
        description: "Soft Cream Cheese Cake, Wafer Crumble and Caramel Topping with Fleur de Sel",
        weight: 120,
        ingredients: ["Caster Sugar", "Condensed Milk", "Cream", "Cream Cheese", "Flower of Salt", "Marie Biscuit", "Sheet of gelatin", "Unsalted Butter (milk ferments)"],
        nutricional: {
            energyValueKCAL: 359,
            energyValueKJ: 1497,
            fat: 24.8,
            fatSaturates: 17.5,
            carbohydrate: 26.2,
            sugar: 21.2,
            fiber: 0.2,
            protein: 8.3,
            sodium: 0.5
        },
        price: 1,
        tags: ["veggie"],
        type: "desert"
    }

    const desert3 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1584370359/web-720_npusvd.jpg",
        title: "Cinnamon Rolls",
        description: "Sweet Cinnamon Rolled Buns",
        weight: 60,
        ingredients: ["Brown Sugar", "Butter Bean", "Caster Sugar", "Cinnamon", "Eggs", "Fermipan", "Low Fat Milk", "Salt", "Unsalted Butter (milk ferments)", "Wheat Flour (wheat)"],
        nutricional: {
            energyValueKCAL: 536,
            energyValueKJ: 2242,
            fat: 19,
            fatSaturates: 11.6,
            carbohydrate: 83.2,
            sugar: 53.6,
            fiber: 2.0,
            protein: 7.0,
            sodium: 3.6
        },
        price: 1,
        tags: ["veggie"],
        type: "desert"
    }

    const soup1 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1579279294/web_811_uiqikc.jpg",
        title: "Country Style Soup (250 gr)",
        description: "Red Bean, Elbow Maccaroni Pasta and Vegetables Soup",
        weight: 250,
        ingredients: ["Black Pepper", "Carrot", "Extra Virgin Olive Oil", "Garlic", "Mint", "Onion", "Red Beans", "Salt", "Savoy Cabbage", "Turnip"],
        nutricional: {
            energyValueKCAL: 55,
            energyValueKJ: 230,
            fat: 2.4,
            fatSaturates: 0.4,
            carbohydrate: 5.3,
            sugar: 1.2,
            fiber: 1.9,
            protein: 2.0,
            sodium: 0.9
        },
        price: 1,
        tags: ["veggie"],
        type: "soup"
    }

    const soup2 = {
        image: "https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/8039-sopa-de-peixe_cqbrav.jpg",
        title: "Fish Soup (250 gr)",
        description: "Fish Soup with Saffron, Paprika, Bell Pepper, Fennel, Tomato and Coriander",
        weight: 250,
        ingredients: ["Black Pepper", "Chopped Tomato", "Coriander", "Extra Virgin Olive Oil", "Fennel", "Garlic", "Green Bell Pepper", "Ground Coriander", "Onion", "Paprika", "Red Bell Pepper", "Saffran", "Thai Fish Sauce",
            "Tomato Pulp", "Water", "White Fish", "White Wine (sulphites)"],
        nutricional: {
            energyValueKCAL: 49,
            energyValueKJ: 203,
            fat: 2.2,
            fatSaturates: 0.4,
            carbohydrate: 1.4,
            sugar: 1.2,
            fiber: 0.7,
            protein: 4.4,
            sodium: 0.5
        },
        price: 1,
        tags: ["fish"],
        type: "soup"
    }

    await Product.create(dish1);
    await Product.create(dish2);
    await Product.create(dish3);

    await Product.create(soup1);
    await Product.create(soup2);

    await Product.create(drink1);
    await Product.create(drink2);

    await Product.create(desert1);
    await Product.create(desert2);
    await Product.create(desert3);

    return res.status(200).send({ success: true, message: 'Database populated!' })
}))

module.exports = router;