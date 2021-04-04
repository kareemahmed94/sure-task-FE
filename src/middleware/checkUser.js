export default function auth(to, from, next) {
    if (localStorage.getItem('jwt') && localStorage.getItem('is_v')) {
        next('/')
        return
    }
    next()
}
