/*jshint multistr:true */

QueryBuilder.define('bt-checkbox', function(options) {
    if (options.font == 'glyphicons') {
        var injectCSS = document.createElement('style');
        injectCSS.innerHTML = '\
.checkbox input[type=checkbox]:checked + label:after { \
    font-family: "Glyphicons Halflings"; \
    content: "\\e013"; \
} \
.checkbox label:after { \
    padding-left: 4px; \
    padding-top: 2px; \
    font-size: 9px; \
}';
        document.body.appendChild(injectCSS);
    }

    this.on('getRuleInput', function(h, rule, name) {
        var filter = rule.filter;

        if ((filter.input === 'radio' || filter.input === 'checkbox') && !filter.plugin) {
            h = '';

            if (!filter.colors) {
                filter.colors = {};
            }
            if (filter.color) {
                filter.colors._def_ = filter.color;
            }

            var style = filter.vertical ? ' style="display:block"' : '',
                i = 0, color, id;

            iterateOptions(filter.values, function(key, val) {
                color = filter.colors[key] || filter.colors._def_ || options.color;
                id = name +'_'+ (i++);

                h+= '\
<div'+ style +' class="'+ filter.input +' '+ filter.input +'-'+ color +'"> \
  <input type="'+ filter.input +'" name="'+ name +'" id="'+ id +'" value="'+ key +'"> \
  <label for="'+ id +'">'+ val +'</label> \
</div>';
            });
        }

        return h;
    });
}, {
    font: 'glyphicons',
    color: 'default'
});