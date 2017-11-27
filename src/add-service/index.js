import http from 'http'
import app from './app'
import { Buffer } from 'buffer';

function register() {
    let opts = {
        host: '127.0.0.1',
        path: '/services',
        port: '3001',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: 'add',
            url: '/add',
            endpoints: {
                values: [{
                    type: 'http',
                    url: '127.0.0.1',
                    path: '/add',
                    port: 4000
                }]
            }
        }
    }

    let req = http.request(opts, res => {
        var resData = "";
        res.on('data', chunk => {
            resData += chunk;
        })

        res.on('end', err => {
            if (res.statusCode === 400) {
                console.log(resData);
                unregister();
            } else {
                console.log("running");
            }
        })
    })
    req.write(new Buffer(JSON.stringify(opts.body)))
    req.end();
}

function unregister() {

    let opts = {
        host: '127.0.0.1',
        path: '/services/add',
        port: '3001',
        method: 'DELETE'
    }

    let req = http.request(opts, res => {
        var resData = "";
        res.on('data', chunk => {
            resData += chunk;
        })

        res.on('end', err => {
            if (res.statusCode === 400) {
                console.log(resData);
            }
            process.exit();
        })
    })
    req.on('error', err => console.log(err));
    req.end();
}

process.on('exit', unregister);
process.on('SIGINT', unregister);
process.on('SIGTERM', unregister);
process.on('uncaughtException', unregister);

app.listen(4000, () => {
    if (process.env.SELF_REGISTRY) {
        register();
    }
    console.log('service-registry is running on port 4000');
})