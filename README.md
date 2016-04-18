Install
=======
<code>npm install node-red-contrib-wfwatch</code>

About
=====
* Simple node that watches a folder, and sends events when files are added/created/changed/deleted.
* The events send will contain the following fields in <b>payload</b>:<code>changeType</code> and <code>filePath</code></p>

Why?
====
* I made this package because the standard watch node from node-red does not seem to return full paths in Win 10 ( paths seem to be missing extensions ).
