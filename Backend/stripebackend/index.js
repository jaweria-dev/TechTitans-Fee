const cors= require("cors")
const express = require("express")

// Todo: Add a stripe key
const stripe =  require('stripe') ("sk_test_51Pg5eaRunlLVaZ2Qz31ndkSbxMlj66WYait44gI1xE5HHuEU6UCCxqUhSSqg956BL97pGKMjJbIjG1nK7aKCyyZD00lKHFIqiL")
const uuid = require("uuid")

const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.get("/", (req, res) =>{
    res.send("IT WORKS AT LEARNCODEONLINE")
})

app.post("/payment", (req, res) => {
    const { course, token } = req.body;
    console.log("COURSE", course);
    console.log("FEE", 1000);

    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: 1000 * 100, // 1000 PKR per month
            currency: 'pkr', // Assuming PKR as the currency
            customer: customer.id,
            receipt_email: token.email,
            description: `Payment for ${course.name} course` // Add course name in the description
        }, { idempotencyKey });
    }).then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Payment failed' });
    });
});

// Listen
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));

