var glob = require("glob")
var fs = require("fs")

glob("./audio/**/*.{mp3,opus,flac}", {}, function (er, files) {
  let result = []
  let download = ''
  files.forEach(item => {
    let fileInfo = fs.statSync(item)
    if (fileInfo.size / (1024 * 1024) < 20) {    // less than 20MB
      let arr = item.split('/')
      let songName = arr[3].replace(/\.(mp3|flac|opus)$/g, '');   // Extract the song name from the file name by removing the file extension
      let coverName = `${songName}.jpg`;   // Set the cover image name based on the song file name
      
      // check if cover image exists
      if (fs.existsSync(`./audio/${arr[2].replace(/[()\s]/g, function (match) {
        if (match === '(') {
          return '%28'; // The album name with '(' replaced with '%28'
        } else if (match === ')') {
          return '%29'; // The album name with ')' replaced with '%29'
        } else {
          return '%20'; // The album name with spaces replaced with '%20'
        }
      })}/${coverName}`)) {
        // use the song name as the cover image name
        coverName = `${songName}.jpg`;
      } else {
        // use default cover image "cover.jpg"
        coverName = `cover.jpg`;
      }
      
      result.push({
        name: songName,
        artist: arr[2],
        source: 'https://cdn.jsdelivr.net/gh/urzone/one' + item.slice(1),
        url: 'https://cdn.jsdelivr.net/gh/urzone/one' + item.slice(1),
        cover: `https://cdn.jsdelivr.net/gh/urzone/one/audio/${arr[2].replace(/[()\s]/g, function (match) {
          if (match === '(') {
            return '%28'; // The album name with '(' replaced with '%28'
          } else if (match === ')') {
            return '%29'; // The album name with ')' replaced with '%29'
          } else {
            return '%20'; // The album name with spaces replaced with '%20'
          }
        })}/${coverName.replace(/[()\s]/g, function (match) {
          if (match === '(') {
            return '%28'; // The cover image name with '(' replaced with '%28'
          } else if (match === ')') {
            return '%29'; // The cover image name with ')' replaced with '%29'
          } else {
            return '%20'; // The cover image name with spaces replaced with '%20'
          }
        })}`,
        favorited: false
      })
      download += `https://cdn.jsdelivr.net/gh/urzone/one${item.slice(1)}\n`
    } else {   // greater than or equal to 20MB
      let arr = item.split('/')
      let songName = arr[3].replace(/\.(mp3|flac|opus)$/g, '');   // Extract the song name from the file name by removing the file extension
      let coverName = `${songName}.jpg`;   // Set the cover image name based on the song file name
      
      // check if cover image exists
      if (fs.existsSync(`./audio/${arr[2].replace(/[()\s]/g, function (match) {
        if (match === '(') {
          return '%28'; // The album name with '(' replaced with '%28'
        } else if (match === ')') {
          return '%29'; // The album name with ')' replaced with '%29'
        } else {
          return '%20'; // The album name with spaces replaced with '%20'
        }
      })}/${coverName}`)) {
        // use the song name as the cover image name
        coverName = `${songName}.jpg`;
      } else {
        // use default cover image "cover.jpg"
        coverName = `cover.jpg`;
      }
      
      result.push({
        name: songName,
        artist: arr[2],
        source: `https://raw.githubusercontent.com/urzone/one/main${item.slice(1)}`,
        url: `https://raw.githubusercontent.com/urzone/one/main${item.slice(1)}`,
        cover: `https://cdn.jsdelivr.net/gh/urzone/one/audio/${arr[2].replace(/[()\s]/g, function (match) {
          if (match === '(') {
            return '%28'; // The album name with '(' replaced with '%28'
          } else if (match === ')') {
            return '%29'; // The album name with ')' replaced with '%29'
          } else {
            return '%20'; // The album name with spaces replaced with '%20'
          }
        })}/${coverName.replace(/[()\s]/g, function (match) {
          if (match === '(') {
            return '%28'; // The cover image name with '(' replaced with '%28'
          } else if (match === ')') {
            return '%29'; // The cover image name with ')' replaced with '%29'
          } else {
            return '%20'; // The cover image name with spaces replaced with '%20'
          }
        })}`,
        favorited: false
      })
      download += `https://raw.githubusercontent.com/urzone/one/main${item.slice(1)}\n`
    }
  })
  fs.writeFileSync('./audio/list.min.js', "var list = " + JSON.stringify(result))
  fs.writeFileSync('./audio/download.txt', download)
})