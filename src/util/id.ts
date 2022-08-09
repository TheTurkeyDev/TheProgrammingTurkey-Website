const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

export const randomUID = (length = 8) => {
    return Array.from({ length }, () => '').reduce(prev => prev + CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)], '');
};