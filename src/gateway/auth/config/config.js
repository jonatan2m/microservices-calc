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
    jwtSession: { session: false }
}