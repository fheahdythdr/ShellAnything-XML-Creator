# ShellAnything-XML-Creator
A library for creating ShellAnything XML files in NodeJS.
This README is very unfinished.

If you want more proper docs for what each function actually does in ShellAnything, go to [ShellAnything's user manual](https://github.com/end2endzone/ShellAnything/blob/master/UserManual.md)

On the Menu class, if a function only has 1 argument, it is required.
If it has 2 or more, it only requires 1 of the arguments, or the first argument, unless the function is addPropertyAction or addIcon

If you're looking at the source and wondering why I didn't use an XML parser, the ones I could find were too confusing, and it was just easier for me to use manual XML writing.

You must run the close() function on the Menu class when you're done adding things.
Run the close() function on the XML class when you're done modifying the XML file itself.

Closing a menu before closing it's submenu (if it has one) will cause that submenu's children to not appear.
