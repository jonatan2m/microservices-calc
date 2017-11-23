const http = require('http')
import app from './app'
import { Buffer } from 'buffer';

const urlServiceRegistry = '127.0.0.1:3001';

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
                    url: '127.0.0.1:4000/add'
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
                process.exit();
            }
            console.log("running");
        })
    })
    req.write(new Buffer(JSON.stringify(opts.body)))
    req.end();
}

app.listen(4000, () => {
    register();
    console.log('service-registry is running on port 4000');
})