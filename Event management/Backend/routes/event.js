const express = require('express'),
  router = express.Router();
//author Shubham
// get user lists
router.get('/list', function(req, res) {
  let sql = `SELECT * FROM event where cast(event_date as datetime) >= CURDATE()` ;
  db.query(sql, function(err, results, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      results,
      message: "Event lists retrieved successfully"
    })
  })
});
router.post('/getlist', function(req, res) {
  let eid=req.body.event_id
  let sql = `SELECT * FROM event WHERE event_id= ?` ;
  db.query(sql,[eid], function(err, results, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      results,
      message: "Event lists retrieved successfully"
    })
  })
});
// Retrieving User hosted/posted event
router.post('/myevent', function(req, res) {
  var user_id = req.body.user_id;
  // console.log("user", user_id)
  // let myeve = `SELECT * FROM myevents WHERE user_id = ?`;
  let myeve = `SELECT * FROM event WHERE user_id = ?`;
  db.query(myeve, [user_id], function(err, results, fields) {
    if (err) throw err;
    if(results.length > 0 ){
      res.json({
        status: 200,
        results,
        message: "Event lists retrieved successfully"
      });
    }
    else{
      res.json({
        status: 400,
        results,
        message: "No events posted"
      });
    }
  })
});
router.post('/cats', function(req, res) {
  //var user_id = req.body.user_id;
  let cats = `SELECT * FROM category`;
  db.query(cats, function(err, results, fields) {
    //if (err) throw err;
    console.log("catg in list:", results)

    if(results.length > 0 ){
      res.json({
        status: 200,
        results,
        message: "category lists retrieved successfully"
      });
    }
    else{
      res.json({
        status: 400,
        results,
        message: "No category"
      });
    }
  })
});
router.post("/new", function(req,res){
    // variable declaration
    var event_name = req.body.event_name;
    var cats_name = req.body.cats_name;
    var capacity = parseInt(req.body.capacity);
    var availability = parseInt(req.body.availability);
    var event_date = req.body.event_date;
    var event_time = req.body.event_time;
    var venue = req.body.venue;
    var user_id = req.body.user_id;

    let sql =  `INSERT INTO event(event_name, cats_name, capacity, availability, event_date, event_time, venue, user_id) VALUES (?)`;
    let values = [
      event_name, 
      cats_name, 
      capacity, 
      availability, 
      event_date, 
      event_time, 
      venue, 
      user_id 
    ];
    //Wconsole.log("Value",values)
    //Check for whiteSpaces
    function hasWhiteSpace(s) {
      if(/\S/.test(s))
      {
          return true;
      }
      else{
          return false;
      }
    }
    function validateNumber(elementValue){      
      var contactPattern = /^[0-9]*$/;
      return contactPattern.test(elementValue); 
    }
    // new Event
    if(event_name && cats_name && capacity && availability && event_date && event_time && venue && user_id ){
      if( hasWhiteSpace(event_name) && hasWhiteSpace(venue) && capacity > 0
          && availability > 0 && capacity >= availability){
            let event = `SELECT event_name FROM event WHERE event_name =? `;
            db.query(event, [event_name], function(err, result, fields) {
            if(result.length === 0 ){
                db.query(sql, [values], function(err, data, fields) {
                  if (err) throw err;
                  res.json({
                      status: 200,
                      message: "New event added successfully"
                  })
                });//insert querry
              }//end of if exist
              else{
                res.json({
                  status: 400,
                  message: "Event Exist"
                })
              }
            });
          }
      else{
        res.json({
          status: 400,
          message: "Invalid Details"
        })
      }
    }
    else{
      res.json({
        status: 400,
        message: "Missing details"
      })
    }
});
module.exports = router;