const {
    Router
} = require('express');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');

const router = Router();

router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);

module.exports = router;