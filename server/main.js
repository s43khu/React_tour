const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');

app.use('/assets', express.static(__dirname + '/public '));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/public')));


//multer settings
var imagename = '';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log(file);
    imagename = Date.now() + path.extname(file.originalname) + '';
    cb(null, imagename);
  }
});
const fileFilter = (req, file, cb) => {
  console.log("Filter for file");
  if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });



//Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mainproject'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});


//Showing packages to table
app.get('/showpackages', (req, res) => {
  let sql = "SELECT * FROM packages";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//route for insert data
app.post('/savepackage', upload.single('file'), (req, res) => {
  let data = { name: req.body.name, price: req.body.price, destination: req.body.dest, description: req.body.desc, facility: req.body.facility, startdate: req.body.sdate, enddate: req.body.edate, source: req.body.source, package_image: imagename };
  console.log(data);
  //console.log(req.body.file);
  let sql = "INSERT INTO packages SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/showpackages');
  });
});

// search file (destination) from table
app.post('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    conn.query("select*from packages",(err,resul)=>{
      if(err) throw err;
      res.json(resul);
    })
  }
  else{
  let sql = "SELECT * FROM packages WHERE destination LIKE '" + q + "%'";
   conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  })
}
})

//route for delete
app.get('/packagedelete/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "DELETE FROM packages WHERE id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showpackages');
  });
});

//route to edit
app.get('/packageedit/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = "select*from packages where id=" + id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//update route 
app.post('/update', (req, res) => {
  let sql = "update packages set name='" + req.body.name + "',price=" + req.body.price + ",source='" + req.body.source + "',description='" + req.body.desc + "',destination='" + req.body.dest + "',facility='" + req.body.facility + "',enddate='" + req.body.edate + "',startdate='" + req.body.sdate + "' where id=" + req.body.id;
  console.log(sql);
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/showpackages');
  });
});
//route for login page
app.post('/login',(req, res) => {
  const msg=[{type:"invalid"}];
  let sql = "select * from login where username='" + req.body.username + "'";
  let query = conn.query(sql,async(err, result) => {
    if (err) throw err;
    else{
    const match = await bcrypt.compare(req.body.password, result[0].password);
  if(match){
      res.json(result);
  }
  if(!match){
    res.json(msg);
  }
}
  });
});

//route for registration
app.post('/adduser', (req, res) => {
  const salt=bcrypt.genSaltSync(10);
   const hashPass=bcrypt.hashSync(req.body.password, salt)
  let data = { username: req.body.username, password: hashPass, email: req.body.email, type: req.body.type };
  console.log(data);
  let sql = "INSERT INTO login SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err){
      res.json("user already exist!")
    }
    else{
    res.redirect('/login')};
  });
});

//show rating all
app.get('/showrating', (req, res) => {
  let sql = "SELECT * FROM rating";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//rating given by users(add)
app.post('/addrating', (req, res) => {
  let data = { user: req.body.user, rating: req.body.rating, comments: req.body.comments, pack_id: req.body.pack_id };
  console.log(data);
  let sql = "INSERT INTO rating SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/showrating');
  })
})

// avgr rating for all packages
app.get('/avgr', (req, res) => {
  let sql = "select pack_id,avg(rating) as avgr from rating group by pack_id";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  })
})
app.post('/book',(req,res)=>{
  const data={user:req.body.user,packid:req.body.packid,phoneno:req.body.phoneno,guests:req.body.guests,date:req.body.date,time:req.body.time,bill:req.body.bill};
  console.log(data);
  let sql="insert into bookings SET?"
  conn.query(sql,data,(err,results)=>{
    if(err) throw err;
    res.json({status:"success"});
  })
})

app.listen(4700, () => {
  console.log(`port is 4700`);
});