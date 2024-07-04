(async ()=>{
  const fs = require('fs')
  const express = require('express')
  const  cors = require('cors') 
  const ngrok = require('ngrok') 


  const app = express();
  const corsOptions = {

      origin: '*',  // Not recommended for production (consider specific origins)
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization','ngrok-skip-browser-warning']
  };
  // app.use(cors(corsOptions));

  app.use(function(req, res, next) {
    console.log(req)
    res.header("Access-Control-Allow-Origin", "*"); // update to match 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser-warning");
    next();
  });
    
  
  const load = (filename)=>{
    const jsonData = fs.readFileSync('./src/app/_mock/data/'+filename+'.json', 'utf-8');
    const dataObject = JSON.parse(jsonData); // Parse the JSON string
  
    return dataObject
  } 
  
  const save = (filename,data)=>{
  
    return fs.writeFileSync('./src/app/_mock/data/'+filename+'.json', JSON.stringify(data));
  
  } 
  app.post('/user', (req, res) => {
    
    res.json(load('user'))
  
  });
  app.get('/user', (req, res) => {
    
    res.json(load('user'))
  
  });
  
  app.get('/user/:id', (req, res, next) => {
    const {data} = load('user')
    const user = data.find(user => user.id == req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  
  })
  
  app.delete('/user/:id', (req, res, next) => {
    let {data} = load('user')
    data = data.filter(user => user.id == req.params.id)
    save('user',data);
    res.json({ message: 'User deleted with success'});
  
  })
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

  const url = await ngrok.connect(3000); // https://757c1652.ngrok.io -> http://localhost:80
  console.log(url)

})()


