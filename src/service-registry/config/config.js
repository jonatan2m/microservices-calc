export default {
    database: 'service-registry',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: `${process.env.NODE_ENV}_service-registry.sqlite`,
        define: {
            underscored: true
        }
    }
}