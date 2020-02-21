import service from './index'
const API_HOST = 'http://49.233.66.125:3000' //接口地址
export default {

    // 获取轮播图
    getBanners() {
        return service.get('banner')
    },
    // 获取推荐歌单
    getPersonalized() {
        return service.get('/personalized')
    },
    // 获取歌单详情

    getPlaylistDetails(id, offset, limit) {
        return service.get(`/playlist/detail?id=${id}&offset=${offset}&limit=${limit}`)
    },
    // 新碟
    getAlbum() {
        return service.get('/top/album?offset=0&limit=30')
    },
    // 推荐新歌
    getNewSong() {
        return service.get('/personalized/newsong')
    },
    // 推荐mv
    getPersonalizedMv() {
        return service.get('personalized/mv')
    },
    // 推荐电台
    getDjprogram() {
        return service.get('/personalized/djprogram')
    },
    // 推荐节目
    getProgram() {
        return service.get('/program/recommend')
    },
    // 获取歌手列表

    getArtistList(cat, initial, offset, limit) {
        return service.get(`/artist/list?cat=${cat}&initial=${initial}&offset=${offset}&limit=${limit}`)
    },
    // 获取歌手详情
    // /artist/desc?id=6452
    getArtistDetails(id) {
        return service.get(`/artist/desc?id=${id}`)
    },
    //获取歌手专辑 
    getArtistAlbum(id, offset, limit) {
        return service.get(`/artist/album?id=${id}&offset=${offset}&limit=${limit}`)
    },
    //获取歌手单曲 
    getArtistSong(id) {
        return service.get(`/artists?id=${id}`)
    },
    //获取歌手单曲 
    getIsPlay(id) {
        return service.get(`/check/music?id=${id}`)
    },

    //获取歌手MV
    getArtistMv(id, offset, limit) {
        return service.get(`/artist/mv?id=${id}&offset=${offset}&limit=${limit}`)
    },
    // 登录页
    // 登录页有两个接口，一个手机号，一个邮箱登录
    // 手机号登录(需传入两个参数，phone: 手机号码 password: 密码)
    loginbyTel(phone, password) {
        return service.get(`/login/cellphone?phone=${phone}&password=${password}`)
    },
    // 邮箱登录(email: 163 网易邮箱，password: 密码)
    loginbyEmail(email, password) {
        return service.get(`/login?email=${email}&password=${password}`)
    },
    // 注册页
    // 发送验证码(phone: 手机号码)
    sendCaptcha(phone) {
        return service.get(`/captcha/sent?phone=${phone}`)
    },
    // 验证验证码(phone: 手机号,captcha: 验证码)
    verifyCaptcha(phone, captcha) {
        return service.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
    },
    // 注册(captcha: 验证码,phone : 手机号码,password: 密码,nickname: 昵称)
    register( phone, password,captcha, nickname) {
        return service.get(`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`)
    },
    // 检测手机是否已被注册(phone: 手机号)
    checkTel(phone) {
        return service.get(`/cellphone/existence/check?phone=${phone}`)
    },
    // 获取用户信息
    subcount() {
        return service.get(`/user/subcount`)
    },

    // // 登录
    // login(params) {
    //     return service.post('login', params)
    // },
    // 获取大分类
    // getCats() {
    //     return service.get('/cats/lv2/statistics')
    // },
    // //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    // getCatsBooks(gender, type, major, start, minor) {
    //     if (minor) {
    //         return service.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    //     } else {
    //         return service.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=${20}`)
    //     }
    // },
    // //获取小类

    // getMinor() {
    //     return service.get('/cats/lv2')
    // },
    // // 书籍详情
    // // bookInfo: function(book_id) { // @param book_id 书籍id
    // //     return API_HOST + '/book/' + book_id
    // // },

    // bookInfo(book_id) {
    //     return service.get(`/book/${book_id}`)
    // },
    // // 短评
    // // shortReviews: function (book_id) {  // @param book_id 书籍id    完整接口 ?book=5816b415b06d1d32157790b1&limit=20&total=true&start=0&sortType=hottest
    // //     return `${API_HOST}/post/short-review?book=${book_id}&total=true&sortType=newest`
    // // },
    // shortReviews(book_id, start) {
    //     return service.get(`/post/short-review?book=${book_id}&limit=${20}&total=true&start=${start}&sortType=hottest`)
    // },
    // // 相关推荐
    // //  relatedRecommendedBooks: function (book_id) { // @param book_id 书籍id
    // //     return `${API_HOST}/book/${book_id}/recommend`
    // // },
    // relatedRecommendedBooks(book_id) {
    //     return service.get(`book/${book_id}/recommend`)
    // },
    // // 书籍章节 根据书id
    // // bookChaptersBookId: function (book_id) {
    // //     return `${API_HOST}/mix-atoc/${book_id}?view=chapters`
    // // },
    // bookChaptersBookId(book_id) {
    //     return service.get(`mix-atoc/${book_id}?view=chapters`)
    // },
    // // 章节内容
    // // chapterContent: function(link) { // @param link 章节link
    // //     return `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
    // // },
    // chapterContent(link) {
    //     return service.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    // },
    // // 排名分类
    // // rankCategory: `${API_HOST}/ranking/gender`,
    // rankCategory() {
    //     return service.get(`ranking/gender`)
    // },
    // // 排名详情
    // //  rankInfo: function (rank_id) { //@param rank_id 分类ID
    // //    return `${API_HOST}/ranking/${rank_id}`
    // // },
    // rankInfo(rank_id) {
    //     return service.get(`${API_HOST}/ranking/${rank_id}`)
    // },
    // //搜索热词
    // // hotWord: API_HOST + '/book/hot-word',
    // hotWord() {
    //     return service.get('/book/hot-word')
    // },
    // // 书籍搜索 (分类，书名，作者名)
    // //  bookSearch: function (content) { //@param content 搜索内容
    // //    return `${API_HOST}/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`
    // // },
    // bookSearch(content) {
    //     return service.get(`book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
    // }




}