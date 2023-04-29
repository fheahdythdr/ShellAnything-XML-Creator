const fs = require('fs')
const os = require('os')
const cfgpath = `C:\\Users\\${os.userInfo().username}\\ShellAnything`

function writeXML(path, content = []) {
    const writtenString = content.join('\n')
    fs.writeFileSync(path, writtenString)
}

class XMLMain {
    constructor() {
        const xmlcontent = []
        const indentAmount = '    '
        class Menu {
            constructor(name, description = "", indent = '        ') {
                this.name = name
                this.description = description
                this.children = []
                this.actions = [];
                this.indent = indent + '    '
                this.previousindent = indent
                xmlcontent.push(`${indent}<menu name="${name}" description="${description}">`)
                return this
            }
        
            addSubMenu(name, description = "") {
                this.children.push(new Menu(name, description, this.indent));
                return this
            }
        
            addIcon(path, index) {
                this.children.push({path: path, index: index})
                xmlcontent.push(`${this.indent}<icon path="${path}" index="${index}"/>`)
                return this
            }
        
            setValidity(maxfiles, maxfolders, fileextensions, classes, pattern, exists, properties, exptrk, istrue, isfalse, isempty, inverse) {
                this.children.push({maxfiles: maxfiles, maxfolders: maxfolders, fileextensions: fileextensions, classes: classes, pattern: pattern, exists: exists, properties: properties, exptrk: exptrk, istrue: istrue, isfalse: isfalse, isempty: isempty, inverse: inverse})
                let str = `${this.indent}    <validity`
                if (maxfiles) str += ` maxfiles="${maxfiles}"`;
                if (maxfolders) str += ` maxfolders="${maxfolders}"`;
                if (fileextensions) str += ` fileextensions="${fileextensions}"`;
                if (classes) str += ` class="${classes}"`;
                if (pattern) str += ` pattern="${pattern}"`;
                if (exists) str += ` exists="${exists}"`;
                if (properties) str += ` properties="${properties}"`;
                if (exptrk) str += ` exptrk="${exptrk}"`;
                if (istrue) str += ` istrue="${istrue}"`;
                if (isfalse) str += ` isfalse="${isfalse}"`;
                if (isempty) str += ` isempty="${isempty}"`;
                if (inverse) str += ` inverse="${inverse}"`;
                str += '/>'
                xmlcontent.push(str)
                return this
            }
            setVisibility(maxfiles, maxfolders, fileextensions, classes, pattern, exists, properties, exptrk, istrue, isfalse, isempty, inverse) {
                this.children.push({maxfiles: maxfiles, maxfolders: maxfolders, fileextensions: fileextensions, classes: classes, pattern: pattern, exists: exists, properties: properties, exptrk: exptrk, istrue: istrue, isfalse: isfalse, isempty: isempty, inverse: inverse})
                let str = `${this.indent}    <visibility`
                if (maxfiles) str += ` maxfiles="${maxfiles}"`;
                if (maxfolders) str += ` maxfolders="${maxfolders}"`;
                if (fileextensions) str += ` fileextensions="${fileextensions}"`;
                if (classes) str += ` class="${classes}"`;
                if (pattern) str += ` pattern="${pattern}"`;
                if (exists) str += ` exists="${exists}"`;
                if (properties) str += ` properties="${properties}"`;
                if (exptrk) str += ` exptrk="${exptrk}"`;
                if (istrue) str += ` istrue="${istrue}"`;
                if (isfalse) str += ` isfalse="${isfalse}"`;
                if (isempty) str += ` isempty="${isempty}"`;
                if (inverse) str += ` inverse="${inverse}"`;
                str += '/>'
                xmlcontent.push(str)
                return this
            }

            addExecAction(path, args) {
                this.children.push({action: "exec", properties: {path: path, args: args}});
                this.actions.push(`${this.indent}    <exec path="${path}" arguments="${args}"/>`);
                return this
            }

            addPromptAction(name, title) {
                this.children.push({action: "prompt", properties: {name: name, title: title}});
                this.actions.push(`${this.indent}    <prompt name="${name}" title="${title}"/>`);
                return this
            }

            addOpenAction(path) {
                this.children.push({action: "open", properties: {path: path}});
                this.actions.push(`${this.indent}    <open path="${path}"/>`);
                return this
            }

            addPropertyAction(propertyname, value) {
                this.children.push({action: "property", properties: {propertyname: propertyname, value: value}});
                this.actions.push(`${this.indent}    <property name="${propertyname}" value="${value}"/>`);
                return this
            }

            addClipboardAction(value) {
                this.children.push({action: "clipboard", properties: {value: value}});
                this.actions.push(`${this.indent}    <clipboard value="${value}"/>`);
                return this
            }

            addMessageAction(title, caption, icon) {
                this.children.push({action: "message", properties: {title: title, caption: caption, icon: icon}});
                this.actions.push(`${this.indent}    <message title="${title}" caption="${caption}" icon="${icon}"/>`);
                return this
            }

            addFileAction(path, encoding) {
                this.children.push({action: "file", properties: {path: path, encoding: encoding}});
                this.actions.push(`${this.indent}    <file path="${path}" encoding="${encoding}"/>`);
                return this
            }

            addStopAction(properties, exptrk, istrue, isfalse, isempty, inverse) {
                let str = `${this.indent}    <stop`;
                if (properties) str += ` properties="${properties}"`;
                if (exptrk) str += ` exptrk="${exptrk}"`;
                if (istrue) str += ` istrue="${istrue}"`;
                if (isfalse) str += ` isfalse="${isfalse}"`;
                if (isempty) str += ` isempty="${isempty}"`;
                if (inverse) str += ` inverse="${inverse}"`;
                str += "/>"
                this.children.push({action: "stop", properties: {properties: properties, exptrk: exptrk, istrue: istrue, isfalse: isfalse, isempty: isempty, inverse: inverse}});
                this.actions.push(str);
                return this
            }

            /**
             * 
             * @param {string} name The name of the child
             * @returns {Menu}
             */
            
            findChildWithName(name) {
                for (const child of this.children) {
                    if (child.name == name) {
                        return child
                    }
                }
            }

            close() {
                if (this.actions.length > 0) {
                    xmlcontent.push(`${this.indent}<actions>`)
                    this.actions.forEach((val, ind, ar) => xmlcontent.push(val))
                    xmlcontent.push(`${this.indent}</actions>`)
                }
                xmlcontent.push(`${this.previousindent}</menu>`)
            }
        }
        class ShellAnythingXML {
            constructor(opts = {path: __dirname, filename: "SA_XML", putInConfigs: false}) {
                this.children = []
                this.xmlPath = ""
                if (opts.putInConfigs) {
                    if (fs.existsSync(cfgpath)) {
                        [`<?xml version="1.0" encoding="utf-8"?>`, `<root>`, `    <shell>`].forEach((val, index, num) => xmlcontent.push(val))
                        this.xmlPath = `${cfgpath}/${opts.filename}.xml`
                    }
                    else {
                        throw new Error("User does not have ShellAnything installed.");
                    }
                }
                else {
                    [`<?xml version="1.0" encoding="utf-8"?>`, `<root>`, `    <shell>`].forEach((val, index, num) => xmlcontent.push(val))
                    this.xmlPath = `${opts.path}/${opts.filename}.xml`
                }
            }
        
            addSeperator() {
                [`${indentAmount.repeat(2)}<menu separator="true"/>`].forEach((val, index, num) => xmlcontent.push(val))
                return this
            }
        
            addMenu(name, description) {
                this.children.push(new Menu(name, description));
                return this
            }

            /**
             * 
             * @param {string} name The name of the child
             * @returns {Menu}
             */

            findChildWithName(name) {
                for (const child of this.children) {
                    if (child.name == name) {
                        return child
                    }
                }
            }

            close() {
                xmlcontent.push('    </shell>');
                xmlcontent.push('</root>')
                writeXML(this.xmlPath, xmlcontent)
            }
        }
        this.xmlCreator = ShellAnythingXML
    }
}

module.exports = XMLMain
