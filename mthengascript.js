const coreLangKeywords = {
    "adisthanam": "default",
    "aanengil":"if",
    "allengil": "else",
    "aavatte": "let",
    "avastha": "case",
    "asadhu": "null",
    "irakkumadhi": "import",
    "ethe": "this",
    "ene": "for",
    "il": "in",
    "udhaharanamane": "instanceof",
    "uyarnatharam": "super",
    "eriyuka": "throw",
    "ennal": "enum",
    "ethetharam": "typeof",
    "ennirikke": "while",
    "oduvil": "finally",
    "oppam": "with",
    "kayattumathi": "export",
    "kalayuka": "delete",
    "kaathirikkuka": "await",
    "ganam": "class",
    "cheyuka": "do",
    "thirikkuka": "switch",
    "thiruthal": "debugger",
    "thudaruka": "continue",
    "thett": "false",
    "nalkuka": "yield",
    "nirvahikkuka": "implements",
    "parivarthanam": "var",
    "pidikkuka": "catch",
    "puthuthaye": "new",
    "prayogam": "function",
    "podhu": "public",
    "bhantam": "package",
    "madakkam": "return",
    "mudakkuka": "break",
    "moolyanirnayam": "eval",
    "vaadam": "arguments",
    "vyartham": "void",
    "vyapipikkunnu": "extends",
    "sheri": "true",
    "shashwatham": "const",
    "shremikkuka": "try",
    "samparkkamukham": "interface",
    "surakshithamaakkapetta": "protected",
    "swakarya": "private",
    "sthaayi": "static"};

const browserObjects = {"kaanikkuka": "console.log", "munnariyippe": "alert"};

const manglish_to_english = Object.assign({}, coreLangKeywords, browserObjects);

async function loadFile(src) {

    let resp = null;
    
    try {
        
        resp = await fetch(src);

    } catch(e) {

        console.log("Error on loading file: ", e);

        return false;
        
    }

    let body = null;

    if(resp) body = await resp.text();

    return body;

};

const translate = (x) => {

    let keys = Object.keys(manglish_to_english);

    let replacer = new RegExp(keys.join("|"),"gi")

    return x.replace(replacer, matched => manglish_to_english[matched]);

};

const run = (code) => {

    try {

    eval(code);

    } catch(e) {

    console.log("Error: ", e);

    }

};

const compile = (x) => run(translate(x));

async function compileScripts() {
    
    let scripts = document.querySelectorAll("script");

    for(let script of scripts) {

        if(script.type == "text/mthengascript") {

        if(script.src) {

            let contents = await loadFile(script.src);

                compile(contents);

        } else {

            compile(script.textContent);

        }
        }
    } 
};

/* ബ്രൗസേഴ്സിന് വേണ്ടി */
if(typeof window != "undefined")
    window.addEventListener('DOMContentLoaded', compileScripts);

/* തർജ്ജമയും ഇവാലുവേഷനും നോഡിൽ ലഭ്യം */
if(typeof module != "undefined" && module.exports)
    module.exports = {translate, run, compile};