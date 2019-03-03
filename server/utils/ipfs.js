const ipfsClient = require('ipfs-http-client');
const fs = require('fs');

// connect to ipfs daemon API server
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });
const path = '/Users/xujiaqi/myProject/zw-app/assets/ipfs-daemon.png';
ipfs.add(fs.readFileSync(path), function (err, files) {
  if (err || typeof files == "undefined") {
    console.log(err);
  } else {
    console.log(files);
  }
});