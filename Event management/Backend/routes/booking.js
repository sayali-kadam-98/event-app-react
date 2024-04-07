const { json } = require('body-parser');

const express = require('express'),
  router = express.Router();

  router.post('/list', function(req, res) {
      var user=req.body.user_id;
      console.log(user);

    // let sql = `SELECT user_id, event_name, cats_name, venue, availability, event_date, event_time, participant, book_time FROM booking_details WHERE user_id = ?` ;
    let sql = `SELECT b.book_id, e.user_id, e.event_id, e.event_name, e.cats_name, e.venue, e.availability, e.event_date, e.event_time, b.participant, b.book_time, b.status FROM book b INNER JOIN event e on b.event_id=e.event_id WHERE b.user_id = ? order by STR_TO_DATE(e.event_date, '%d-%m-%Y') DESC;` ;
    db.query(sql,[user], function(err, results, fields) {
      console.log(results);
      if (err) throw err;
      res.json({
        status: 200,
        results,
        message: "booking lists retrieved successfully"
      })
    })
  });

  router.post('/new', function(req, res) {
    var user=req.body.user_id;
    var event=req.body.event_id;
    var part=req.body.participant;
    var time=req.body.book_time;
    var status = 'Booked'

  let sql = `INSERT INTO book(user_id, event_id, participant, book_time, status) VALUES (?, ?, ?, ?, ?)` ;
  let available = `SELECT availability FROM event WHERE event_id=? and availability>=?`
  let update = `UPDATE event SET availability=availability-? , booking=booking+? WHERE event_id = ?`
  if(user && event && part && time){
    db.query(available,[event,part],function(err,results,fields){
      console.log(results.length)
      if(results.length>0){ 
        db.query(update,[part,part,event], function(err, data1, fields) {
            if (err) throw err;
            db.query(sql,[user, event, part, time, status], function(err, data, fields) {
              res.json({
                status: 200,
                data,
                message: "Booking Successful"
              })
            })
          });//insert querry
      }
      else{
        res.json({
          status: 200,
          message: "Not enough availability"
        })
      }
    })
    
  }//check if data is not empty
  else{
    res.json({
        status: 300,
        message: "Invalid data"
      })
  }
});
router.post('/cancel', function(req, res) {
  console.log('Request',req.body)
  var book_id=req.body.book_id;
  var event_id= req.body.event_id;
  var part=req.body.participant;
  var status = 'Canceled'

  let sql = `UPDATE book SET status=? WHERE event_id = ? and book_id=?` ;
  let update = `UPDATE event SET availability=availability+? WHERE event_id = ?`

  if(book_id && event_id && part){
    db.query(update,[part,part,event_id], function(err, data1, fields) {
      if (err) throw err;
      db.query(sql,[status, event_id, book_id],function(err,results,fields){
            if (err) throw err;
              res.json({
                status: 200,
                message: "Cancel Successful"
            })
          });
    })
  }//check if data is not empty
  else{
    res.json({
        status: 300,
        message: "Invalid data"
      })
  }

});
module.exports = router;