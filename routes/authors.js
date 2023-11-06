const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors Route
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.render('authors/index', { authors: authors})
    } catch {
        res.redirect('/')
    }
    
})

// New Author Route
router.get('/new',(req, res) => {
    res.render('authors/new', {author: new Author() })
})

// Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
}

})

module.exports = router