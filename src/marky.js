!function($) {
    
    function updateHeadingStyle() {
        let headings = $(".CodeMirror .cm-header.cm-header-1, .CodeMirror .cm-header.cm-header-2, .CodeMirror .cm-header.cm-header-3, .CodeMirror .cm-header.cm-header-4, .CodeMirror .cm-header.cm-header-5, .CodeMirror .cm-header.cm-header-6");
        let hashes = [
            "<span class='cm-hash'>#</span>",
            "<span class='cm-hash'>##</span>",
            "<span class='cm-hash'>###</span>",
            "<span class='cm-hash'>####</span>",
            "<span class='cm-hash'>#####</span>",
            "<span class='cm-hash'>######</span>"
        ];
        headings.each(function() {
            if (this.attr("data-cm-set") !== "added") {
                if (this.text().indexOf("######") > -1) this.html(this.text().replace("######", hashes[5]));
                else if (this.text().indexOf("#####") > -1) this.html(this.text().replace("#####", hashes[4]));
                else if (this.text().indexOf("####") > -1) this.html(this.text().replace("####", hashes[3]));
                else if (this.text().indexOf("###") > -1) this.html(this.text().replace("###", hashes[2]));
                else if (this.text().indexOf("##") > -1) this.html(this.text().replace("##", hashes[1]));
                else if (this.text().indexOf("#") > -1) this.html(this.text().replace("#", hashes[0]));
                this.attr("data-cm-set", "added");
            }
        });
    }
    
    function updateListStyle() {
        let lists = $(".CodeMirror .cm-variable-2");
        lists.each(function() {
            if (this.attr("data-cm-set") !== "added") {
                if (this.text().trim()[0] === "*") this.html(this.text().replace("*", "<span class='cm-hash'>*</span>"))
                else if (this.text().trim()[0] === "-") this.html(this.text().replace("-", "<span class='cm-hash'>-</span>"))
                this.attr("data-cm-set", "added");
            }
        });
    }
    
    $.plugin("marky", function(onChange) {
        let wrap = this.length > 1 ? $(this[0]) : this;
        wrap.css("position", "relative");
        
        let form = $(`<form><textarea id="code" name="code"></textarea></form>`);
        let textarea = form.children()[0];
        wrap.append(form);
        form.css({
            position: "absolute",
            height: "100%",
            width: "100%"
        })
        
        let editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: false,
            mode: "markdown",
            lineWrapping: true
        });
        editor.setSize("100%", "100%");
        
        let oldValue = "";
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 13) {
                updateHeadingStyle();
                updateListStyle();
            }
            
            if (onChange !== undefined || onChange !== null) {
                if (editor.getValue() !== oldValue) {
                    oldValue = editor.getValue();
                    onChange(oldValue);
                }
            }
        }, false);
        
        document.addEventListener("paste", function(e) {
            updateHeadingStyle();
            updateListStyle();
        }, false);
        
        $(".CodeMirror-scroll").on("scroll", function(e) {
            updateHeadingStyle();
            updateListStyle();
        });
        
        return {
            getValue: function() {
                return editor.getValue();
            },
            setValue: function(s) {
                editor.setValue(s);
                updateHeadingStyle();
                updateListStyle();
            }
        }
        
    });

}($);