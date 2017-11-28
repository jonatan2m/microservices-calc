export default {
    database: 'users',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: `${process.env.NODE_ENV}_users.sqlite`,
        define: {
            underscored: true
        }
    },
    jwtSecret: 'D5j8EVpIqChPQynibCbt',
    jwtSession: { session: false },
    serviceRegistry: {
        url: '127.0.0.1',
        path: '/services',
        port: 3001,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
}