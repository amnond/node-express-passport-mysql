// There are lots of good i18n node.js modules, but for now they are overkill...
exports.translate = function(text, lang) {
    var dicts = {};

    dicts['he'] = {
        "hello":"שלום",
        "dog":"כלב",
        "cat":"חתול",
        "Login":"כניסה למערכת"
    };

    if (!(lang in dicts) || !(text in dicts[lang]))
        return text;

    return dicts[lang][text];
}

