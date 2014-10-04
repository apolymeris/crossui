Class("xui.Template.SButton","xui.Template",{
    Constructor:function(template,properties,events,domId){
        var self=this,arr=_.toArr(arguments);
        arr[0]=arr[0]||'<span [event] class="xuit-sbtn"><span class="xuit-sbtn-btn"><span class="xuit-sbtn-btni"><span class="xuit-sbtn-btnc"><a class="xuit-sbtn-focus" href="javascript:;">{caption}</a></span></span></span></span>';
        arr[2]=arr[2]||{
            "root":{
                onMouseover:function(profile,e,src){
                    xui.use(src).tagClass('-mouseover');
                },
                onMouseout:function(profile,e,src){
                    xui.use(src).tagClass('-mouseover',false);
                    xui.use(src).tagClass('-mousedown',false);
                },
                onMousedown:function(profile,e,src){
                    xui.use(src).tagClass('-mousedown');
                },
                onMouseup:function(profile,e,src){
                    xui.use(src).tagClass('-mousedown',false);
                },
                onClick:function(profile,e,src){
                    _.tryF(profile.handler_onClick,arguments,profile.host||profile)
                }
            }
        };
        return arguments.callee.upper.apply(self,arr);
    },
    Instance:{
        setCaption:function(caption){
            return this.setProperties('caption',caption);
        },
        onClick:function(fun){
            this.handler_onClick=fun;
            return this;
        }
    }
});
