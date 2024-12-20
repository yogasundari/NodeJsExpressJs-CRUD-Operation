const express = require('express');
const router = express.Router();

let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        DOB:"07/10/1995"  },
    {
        id: 2,
        name: 'Jane Doe',
        email:'jane@gmail.com',
        DOB:'10/10/1995'
    }
];
router.get("/:email",(req,res)=>{
    
    const email = req.params.email;
    
    let filtered_users = users.filter((user) => user.email === email);

    res.send(filtered_users);
});
router.post("/",(req,res)=>{
    // Push a new user object into the users array based on query parameters from the request
    users.push({
        "id": req.query.id,
        "name": req.query.name,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
});
router.put("/:email", (req, res) => {
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        /*
        Include similar code here for updating other attributes as needed
        */
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});
router.delete("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);
});
// Define a route handler for GET requests to the root path "/"
router.get("/",(req,res)=>{
    // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
    res.send(JSON.stringify({users}, null, 4));
});

module.exports = router;

