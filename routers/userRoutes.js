const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const User = require('../model/userModel');
const shortid = require('shortid');
const validUrl = require('valid-url');
const Url = require('../model/url');
const crypto = require('crypto');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))


router.get('/', () => {
    console.log("hello welcome")
})

//Create endpoint: For user Creation
// Takes in userType and name
router.post('/create', async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        userType: req.body.userType,
        urls: []
    })

    newUser.save().then(() => {
        res.send({
            status: 200,
            message: "User created successfully",

        })
    })
})

// Shorten endPoint: shortens the Long url based on custom hash function.
router.post('/shorten', async (req, res) => {
    const { longUrl, id } = req.body;
    let existingShortUrl = await Url.findOne({ longUrl });
    
    if (existingShortUrl) {
        console.log("Longurl exists")
        return res.status(200).json({ shortUrl: existingShortUrl.shortUrl });
    }

    const hashedLongUrl = hashString(longUrl);
    const baseUrl = "http://localhost:5001"
    let user = await User.findById(id);

    //Restritction applied
    if (user.userType === "Tier1" && user.urls.length >= 5) {
        return res.status(404).json({ message: 'User is a 1Tier1 user and cant make more than 5 requests' });
    }
    if (user.userType === "Tier2" && user.urls.length >= 4) {
        console.log(user.urls.length);
        return res.status(404).json({ message: 'User is a Tier2 user and cant make more than 4 requests' });
    }

    // Create url code
    const urlCode = generateShortUrl(hashedLongUrl, id);


    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let url = await Url.findOne({ longUrl })
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date(),
            user: id
        });

        user.urls.push(url);
        await user.save();
        await url.save();
        res.json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});


//History endPoint: provides history of user shortened urls
router.get('/history/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID and populate the 'urls' field
        const user = await User.findById(userId).populate('urls');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract relevant information for the response
        const urlHistory = user.urls.map(url => ({
            shortUrl: url.shortUrl,
            longUrl: url.longUrl,
            date: url.date
        }));

        res.json(urlHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//Custom hash function
//Could have used personal hash values but wont be scalable for a large system.
//NPM configures the hash function based on key provided and incoming values.
// Use a hashing algorithm (e.g., SHA-256) to create a hash from the input
function hashString(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// Custom function to generate a short url based on long url.
// Combine hashedLongUrl, userId, and other information to create a unique short URL
// This is a basic example for illustration purposes
function generateShortUrl(hashedLongUrl, userId) {
    return `${userId.slice(0, 4)}-${hashedLongUrl.slice(0, 8)}`;
}

module.exports = router
