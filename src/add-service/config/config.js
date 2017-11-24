export default {
    database: 'add-service',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: `${process.env.NODE_ENV}_add-service.sqlite`,
        define: {
            underscored: true
        }
    }
}