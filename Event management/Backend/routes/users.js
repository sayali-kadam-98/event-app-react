const message = require('./message');

const express = require('express'),
    router = express.Router();
//author Shubham
// get user lists
router.get('/list', function (req, res) {
    let sql = `SELECT name,email,contact FROM user`;
    try {
        db.query(sql, function (err, data, fields) {
            if (err) throw err;
            res.json({
                status: 200,
                data,
                message: message.USER_DATA_RETRIVED
            })
        })
    }
    catch (err) {
        console.log("err in list:", err)
        res.json({
            status: 1,
            message: message.USER_DATA_NOT_RETRIVED
        })
    }

});

router.post('/list', function (req, res) {
    let user = req.body.user_id;
    // console.log(user)
    let sql = `SELECT name,email,contact FROM user where user_id =?`;
    try {
        db.query(sql, [user], function (err, data, fields) {
            if (err) throw err;
            res.json({
                status: 200,
                data,
                message: message.USER_DATA_RETRIVED
            })
        })
    }
    catch (err) {
        console.log("err in list:", err)
        res.json({
            status: 1,
            message: message.USER_DATA_NOT_RETRIVED
        })
    }
});
//author Shubham
// create new user
router.post('/new', function (req, res) {
    try {
        console.log("Request:", req.body)
        // variable declaration
        var name = req.body.name;
        var email = req.body.email;
        var contact = req.body.contact;
        var pass = req.body.password;
        // Function for validating email
        function validateEmail(elementValue) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(elementValue);
        }
        // Functon for accepting numbers only
        function validateContact(elementValue) {
            var contactPattern = /^[0-9]*$/;
            return contactPattern.test(elementValue);
        }
        //Check for whiteSpaces
        function hasWhiteSpace(s) {
            if (!s.trim()) {
                return false;
            }
            else {
                return true;
            }
        }
        let sql = `INSERT INTO user(name, email, contact, password) VALUES (?)`;
        let values = [
            name,
            email,
            contact,
            pass
        ];
        if (name && email && pass && contact.length <= 10) {
            if (validateEmail(email) && validateContact(contact) && hasWhiteSpace(pass) && hasWhiteSpace(name)) {
                // CHecking if user exist
                let user = 'SELECT * FROM user WHERE email = ?';
                db.query(user, [email], function (error, results, fields) {
                    try {
                        if (results.length === 0) {
                            // new user 
                            db.query(sql, [values], function (err, data, fields) {
                                if (err) throw err;
                                res.json({
                                    status: 200,
                                    message: "New user added successfully"
                                })
                            });
                        }
                        else {
                            // user exist
                            res.json({
                                status: 300,
                                message: "User Exist!"
                            });
                        }
                    }
                    catch (error) {
                        console.log('Error', error)
                    }
                });
            }
            else {
                res.json({
                    status: 400,
                    message: "invalid Details."
                });
            }
        }
        else {
            res.json({
                status: 400,
                message: "Please Enter Details"
            });
        }
    }
    catch (err) {
        console.log("err in list:", err)
        res.json({
            status: 200,
            message: USER_DATA_NOT_RETRIVED
        })
    }
});
//author Shubham
//Login api
router.post('/login', function (req, res) {
    try {
        var email = req.body.email;
        var password = req.body.password;
        let sql = 'SELECT user_id,name, email, contact FROM user WHERE email = ? or name = ? AND password = ?';
        if (email && password) {
            // check if user exists
            db.query(sql, [email, email, password], function (error, results, fields) {
                console.log("results:", results)
                if (results.length > 0) {
                    //req.session.loggedin = true;
                    //req.session.email = email;
                    res.json({
                        status: 200,
                        results
                    })
                    //res.redirect('/home');
                } else {
                    res.json({
                        status: 100,
                        message: message.INCORRECT_EMAIL_PASS
                    })
                }
                res.end();
            });
        } else {
            res.json({
                status: 300,
                message: message.ENTER_EMAIL_PASS
            });
            res.end();
        }
    }
    catch (err) {
        console.log("err in NEW:", err)
        res.json({
            status: 1,
            message: message.USER_DATA_NOT_CREATED
        })
    }
});

router.post('/forget', function (req, res) {
    try {
        var email = req.body.email;
        var password = req.body.password;
        let sql = 'SELECT * FROM user WHERE email = ?';
        if (email && password) {
            // check if user exists
            db.query(sql, [email], function (error, results, fields) {
                if (results.length > 0) {
                    //let pass = 'UPDATE user SET password='+ password +' WHERE email = '+ email;
                    //db.query(pass, function(error, results) {
                    //    if (err) {
                    //        return res.status(500).send(err);
                    //    }
                    res.json({
                        status: 200,
                        message: "Password change Successful"
                    });
                    //})
                }
                else {
                    res.json({
                        status: 100,
                        message: "Incorrect email"
                    })
                }
                res.end();
            });
        } else {
            res.json({
                status: 300,
                message: "Please enter email"
            });
            res.end();
        }
    }
    catch (err) {
        console.log("err in list:", err)
        res.json({
            status: 1,
            message: message.USER_DATA_NOT_RETRIVED
        })
    }
});

//testing frontend back end connect

module.exports = router;