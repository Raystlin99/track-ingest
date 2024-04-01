# Overview
Load data from Excel spreadsheet and process into MongoDB using Mongoose.

# Prerequisites
Using Node lts/iron v20.12.0
Access to MongoDB account (current credentials from free account are included in source - account will be removed later this week)

# Setup
Run `npm i` to install required node modules  
Use `npm test` to execute tests in watch mode (press `a` to execute `all`)  
Use `npm run dev` to execute data load from test spreadsheet  
> Note. This is currently connected to test (Free) MongoDB account and credentials are included, these would obviously be removed and stored separately and handled as secrets  

# Notes
Please note that `Jest` has been used for testing instead of `Mocha`, simply because of familiarity - it has been a while since I used `Mocha`.  
I would also ordinarily use Typescript for this, but there is some additional setup required and did not have the time.  
