//controllers/bookmarksController.js
// require the Express module
const express = require('express');
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router();
// import the bookmark model
const Bookmark = require('../models/Bookmark');

// Add routes to the router object
// Index: GET all the bookmarks
router.get('/', async (req, res, next) => {
	try {
		// 1. Get all of the bookmarks from the DB
		const bookmarks = await Bookmark.find({});
		// 2. Send them back to the client as JSON
		res.json(bookmarks);
	} catch (err) {
		// if there's an error, pass it on!
		next(err);
	}
});

// Show: Get a Bookmark by ID
router.get('/:id', async (req, res, next) => {
	try {
        const bookmarks = await Bookmark.findById(req.params.id);
        res.json(bookmarks);
    } catch (err) {
        next(err)
    }
});

// Create: POST a Bookmark
router.post('/', async (req, res, next) => {
	try {
		// 1. Use the data in the req body to create a new bookmark
		const newBookmark = await Bookmark.create(req.body);
		// 2. If the create is successful, send back the record that was inserted, specifying 201 status for Created
		res.status(201).json(newBookmark);
	} catch (err) {
		// 3. If there was an error, pass it on!
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		// 1. Find the Bookmark by its id, passing in two additional arguments:
		// the request body holds the updated information
		// { new: true } returns the updated document instead of the old one
		const bookmarkToUpdate = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true,}
		);
		if (bookmarkToUpdate) {
			// send back updated bookmark
			res.json(bookmarkToUpdate);
		} else {
			// else send back 404 Not Found
			res.sendStatus(404);
		}
	} catch (error) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
    try {
        const bookmarkDelete = await Bookmark.findByIdAndDelete(req.params.id)
        console.log(bookmarkDelete)
        if (bookmarkDelete) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        next(err)
    }
})

// Export this router object so that it is accessible when we require the file elsewhere
module.exports = router;
