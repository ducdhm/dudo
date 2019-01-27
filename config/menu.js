const ICONS = require('./icon');

module.exports = [
    {
        id: 'dashboard',
        href: '/dashboard',
        icon: ICONS.DASHBOARD,
        text: 'Dashboard'
    },
    
    
    {
        id: 'user',
        href: '/user',
        icon: ICONS.USERS,
        text: 'Users',
        admin: true
    },
    
    
    {
        id: 'nlp',
        href: 'javascript:void(0)',
        icon: ICONS.NLP,
        text: 'NLP',
        admin: true
    },
    {
        id: 'catalog',
        href: '/catalog',
        icon: ICONS.CATALOG,
        text: 'Catalogs',
        admin: true,
        parent: 'nlp'
    },
    {
        id: 'category',
        href: '/category',
        icon: ICONS.CATEGORY,
        text: 'Categories',
        admin: true,
        parent: 'nlp'
    },
    {
        id: 'feature',
        href: '/feature',
        icon: ICONS.FEATURE,
        text: 'Features',
        admin: true,
        parent: 'nlp'
    },
    {
        id: 'intent',
        href: '/intent',
        icon: ICONS.INTENT,
        text: 'Intents',
        admin: true,
        parent: 'nlp'
    },
    
    
    {
        id: 'image',
        href: '/image',
        icon: ICONS.IMAGE,
        text: 'Images'
    }
];