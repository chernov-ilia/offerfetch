// Entry point of the application.
// Loads environment variables, starts the Express server and listens on the configured port.

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});