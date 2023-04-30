const fs = require('fs')
const os = require('os')
const cfgpath = `C:\\Users\\${os.userInfo().username}\\ShellAnything`

function writeXML(path, content = []) {
    const writtenString = content.join('\n')
    fs.writeFileSync(path, writtenString)
}

class Main {
    constructor() {
        let xmlcontent = []
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
            
            /**
             * Creates a new Menu class in the current Menu's children. Use Menu.findChild(name) to get the sub menu.
             * @param {string} name Name of the menu to appear in the XML or right click menu.
             * @param {string | null} description Description that appears when hovering over the menu item in the context menu.
             * @returns {Menu}
             */

            addSubMenu(name, description = "") {
                this.children.push(new Menu(name, description, this.indent));
                return this
            }

            /**
             * 
             * @param {string} path Path to the icon.
             * @param {string} index Index of the icon, ex "0". Used for when a file contains more than one icon.
             * @returns {Menu}
             */
        
            addIcon(path, index) {
                this.children.push({path: path, index: index})
                xmlcontent.push(`${this.indent}<icon path="${path}" index="${index}"/>`)
                return this
            }

            /**
             * Set the validity of the current Menu.
             * @param {string | null} maxfiles Max files selected. Optional.
             * @param {string | null} maxfolders Max folders selected. Optional.
             * @param {string | null} fileextensions File extensions allowed. Optional.
             * @param {string | null} classes 
             * @param {string | null} pattern 
             * @param {string | null} exists 
             * @param {string | null} properties 
             * @param {string | null} exptrk 
             * @param {string | null} istrue 
             * @param {string | null} isfalse 
             * @param {string | null} isempty 
             * @param {string | null} inverse 
             * @returns {Menu}
             */
        
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

            /**
             * Set the visibility of the current Menu.
             * @param {string | null} maxfiles Max files selected. Optional.
             * @param {string | null} maxfolders Max folders selected. Optional.
             * @param {string | null} fileextensions File extensions allowed. Optional.
             * @param {string | null} classes 
             * @param {string | null} pattern 
             * @param {string | null} exists 
             * @param {string | null} properties 
             * @param {string | null} exptrk 
             * @param {string | null} istrue 
             * @param {string | null} isfalse 
             * @param {string | null} isempty 
             * @param {string | null} inverse 
             * @returns {Menu}
             */

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

            /**
             * 
             * @param {string} path Path to execute.
             * @param {string | null} args Arguments to pass into the executable. Optional.
             * @returns {Menu}
             */

            addExecAction(path, args) {
                this.children.push({action: "exec", properties: {path: path, args: args}});
                this.actions.push(`${this.indent}    <exec path="${path}" arguments="${args}"/>`);
                return this
            }

            /**
             * 
             * @param {string} name ShellAnything variable to set as user input.
             * @param {string} title Title of the prompt window.
             * @returns {Menu}
             */

            addPromptAction(name, title) {
                this.children.push({action: "prompt", properties: {name: name, title: title}});
                this.actions.push(`${this.indent}    <prompt name="${name}" title="${title}"/>`);
                return this
            }

            /**
             * 
             * @param {string} path Path to open. 
             * @returns {Menu}
             */

            addOpenAction(path) {
                this.children.push({action: "open", properties: {path: path}});
                this.actions.push(`${this.indent}    <open path="${path}"/>`);
                return this
            }

            /**
             * 
             * @param {string} propertyname Name of the ShellAnything property to set.
             * @param {string} value Value to set it to.
             * @returns {Menu}
             */

            addPropertyAction(propertyname, value) {
                this.children.push({action: "property", properties: {propertyname: propertyname, value: value}});
                this.actions.push(`${this.indent}    <property name="${propertyname}" value="${value}"/>`);
                return this
            }

            /**
             * 
             * @param {string} value Value to set to clipboard.
             * @returns 
             */

            addClipboardAction(value) {
                this.children.push({action: "clipboard", properties: {value: value}});
                this.actions.push(`${this.indent}    <clipboard value="${value}"/>`);
                return this
            }

            /**
             * 
             * @param {string} title Title of the message window.
             * @param {string | null} caption Caption of the message window.
             * @param {string} icon Icon for the window.
             * @returns {Menu}
             */

            addMessageAction(title, caption, icon) {
                this.children.push({action: "message", properties: {title: title, caption: caption, icon: icon}});
                this.actions.push(`${this.indent}    <message title="${title}" caption="${caption}" icon="${icon}"/>`);
                return this
            }

            /**
             * 
             * @param {string} path Path to save file content to.
             * @param {string | null} encoding Encoding for the file.
             * @param {string} content Content to save to the file.
             * @returns {Menu}
             */

            addFileAction(path, encoding, content) {
                this.children.push({action: "file", properties: {path: path, encoding: encoding}});
                this.actions.push(`${this.indent}    <file path="${path}" encoding="${encoding}">`, `${this.indent}        ${content}`, `${this.indent}    </file>`);
                return this
            }

            /**
             * 
             * @param {string} properties 
             * @param {string} exptrk 
             * @param {string} istrue 
             * @param {string} isfalse 
             * @param {string} isempty 
             * @param {string} inverse 
             * @returns 
             */

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

            findChild(name) {
                for (const child of this.children) {
                    if (child.name == name) {
                        return child
                    }
                }
            }

            /**
             * Close the current menu element.
             */

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
        
            /**
             * Add a seperator to the context menu.
             * @returns {ShellAnythingXML}
             */

            addSeperator() {
                [`${indentAmount.repeat(2)}<menu separator="true"/>`].forEach((val, index, num) => xmlcontent.push(val))
                return this
            }
        
            /**
             * Add a menu to the context menu.
             * @param {string} name Name of the menu.
             * @param {string | null} description Description of the menu.
             * @returns {ShellAnythingXML}
             */

            addMenu(name, description) {
                this.children.push(new Menu(name, description));
                return this
            }

            /**
             * 
             * @param {string} name The name of the child
             * @returns {Menu}
             */

            findChild(name) {
                for (const child of this.children) {
                    if (child.name == name) {
                        return child
                    }
                }
            }

            /**
             * Finish the XML file, and write the result.
             */

            close() {
                xmlcontent.push('    </shell>');
                xmlcontent.push('</root>')
                writeXML(this.xmlPath, xmlcontent)
                xmlcontent = []
            }
        }
        this.xmlCreator = ShellAnythingXML
    }
}

module.exports = new Main().xmlCreator
