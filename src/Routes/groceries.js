const Router = require('express')

const router = Router();

const groceries = []
router.post('/add', (req, res) => {
    const { item, quantity } = req.body;
    const cart = { item, quantity };
    if (cart) {
        groceries.push(cart)
        res.send(groceries)

    } else {
        res.sendStatus(401);
    }
})

router.get('/all', (req, res) => {
    res.send(groceries)
})


module.exports = router;