var http = require('http');
var cp = require('child_process')


// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Declare a route
fastify.post('/', (request, reply) => {

    var code = request.body.params[0];

    if (request.body.method == 'solc_abi') {
        get_abi2(code).then(res_abi => {
            reply.send({ success: true, abi: res_abi })
        }).catch(err => reply.send({ success: false, message: err }))
    }
    else if (request.body.method == 'solc_bin') {
        get_bin2(code).then(res_bin => {
            reply.send({ success: true, bin: res_bin })
        }).catch(err => reply.send({ success: false, message: err }))
    }
    if (request.body.method == 'solc') {
        get_abi2(code).then(res_abi => {
            get_bin2(code).then(res_bin => {
                reply.send({ success: true, abi: res_abi, bin: res_bin })
            }).catch(err => reply.send({ success: false, message: err }))
        }).catch(err => reply.send({ success: false, message: err }))
    }
})

// Run the server!
fastify.listen(3000, '0.0.0.0', (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
})




// http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');

//     console.log(req.read)
//     res.end('Hallo world');
// }).listen(3000);

async function get_abi2(path) {
    return new Promise((resolve, reject) => {
        var ret = cp.execFileSync('./solc', ['--allow-paths', __dirname, '--abi', __dirname + path]);
        ret = ret.toString();
        var lines = ret.split("\n");
        for (var i = 1; i < lines.length; i += 4) {
            if (lines[i].indexOf(path) > 0) {
                resolve(JSON.parse(lines[i + 2].trim()));
                return;
            }
        }
        resolve('');
    })
}

async function get_bin2(path) {
    return new Promise((resolve, reject) => {
        var ret = cp.execFileSync('./solc', ['--allow-paths', __dirname, '--bin', __dirname + path]);
        ret = ret.toString();
        var lines = ret.split("\n");
        for (var i = 1; i < lines.length; i += 4) {
            if (lines[i].indexOf(path) > 0) {
                resolve(lines[i + 2].trim());
                return;
            }
        }
        resolve('');
    })
}

console.log('started');
