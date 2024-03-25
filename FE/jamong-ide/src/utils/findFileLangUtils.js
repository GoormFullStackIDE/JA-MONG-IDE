export const findLanguage = (extendsName) => {
    const supportLang = {
        py: 'python',
        java: 'java',
        cpp: 'c++',
        js: 'javascript',
    };

    const language = supportLang[extendsName];

    return language;
};