const express = require('express');
const router = express.Router();
const Admindata = require('../model/Admindata');

// POST route to add a new menu item
router.post('/addData', async (req, res) => {
    try {
        const newItem = new Admindata({
            CategoryName: "Hammad khan",
            name: "Chicken Fried Rice",
            img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            options: [
                {
                   
                }
            ],
            description: "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer/Chicken/Mutton were added."
        });

        await newItem.save();
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
