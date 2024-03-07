const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './file/song')
    },
    filename: function (req, file, callback) {
      const originalname = file.originalname;
      const extension = originalname.split('.').pop();
      callback(null, `${req.body.song_name}.${extension}`)  
    },
  })
  
  const upload = multer({ storage })

router.post('/main',(req,res)=>{
    const username = req.body.username
    const phone_num = req.body.phone_number
    console.log(username)
    const Userdata = `
    {
        "name":"${username}",
        "numbers":"${phone_num}"
    }
    `
    const Userpath = `./file/userData/${username}.json`

    fs.writeFile(Userpath, Userdata, (err) => {
        if (err) {
            res.send(`OH No....${err}`);
        } else {
            res.render('music_main.ejs',{username:username})
        }
    })
});
router.post('/upload', upload.fields([
    {name:'song_file',maxCount: 1},
    {name:'song_img',maxCount: 1}
]),(req,res)=>{
    const name = req.body.song_name
    const data = `
    {
        "name":"${req.body.song_name}",
        "band":"${req.body.band_name}",
        "release":"${req.body.song_date}"
    }
    `
    const path = `./file/data/${name}.json`
    
    fs.writeFile(path, data, (err) => {
        if (err) {
            res.send('OH No....');
        } else {
            if (req.files) {
                res.send('อัพโหลดไฟล์สำเร็จ');
            } else {
                res.send('อัพโหลดไฟล์ไม่สำเร็จ');
            }
        }
    })
});
router.get('/subYai',(req,res)=>{
    res.render('Yai.ejs')
});
router.get('/',(req,res)=>{
    res.render('login.ejs')
});
router.get('/game',(req,res)=>{
    res.render('main.ejs')
});
module.exports.router = router