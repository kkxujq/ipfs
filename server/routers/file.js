const os = require('os');
const path = require('path');
const fs = require('fs');
module.exports = {
  path: "/file",

  async handle(ctx, next) {
    console.log(11111);
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
      const file = files[key];
      const filePath = path.join(tmpdir, file.name);
      const reader = fs.createReadStream(file.path);
      const writer = fs.createWriteStream(filePath);
      reader.pipe(writer);
      filePaths.push(filePath);
    }

    ctx.body = filePaths;
  },
};