const fs = require('fs')

const Header = `HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: @LENGTH

`

const PathPattern = /^GET\s+(.+)\s+HTTP\/1.1/

const handlerFactory = (socket) => (data) => {
  let path = data.toString().match(PathPattern)[1]
  if (path.startsWith('/')) {
    path = `.${path}`
  }
  const content = fs.readFileSync(path).toString()
  const header = Header.replace('@LENGTH', content.length)
  socket.write(header)
  socket.write(content)
}

module.exports = handlerFactory
