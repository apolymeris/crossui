Class("xui.Coder",null,{Initialize:function(){xui.CSS.addStyleSheet('.sh {font-family: "Courier New" , Courier, mono;font-size: 12px;border: 1px solid #92D1E4;background:#fff;}.sh .sh-con{padding-bottom:3px;background-color: #fff;}.sh .sh-cmd{padding: 3px 8px 3px 8px;font: 9px Verdana, Geneva, Arial, Helvetica, sans-serif;color: silver;border-bottom: 1px solid #EBEADB;}.sh .sh-cmd a{font-size: 12px;color: blue;text-decoration: none;margin-right: 10px;}.sh .sh-cmd a:hover{color: red;}.sh .cmd-ruler{width:25px;}.sh .sh-toggle{width:16px;cursor:pointer;font-size:14px;color:blue;vertical-align:baseline;}.sh ol{color: #FF97A9; margin: 0px 0px 0px 45px; padding: 0; border-bottom: 1px solid #EBEADB; }.sh ol li{color: #000157;border-left: 3px solid #6CE26C;padding-left: 10px;line-height: 14px;list-style: decimal none;margin:0;border-bottom: 1px dashed #E2E2E2;}.sh-con span{vertical-align:inherit;'+(xui.browser.ie?"zoom:0;":"")+"}.sh .js .comment, .sh .php .comment{ color: green; }.sh .js .string, .sh .php .string{ color: #ff1493; }.sh .js .reg, .sh .php .reg{ color: #ff1493; }.sh .js .number,.sh .php .number { color: darkred; }.sh .js .keyword, .sh .php .keyword{ color: blue; }.sh .js .keyword2, .sh .php .keyword2 { font-weight: bold; color: red; }.sh .js .special, .sh .php .special{ font-weight: bold; color: navy; }.sh .php .vars{color:#079BFA}.sh .css .comment { color: green; }.sh .css .string { color: red; }.sh .css .colors { color: darkred; }.sh .css .vars { color: #d00; }.sh .css .number { color: blue; }.sh .css .keyword {color:teal;}.sh .css .selector {font-weight: bold; color: navy;}.sh .html .comment { color: green; }.sh .html .string{ color: #ff1493; }.sh .html .script{ color: #ff1493; }.sh .html .attr { color: blue; }.sh .html .speical{color:#079BFA}.sh .html .tag { font-weight: bold; color: navy; }",this.KEY);this._profiles={js:{multicomment:this.$COM_REG.BLOCK_COMMENT,comment:this.$COM_REG.LINE_COMMENT,reg:this.$COM_REG.REG,string1:this.$COM_REG.DQ_STRING,string2:this.$COM_REG.SQ_STRING,number:this.$COM_REG.NUMBER,keyword:"try|throw|catch|finally|arguments|break|case|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|typeof|var|void|while|with|toString|valueOf|window|prototype|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity|Error",keyword2:"exists|isNull|isObj|isEmpty|isArr|isBool|isDate|isFun|isHash|isNumb|isStr|_.arr|_.bool|_.cls|_.date|_.fun|_.hash|_.numb|_.str|_.id|_|alias|host|append|toArr|breakO|tryF|each|copy|clone|filter|asyRun|resetRun|merge|each|swap|removeFrom|filter|indexOf|clean|insertAny|serialize|unserialize|Class|Instance|Initialize|Before|After|Static|Constructor|reBoxing|copy|clone|left|top|right|bottom|startWith|endWith|initial|trim|ltrim|rtrim|blen|toDom|create",special:/xui[\w\.]*|(\bon|before|after|set|get)[A-Z]\w*/},css:{multicomment:this.$COM_REG.BLOCK_COMMENT,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING],IGNORE:/\([^'")]*\)/,keyword:[/@\w[\w.\s]*/,/attr|rect|rgb|url/],selector:/[\w-:\[.#][^{};]*\{/,colors:/\#[a-zA-Z0-9]{3,6}/,number:[/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/],vars:[/(-[\w-]+)\s*[ ]*:/,/([\w-]+)\s*[ ]*:/]},php:{multicomment:this.$COM_REG.BLOCK_COMMENT,comment:this.$COM_REG.LINE_COMMENT,reg:this.$COM_REG.REG,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING],number:this.$COM_REG.NUMBER,keyword:"abs|acos|acosh|addcslashes|addslashes|array_change_key_case|array_chunk|array_combine|array_count_values|array_diff|array_diff_assoc|array_diff_key|array_diff_uassoc|array_diff_ukey|array_fill|array_filter|array_flip|array_intersect|array_intersect_assoc|array_intersect_key|array_intersect_uassoc|array_intersect_ukey|array_key_exists|array_keys|array_map|array_merge|array_merge_recursive|array_multisort|array_pad|array_pop|array_product|array_push|array_rand|array_reduce|array_reverse|array_search|array_shift|array_slice|array_splice|array_sum|array_udiff|array_udiff_assoc|array_udiff_uassoc|array_uintersect|array_uintersect_assoc|array_uintersect_uassoc|array_unique|array_unshift|array_values|array_walk|array_walk_recursive|atan|atan2|atanh|base64_decode|base64_encode|base_convert|basename|bcadd|bccomp|bcdiv|bcmod|bcmul|bindec|bindtextdomain|bzclose|bzcompress|bzdecompress|bzerrno|bzerror|bzerrstr|bzflush|bzopen|bzread|bzwrite|ceil|chdir|checkdate|checkdnsrr|chgrp|chmod|chop|chown|chr|chroot|chunk_split|class_exists|closedir|closelog|copy|cos|cosh|count|count_chars|date|decbin|dechex|decoct|deg2rad|delete|ebcdic2ascii|echo|empty|end|ereg|ereg_replace|eregi|eregi_replace|error_log|error_reporting|escapeshellarg|escapeshellcmd|eval|exec|exit|exp|explode|extension_loaded|feof|fflush|fgetc|fgetcsv|fgets|fgetss|file_exists|file_get_contents|file_put_contents|fileatime|filectime|filegroup|fileinode|filemtime|fileowner|fileperms|filesize|filetype|floatval|flock|floor|flush|fmod|fnmatch|fopen|fpassthru|fprintf|fputcsv|fputs|fread|fscanf|fseek|fsockopen|fstat|ftell|ftok|getallheaders|getcwd|getdate|getenv|gethostbyaddr|gethostbyname|gethostbynamel|getimagesize|getlastmod|getmxrr|getmygid|getmyinode|getmypid|getmyuid|getopt|getprotobyname|getprotobynumber|getrandmax|getrusage|getservbyname|getservbyport|gettext|gettimeofday|gettype|glob|gmdate|gmmktime|ini_alter|ini_get|ini_get_all|ini_restore|ini_set|interface_exists|intval|ip2long|is_a|is_array|is_bool|is_callable|is_dir|is_double|is_executable|is_file|is_finite|is_float|is_infinite|is_int|is_integer|is_link|is_long|is_nan|is_null|is_numeric|is_object|is_readable|is_real|is_resource|is_scalar|is_soap_fault|is_string|is_subclass_of|is_uploaded_file|is_writable|is_writeable|mkdir|mktime|nl2br|parse_ini_file|parse_str|parse_url|passthru|pathinfo|readlink|realpath|rewind|rewinddir|rmdir|round|str_ireplace|str_pad|str_repeat|str_replace|str_rot13|str_shuffle|str_split|str_word_count|strcasecmp|strchr|strcmp|strcoll|strcspn|strftime|strip_tags|stripcslashes|stripos|stripslashes|stristr|strlen|strnatcasecmp|strnatcmp|strncasecmp|strncmp|strpbrk|strpos|strptime|strrchr|strrev|strripos|strrpos|strspn|strstr|strtok|strtolower|strtotime|strtoupper|strtr|strval|substr|substr_compare",keyword2:"and|or|xor|__FILE__|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|old_function|return|static|switch|use|require|require_once|var|while|__FUNCTION__|__CLASS__|__METHOD__|abstract|interface|public|implements|extends|private|protected|throw",vars:/\$\w+/},html:{multicomment:this.$COM_REG.HTML_COMMENT,tag:/\x02\/?\w+/,attr:/\w+=/,script:/(>([^<][^\/]*<+)*\/)(script|style)>/,special:/<!DOCTYPE[^>]+>/,string:[this.$COM_REG.DQ_STRING,this.$COM_REG.SQ_STRING]}}},Static:{$COM_REG:{HTML_COMMENT:/<!\s*(--([^-]|[\r\n]|-[^-])*--\s*)>/,BLOCK_COMMENT:/\/\*[^*]*\*+([^\/][^*]*\*+)*\//,LINE_COMMENT:/\/\/[^\n]*/,REG:/\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/,DQ_STRING:/"(\\.|[^"\\])*"/,SQ_STRING:/'(\\.|[^'\\])*'/,NUMBER:/-?(\d*\.?\d+|\d+\.?\d*)([eE][+-]?\d+|%)?\b/},isSafeJSON:function(a){return""===this.replace(a,[[this.$COM_REG.BLOCK_COMMENT,""],[/\\["\\\/bfnrtu]/,""],[this.$COM_REG.LINE_COMMENT,""],[this.$COM_REG.DQ_STRING,""],[this.$COM_REG.SQ_STRING,""],[this.$COM_REG.REG,""],[this.$COM_REG.NUMBER,""],[/true|false|null|undefined/,""],[/[\s\u2028\u2029]/,""],[/[^{,]+:/,""],[/[\[\]\{\}\,]/,""]])},replace:function(d,b,s,a){var h,k,q,e,c,g,v=[],u=[],t=arguments.callee,r=t.reg1||(t.reg1=/\\./g),p=t.reg2||(t.reg2=/\(/g),o=t.reg3||(t.reg3=/\$\d/),l=t.reg4||(t.reg4=/^\$\d+$/),j=t.reg5||(t.reg5=/'/),f=t.reg6||(t.reg6=/\\./g),w=t.reg11||(t.reg11=/(['"])\1\+(.*)\+\1\1$/);if(!_.isArr(b)){b=[b,s]}else{a=s}if(!_.isArr(b[0])){b=[b]}_.arr.each(b,function(i){e=typeof i[0]=="string"?i[0]:i[0].source;c=i[1]||"";k=((e).replace(r,"").match(p)||"").length;if(typeof c!="function"){if(o.test(c)){if(l.test(c)){q=parseInt(c.slice(1),10);if(q<=k){c=q}}else{g=j.test(c.replace(f,""))?'"':"'";h=k;while(h+1){c=c.split("$"+h).join(g+"+a[o+"+h--+"]+"+g)}c=new Function("a,o","return"+g+c.replace(w,"$1")+g)}}}v.push(e||"^$");u.push([c,k,typeof c])});return d.replace(new RegExp("("+v.join(")|(")+")",a?"gim":"gm"),function(){var y=1,n=0,m=arguments,z,x;if(!m[0]){return""}while(z=u[n++]){if(x=m[y]){switch(z[2]){case"function":return z[0](m,y,n-1);case"number":return m[z[0]+y];default:return z[0]}}else{y+=z[1]+1}}})},formatText:function(b,e,o){var j,n,t,a=[];var r=0,s,q=20,v=function(l){var w="";while(l--){w+=" "}return w},u=[""];for(s=1;s<q;s++){u.push(v(s*4))}b=b.replace(/(\r\n|\r)/g,"\n");if(e=="html"){a.push([/[\s]*(<[\w]+[^>]+>)[\s]*/,"$1"]);a.push([/[\s]*(<\/[\w]+>)[\s]*/,"$1"]);b=this.replace(b,a);a.length=0;a.push([this.$COM_REG.HTML_COMMENT,"$0\\n"]);a.push([/<!\[CDATA\[(([^\]])|(\][^\]])|(\]\][^>]))*\]\]>/,function(l,w){return u[r]+l[w]+"\n"}]);a.push([/<input[^>]+>/,function(l,w){return u[r]+l[w]+"\n"}]);a.push([/<img[^>]+>/,function(l,w){return u[r]+l[w]+"\n"}]);a.push([/<[\w]+[^>]*\/>/,function(l,w){return u[r]+l[w]+"\n"}]);a.push([/[^<]+/,function(l,w){return u[r]+l[w]+"\n"}]);a.push([/<[\w]+[^>]*>/,function(l,w){return u[r++]+l[w]+"\n"}]);a.push([/<\/[\w]+>/,function(l,w){return u[--r]+l[w]+"\n"}]);b=this.replace(b,a,true)}else{var a=[],m=1,k=1,h=1,g=1,f=1,d=1,c=1,p={a:{},b:{},c:{},d:{},e:{},f:{},g:{}};j=this.$COM_REG;b=b.replace(/\\\r?\n/g,"");b=b.replace(/([\x01\x02\x03\x04])/g,"$1-");b=xui.Coder.replace(b,[[j.BLOCK_COMMENT.source,o?"":function(x,w){var l="\x01d"+g+++"\x02";p.d[l]=x[w];return l}],[j.LINE_COMMENT.source,o?"":function(x,w){var l="\x01e"+f+++"\x02";p.e[l]=x[w];return l}],[/\/\*@|@\*\/|\/\/@[^\n]*\n/.source,function(x,w){var l="\x01c"+h+++"\x02";p.c[l]=x[w];return l}],[j.SQ_STRING.source,function(x,w){var l="\x03a"+m+++"\x04";p.a[l]=x[w];return l}],[j.DQ_STRING.source,function(x,w){var l="\x03b"+k+++"\x04";p.b[l]=x[w];return l}],[j.REG.source,function(x,w){var l="\x03f"+d+++"\x04";p.f[l]=x[w];return l}],[/function\s*\([^)]*\)/.source,function(x,w){var l="\x03g"+c+++"\x04";p.g[l]=x[w];return l}]]);a=[["([+-])\\s+([+-])","$1 $2"],["\\b[\\s]+\\b"," "],["[\\s]+",""]];if(e=="css"){_.arr.insertAny(a,[/\s+(\.)/.source," $1"],2,true);_.arr.insertAny(a,[/(\d*\.?\d+|\d+\.?\d*)(cm|em|ex|pt|px|%|\:)?/," $0 "],-1,true)}b=xui.Coder.replace(b,a);if(!o){a=[[/[\{]/.source,function(l,w){return l[w]+"\n"+u[++r]}],[/[\x02\;]/.source,function(l,w){return l[w]+"\n"+u[r]}],[/(\,)([\x03\x04\w_\-]+\:)/.source,function(l,w){return l[w+1]+"\n"+u[r]+l[w+2]}],[/\x01/.source,function(l,w){return"\n"+u[r]+l[w]}],[/[\}]\s*[\,\;]*/.source,function(l,w){return"\n"+u[--r]+l[w]+"\n"+u[r]}]];if(e!="css"){a.push([/for\s*\([\w ]+\sin\s/.source,"$0"],[/for\s*\(([^;]*);([^;]*);([^)]*)\)/.source,"for($1; $2; $3)"],[/(,)(("[^"\n\r]*"|'[^'\n\r]*'|\w+)?(:|=>))/.source,function(l,w){return l[w+1]+"\n"+u[r]+l[w+2]}],[/\b(case|default)\b[^:]+:/.source,function(l,w){return l[w]+"\n"+u[r]}])}b=xui.Coder.replace(b,a);b=xui.Coder.replace(b,[[/ *[\n\r]/.source,"\n"],[/\{\s+\}/.source,"{}"],[/\}\n *(else|catch|finnally)/.source,"}$1"],[j.NUMBER,"$0"],[/(\/\/)|(\/\*)|(\*\/)/.source,"$0"],[/\s*((\+\+|\-\-|\&\&|\|\||!!)|([=!]==)|((<<|>>>|>>)=?)|([\+\-\*\/\%\&|^<>!=~]=?)|([?:]))\s*/.source," $1 "]])}b=xui.Coder.replace(b,[[/[\n\r]+/.source,"\n"],[/( *)(\x01[d]\d+\x02)/.source,function(w,l){w[l+1]=w[l+1]||"";return w[l+1]+p.d[w[l+2]].replace(/(\n)(\s*)/g,"$1"+w[l+1])}],[/\x03[g]\d+\x04/.source,function(w,l){return p.g[w[l]].replace(/\s*,\s*/g,","+(o?"":" "))}],[/[\x01\x03]([\w])\d+[\x02\x04]/.source,function(w,l){return p[w[l+1]][w[l]]}],[/\}\s*([\)\]])/.source,"}$1"]]);b=b.replace(/([\x01\x02\x03\x04])-/g,"$1")}return b},$xid:1,formatHTML:function(c,e,t,g,j,i){if(!j){j=""+this.$xid++}var d=this.$key,n=c,m=this,k=function(a){return a.replace(/\x02|\x03/g,function(f){return f=="\x02"?"&lt;":"&amp;"})},s=function(a){return a.replace(/<|\&/g,function(f){return f=="<"?"\x02":"\x03"})};c=c.replace(/^\s*(.*)\s*$/g,"$1");c=s(c);var q,p;if(!this._profiles[e]){e="js"}q=_.copy(this._profiles[e]);c=this.replace(c,[[/(\r\n|\r)/g,"\n"],[/( +)(\n)/g,"$2"],[/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;"],[/ /g,"&nbsp;"]]);var b=[];var o=function(u,a,f){if(u){if(!_.isArr(u)){u=[u]}_.arr.each(u,function(v){if(typeof v=="string"){v="\\b("+v+")\\b"}b.push([v,f?f:"<span class='"+a+"'>$0</span>"])})}};if(p=q.multicomment){o(p,"multicomment",function(f,u){return"<span class='comment'>"+f[u].split("\n").join("</span>\n<span class='comment'>")+"</span>"});delete q.multicomment}if(p=q.comment){o(p,"comment",function(f,u){return"<span class='comment'>"+f[u].replace("\n","")+"</span>"});delete q.comment}if(p=q.IGNORE){o(p,"IGNORE","$0");delete q.IGNORE}if(q.reg){(function(f,a){if(f){if(!_.isArr(f)){f=[f]}_.arr.each(f,function(u){if(typeof u=="string"){u="\\b("+u+")\\b"}b.push([u,"<span class='"+a+"'>$0</span>"])})}})(q.reg,"reg");delete q.reg}_.arr.each(["string1","string2","number"],function(a){if(q[a]){o(q[a],a);delete q[a]}});_.each(q,function(f,a){o(f,a)});c=this.replace(c,b);c=k(c);var h="";var l=c.split("\n");if(l[0]==""){l.shift()}if(l[l.length-1]==""){l.pop()}var r=[];r.push("<div id='"+d+":"+j+":' class='sh'>");if(t&&t[0]){r.push("<div id='"+d+"-sh-cmd:"+j+":' class='sh-cmd'>");r.push("<span class='sh-toggle' href='javascript:;' onclick='xui.Coder._toggle(this);'>"+(g?" + ":" - ")+"</span> <span class='cmd-ruler'></span>");_.arr.each(t,function(a){r.push("<a id='"+d+"-"+a+":"+j+":' href='javascript:;' onclick='xui.Coder._action(this,\""+a+"\",arguments[0]);'>"+a+"</a>")});r.push("<span>"+e+" source code viewer, powered by <a href='http://www.crossui.com' target='_blank' style='font-size:9px;color:#000157;'>CrossUI</a></span>");r.push("</div>")}r.push("<pre style='display:none'>");r.push(n.replace(/<([\w\/])/g,"&lt;$1"));r.push("</pre>");r.push("<div id='"+d+"-sh-con:"+j+":'class='sh-con' style='"+(i?"overflow:auto;height:"+i+"px;'":"")+(g?"display:none;":"")+";'><ol id='"+d+"-ol:"+j+":' start='1' class='"+e+"'><li>");r.push(l.join("&nbsp;</li><li>"));r.push("</li></ol></div>");r.push("</div>");k=s=null;_.asyRun(function(){xui.Coder._remedy(j)});return r.join("")},formatAll:function(e,d,f,c,g,b){var a=_.toArr(arguments);a[0]=this.formatText.call(this,e,d);return this.formatHTML.apply(this,a)},applyById:function(e,d){var c=0,b=this,a=function(){if(xui.Dom.byId(e)){var g,h,f;c++;g=xui(e);f=(g.get(0).className||"").split(/\s+/g);h=_.str.toDom(xui.Coder[d?"formatAll":"formatHTML"](g.text(),f[0],f[1]&&f[1].split("-"),f[2],e+":"+c));h.setSelectable(true);g.replace(h)}else{return false}};xui.Thread.repeat(a)},_remedy:function(e){var c=this.$key+":"+e+":";if(!(c=xui(c)).isEmpty()){var d=c.parent(),b=d.scrollWidth(),a=d.width();d.css("positoin","relative");if(b>a){c.width(b)}}},$action:{run:function(d,c){var b=xui(d).parent().next().text(),a=new Function([],b);a.call(xui(d).parent(2),c)},plain:function(c){var b=xui(c).parent().next().text();var b=b.replace(/</g,"&lt;");var a=window.open("","_blank","width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=1");a.document.write('<pre style="width:100%;height:100%;border:none;">'+b+"</pre>");a.document.close();a=null}},_action:function(c,a,b){if(this.$action[a]){this.$action[a](c,b||window.event)}},_toggle:function(b){var a=b.parentNode.nextSibling.nextSibling.style;if(a.display=="none"){a.display="";b.innerHTML="-"}else{a.display="none";b.innerHTML="+"}a=b=null}}});