import express from 'express';
const app = express();
// Set static folder
app.use(express.static('public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded ({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define a route for handling GET requests to fetch a list of users
app.get('/users', async (req, res) => {

    // Simulate a delay of 2 seconds before executing the API call (e.g., to mock slow network)
    setTimeout(async () => {
        // Get the 'limit' query parameter from the URL, default to 10 if not provided
        const limit = +req.query.limit || 10;

        // Fetch user data from an external API (JSONPlaceholder - a free fake API for testing)
        const response = await fetch(
            // Limit the number of users returned based on the query parameter
            `https://jsonplaceholder.typicode.com/users?_limit=${limit}` 
        );

        // Parse the response as JSON
        const users = await response.json()

        // Send back an HTML response that lists the user names in an unordered list
        res.send(`
            <h2>Users</h2>
            <ul class="list-group">
            ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
            </ul>
            `)
    }, 2000) // Simulate delay of 2000ms (2 seconds) before sending the response

});

// Start the server
app.listen (3000, ()=>{
console. log('Server listening on port 3000');
});