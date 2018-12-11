const ICONS = require('./icon');

module.exports = [
    {
        id: 'dashboard',
        href: '/dashboard',
        icon: ICONS.DASHBOARD,
        text: 'Trang chủ'
    },


    {
        id: 'user',
        href: '/user',
        icon: ICONS.USERS,
        text: 'Người dùng',
        admin: true
    },


    {
        id: 'image',
        href: '/image',
        icon: ICONS.IMAGE,
        text: 'Hình ảnh'
    }
];