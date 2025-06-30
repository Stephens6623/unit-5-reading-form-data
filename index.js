const express = require('express');
const app = express();


const PORT = 3000;
// Initialize variables to store user input
let noun = '';
let verb = '';
let adjective = '';
let place = '';
let pluralNoun = '';

app.use(express.urlencoded({ extended: true }));// Middleware to parse URL-encoded bodies
app.use(express.static('public'));// Middleware to serve static files from the 'public' directory


// Serve the initial HTML page
app.post('/second-word', (req,res) => {// Handle the form submission for the first word
    noun = req.body.noun;// Extract the noun from the request body
    console.log(`Noun: ${noun}`);// Log the noun to the console
    console.log('POST request received for second word');// Log the request to the console
    res.send(// Send a response with the next form
        `<h1>Great! Now, please enter a verb:</h1>
        <form action="/third-word" method="POST">
        <label for="verb">Verb:</label>
        <input type="text" id="verb" name="verb" placeholder="Enter a verb" required>
        <button type="submit">NEXT</button>
        </form>`
    )
})
// Handle the form submission for the second word
app.post('/third-word', (req, res) => {
    verb = req.body.verb;// Extract the verb from the request body
    console.log(`Verb: ${verb}`);// Log the verb to the console
    console.log('POST request received for third word');// Log the request to the console
    res.send(// Send a response with the next form
        `<h1>Awesome! Now, please enter an adjective:</h1>
        <form action="/fourth-word" method="POST">
        <label for="adjective">Adjective:</label>
        <input type="text" id="adjective" name="adjective" placeholder="Enter an adjective" required>
        <button type="submit">NEXT</button>
        </form>`
    );
});
// Handle the form submission for the third word
app.post('/fourth-word', (req, res) => {
    adjective = req.body.adjective;// Extract the adjective from the request body
    console.log(`Adjective: ${adjective}`);// Log the adjective to the console
    console.log('POST request received for fourth word');// Log the request to the console
    res.send(// Send a response with the next form
        `<h1>Almost there! Now, please enter a place:</h1>
        <form action="/fifth-word" method="POST">
        <label for="place">Place:</label>
        <input type="text" id="place" name="place" placeholder="Enter a place" required>
        <button type="submit">NEXT</button>
        </form>`
    );
});
app.post('/fifth-word', (req, res) => {// Handle the form submission for the fourth word
    place = req.body.place;// Extract the place from the request body
    console.log(`Place: ${place}`);// Log the place to the console
    console.log('POST request received for fifth word');// Log the request to the console
    res.send(
        `<h1>Last one! Now, please enter a plural noun:</h1>
        <form action="/done" method="POST">
        <label for="pluralNoun">Plural Noun:</label>
        <input type="text" id="pluralNoun" name="pluralNoun" placeholder="Enter a plural noun" required>
        <button type="submit">FINISH</button>
        </form>`
    );
});
app.post('/done', (req,res) => {// Handle the form submission for the fifth word
    pluralNoun = req.body.pluralNoun;// Extract the plural noun from the request body
    console.log(`pluralNoun: ${pluralNoun}`);// Log the plural noun to the console
    console.log('POST request received for madlib');// Log the request to the console
    res.redirect('/story');// Redirect to the story page after all words are collected
})
app.get('/story', (req, res) => {// Serve the final story page
    res.send(`
    <h1>Your Madlib Story</h1>
    <p>Once upon a time, a ${adjective} ${noun} decided to ${verb} through the ${place}, surrounded by ${pluralNoun}.</p>
    <form method="GET" action="/reset">
      <button type="submit">Play Again</button>
    </form>
  `);
});
app.get('/reset', (req, res) => {// Reset the variables to allow for a new game
    noun = '';
    verb = '';
    adjective = '';
    place = '';
    pluralNoun = '';
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});