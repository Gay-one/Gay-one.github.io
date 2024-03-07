const express = require('express')
const router = require('./router_path/router_front.js').router
const server = express()
const path = require('path')
const ejs = require('ejs')
const page = path.join(__dirname,'page','')
const fs = require('fs')
const multer = require('multer')
const url = require('url')

server.set('views',page)
server.set('view engine','ejs')
server.use(express.urlencoded({extended: false}))
server.use(router)
server.use(express.static(path.join(__dirname,'file')))
server.listen(1000,'localhost',()=>{
    console.log('You are in');
})