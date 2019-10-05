## Markd — A Rich Markdown Editor.

[![Build Status](https://travis-ci.org/0xbin/markd.svg?branch=master)](https://travis-ci.org/0xbin/markd)
[![License](https://img.shields.io/github/license/0xbin/markd.svg)](https://github.com/0xbin/markd/blob/master/LICENSE)
[![Version](https://img.shields.io/github/release/0xbin/markd.svg)](https://github.com/0xbin/markd/releases/latest)

![markd](https://user-images.githubusercontent.com/11387981/66248361-406d5480-e769-11e9-9e4c-9cb810f7e390.PNG)



### How to use it?

Include the markd `CSS` in the head section of the HTML file.

```html
<script src="https://cdn.jsdelivr.net/gh/0xbin/markd/dest/markd.min.css"></script>
```

Markd is a plugin for [DOMLang.js](https://github.com/0xbin/domlang), because of that you have include the [DOMLang.js](https://github.com/0xbin/domlang) first.

**Example →**

```html
<div id="markd"></div>

<script src="https://cdn.jsdelivr.net/gh/0xbin/domlang/dest/domlang.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/0xbin/markd/dest/markd.min.js"></script>
<script>
    const markd = $("#markd").markd();
    markd.setValue("## Hello, world!");
    let markdown = markd.getValue();
</script>
```



