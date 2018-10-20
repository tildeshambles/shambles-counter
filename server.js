const server = require('server')
const { get, socket } = require('server/router')

const port = process.env.PORT || 9001

server({ port }, [
    get('/', ctx => '<h1>This server is shambles</h1>'),
    
    socket('increment', ctx => ctx.io.emit('increment')),
    socket('decrease', ctx => ctx.io.emit('decrease')),
    socket('reset', ctx => ctx.io.emit('reset')),

    socket('counter_label', ctx => ctx.io.emit('counter_label', ctx.data)),
    socket('counter_position', ctx => ctx.io.emit('counter_position', ctx.data)),
    socket('counter_alignment', ctx => ctx.io.emit('counter_alignment', ctx.data))

]).then(() => console.log(`Server running at http://localhost:${port}`))