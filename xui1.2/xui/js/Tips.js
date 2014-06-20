//singleton
Class("xui.Tips", null,{
    Constructor:function(){return null},
    Initialize:function(){
        var dd=xui.DragDrop,
            tips=this;
        if(dd)
            dd.$reset=function(){
                tips._pos={left:dd._profile.x,top:dd._profile.y}
            };

        //for: span(display:-moz-inline-box) cant wrap in firefox
        xui.CSS.addStyleSheet(
            ".xui-tips{font-size:0;line-height:0;position:absolute;overflow:visible;visibility:hidden;left:-10000px;} "+
            ".xui-tips-i{font-size:12px;overflow:hidden;position:relative;}"+
            ".xui-tips-i span{display:inline;}"+
            ".xui-tips-c {border:solid gray 1px;background-color:#FFF8DC;padding:1px 2px 2px 2px;}"
        , this.KEY);

        xui.doc
        .afterMousedown(function(){
            tips._cancel();
        },'$Tips',-1)
        .afterMousemove(function(obj, e){
            if(dd.isWorking)return;
            var event=xui.Event,p,n;

            if((p=_.resetRun.$cache) && p['$Tips']){
                tips._pos=event.getPos(e);
            }

            //it's first show
            if(tips._from){
                tips._pos=event.getPos(e);
                tips._showF();
                _.resetRun('$Tips3');
            //after show, before hide
            }else if(tips._showed && tips.MOVABLE){
                p=event.getPos(e);
                n=tips._Node.style;
                n.left = (parseInt(n.left,10)||0) + (p.left-tips._pos.left) +'px';
                n.top = (parseInt(n.top,10)||0) + (p.top-tips._pos.top) +'px';
                tips._pos=p;
            }
        },'$Tips',-1)
        .afterMouseover(function(obj, e){
            var event=xui.Event,
                rt=event.$FALSE,
                node=event.getSrc(e),
                id,
                _from,
                tempid,evid,
                index=0,
                pass,
                rtn=function(rt){
                    if(tips._markId)tips._cancel()
                    return rt;
                };
            if(!node)
                return rtn(rt);
            try{
                //for inner renderer
                while((!node.id || node.id==xui.$localeDomId) && node.parentNode!==document && index++<10)
                    node=node.parentNode;
                if(!(id=(typeof node.id=="string"?node.id:null))){
                    node=null;
                    return rtn(rt);
                }
            }catch(e){}

            //check id
            if((_from=event._getProfile(id)) && _from.box && _from.KEY=='xui.UIProfile'){
                if(_from.properties.disableTips || _from.behavior.disableTips){
                    node=null;
                    return rtn(false);
                }

                var nt=_from.behavior.NoTips;
                if(nt){
                    for(var i=0,l=nt.length;i<l;i++){
                        if(id.indexOf(_from.keys[nt[i]])===0)
                            return rtn(false);
                    }
                }
                nt=_from.behavior.PanelKeys;
                if(nt){
                    for(var i=0,l=nt.length;i<l;i++){
                        if(id.indexOf(_from.keys[nt[i]])===0)
                            return rtn(false);
                    }
                }
                //if onShowTips exists, use custom tips id region, or use item region
                tempid=_from.onShowTips?id:id.replace(tips._reg,':');
                if(tips._markId && tempid==tips._markId)
                    return rt;

                //set mark id
                tips._markId = tempid;
                tips._pos=event.getPos(e);

                if(tips._showed){
                    tips._from=_from;
                    tips._enode=id;
                    tips._showF();
                }else
                    _.resetRun('$Tips', function(){
                        tips._from=_from;
                        tips._enode=id;
                        // if mouse stop move
                        _.resetRun('$Tips3', function(){
                            if(tips._from)
                                tips._showF();
                        });
                    }, tips.DELAYTIME);
            }else
                tips._cancel();

            node=null;
            return rt;
        },'$Tips',-1)
        .afterMouseout(function(obj, e){
            if(tips._markId){
                var event=xui.Event,
                    id,
                    clear,
                    index=0,
                    node = e.toElement||e.relatedTarget;

                if(!node)
                    clear=1;
                else{
                    //for firefox wearing anynomous div in input/textarea
                    try{
                        //for inner renderer
                        while((!node.id || node.id==xui.$localeDomId) && node.parentNode!==document && index++<10)
                            node=node.parentNode;
                        if(!(id=(typeof node.id=="string"?node.id:null))){
                            node=null;
                            clear=1;
                        }
                    }catch(e){clear=1}
                }
                if(clear)
                    tips._cancel();
                return event.$FALSE;
            }
        },'$Tips',-1)
        .afterMouseup(function(obj, e){
            tips._cancel();
        },'$Tips',-1);

        this._Types = {
            'default' : new function(){
                this._r=/(\$)([\w\.]+)/g;
                this.show=function(item, pos, key){
                    //if trigger onmouseover before onmousemove, pos will be undefined
                    if(!pos)return;

                    var self=this,node,_ruler,s,w,h;
                    if(!(node=self.node) || !node.get(0)){
                        node = self.node = xui.create('<div class="xui-node xui-node-div xui-tips xui-custom"><div class="xui-node xui-wrapper xui-node-div xui-tips-i xui-custom"></div></div>');
                        _ruler = self._ruler = xui.create('<div class="xui-node xui-wrapper xui-node-div xui-tips xui-custom"><div class="xui-node xui-node-div xui-tips-i xui-custom"></div></div>');
                        self.n = node.first();
                        self._n = _ruler.first();
                        if(xui.Dom.css3Support("boxShadow")){
                            node.css("boxShadow","2px 2px 2px #717C8C");
                            _ruler.css("boxShadow","2px 2px 2px #717C8C");
                        }else if(typeof node.addShadow == 'function'){
                            node.addShadow();
                            _ruler.addShadow();
                        }
                        xui('body').append(_ruler);
                    }
                    _ruler = self._ruler;
                    //ensure zindex is the top
                    if(document.body.lastChild!=node.get(0))
                        xui('body').append(node,false,true);

                    s = typeof item=='object'? item[key||xui.Tips.TIPSKEY] :item ;
                    if(typeof s=='function')
                        s=s();
                    if(s+=""){
                        var html=/^\s*\</.test(s);
                        //get string
                        s=s.replace(self._r, function(a,b,c){
                            return xui.getRes(c);
                        });
                        xui.Tips._curTips=s;
                        if(!item.transTips || !html)
                            s='<div class="xui-node xui-node-div xui-tips-c xui-custom">'+s+'</div>';
                        //set to this one
                        self._n.get(0).innerHTML=s;

                        //get width
                        w=_ruler.get(0).offsetWidth;
                        if(!html)
                            w=Math.min(tips.MAXWIDTH, w);

                        //set content, AND dimension
                        var style=node.get(0).style, t1=self.n.get(0),styleI=t1.style;
                        //hide first
                        style.visibility='hidden';
                        //set content
                        t1.innerHTML=s;
                        //set dimension
                        if(xui.browser.ie){
                            style.width=styleI.width=w+(w%2)+'px';
                            h=t1.offsetHeight;
                            style.height=h-(h%2)+'px';
                        }else
                            styleI.width=w+'px';

                        if(pos===true){
                            style.visibility='visible';
                        }else{
                            //pop(visible too)
                            node.popToTop({left:pos.left,top:pos.top,region:{
                                left:pos.left,
                                top:pos.top-12,
                                width:24,height:32
                            }},1);
                        }
                        
                        style=styleI=t1=null;
                    }else
                        node.css('zIndex',0).hide();
                };
                this.hide = function(){
                    this.node.css('zIndex',0).hide();
                };
            }/*,
            'animate' : new function(){
                this.threadid='$tips:1$';
                this.show=function(item, pos){
                    if(!this.node){
                        this.node = xui.create('<div class="xui-node xui-node-div xui-custom" style="position:absolute;border:solid gray 1px;background-color:#FFFACD;font-size:12px;padding:3px;overflow:hidden;"></div>');
                        xui('body').append(this.node);
                    }
                    pos.left+=12;
                    pos.top+=12;
                    var s=item.tips;
                    s = s.charAt(0)=='$'?xui.wrapRes(s.slice(1)):s;
                    this.node.html(s).css('zIndex',xui.Dom.TOP_ZINDEX).cssPos(pos);
                    var w=this.node.width(),h=this.node.height();
                    this.node.cssSize({ width :0, height :0}).css('display','block').animate({width:[0,w],height:[0,h]},0,0,300,0,'expoOut',this.threadid).start();
                };
                this.hide = function(){
                    xui.Thread.abort(this.threadid);
                    this.node.height('auto').width('auto').css('display','none').css('zIndex',0);
                };
            }*/
        };
    },
    Static:{
        _reg:/-[\w]+:/,
        TIPSKEY:'tips',
        MAXWIDTH:300,
        MOVABLE:true,
        DELAYTIME:400,
        AUTOHIDETIME:5000,

        _showF:function(){
            var self=this,
                _from=self._from,
                node=xui.Dom.byId(self._enode),
                pos=self._pos,
                id,
                o,t,b=false;

            self._from=self._enode=null;

            if(!node || !_from || !pos || !(o=_from.box))return;

            //1.CF.showTips
            b=((t=_from.CF) && (t=t.showTips) && t(_from, node, pos));
            //2._showTips / onShowTips
            //check if showTips works
            if(!b)b=(o._showTips && o._showTips(_from, node, pos));

            //default tips var(profile.tips > profile.properties.tips)
            if(!b){
                if(((t=_from) && t.tips)||(t && (t=t.properties) && t.tips)){
                    self.show(pos, t);
                    b=true;
                }
                else if((t=_from) && (t=t.properties) && t.autoTips && ('caption' in t)
                    // if tips is default value, try to show caption
                    // you can settips to null or undefined to stop it
                    && t.tips===''
                    ){
                    if(t.caption){
                        self.show(pos, {tips:t.caption});
                        b=true;
                    }
                }
            }

            //no work hide it
            if(!b){
                self.hide();
            }else {
                if(!self.MOVABLE)
                    _.resetRun('$Tips2', self.hide,self.AUTOHIDETIME,null,self);
            }
            node=pos=_from=null;
        },
        getTips:function(){
            return this._curTips;
        },
        setTips:function(s){
            if(this._curTips && this._tpl&& this._Node){
                this._tpl.show(s, true);
            }
        },
        setPos:function(left,top){
            var n=this;
            if((n=n._Node)&&(n=n.style)){
                if(left||left===0)n.left=parseFloat(left)+'px';
                if(top||top===0)n.top=parseFloat(top)+'px';
            }
        },
        show:function(pos, item, key){
            var self=this,t;
            //for mousemove
            self._pos=pos;
            //same item, return
            if(self._item === item)return;

            //hide first
            //if(self._tpl)self._tpl.hide();

            //base check
            if(typeof item =='string' || (item && (item[key||xui.Tips.TIPSKEY]))){
                //get template
                t = self._tpl = self._Types[item.tipsTemplate] || self._Types['default'];
                t.show(item,pos,key);
                self._Node=t.node.get(0);
                self._item=item;
                self._showed = true;
            }else
                self._cancel();
        },
        hide:function(){
            var self=this;
            if(self._showed){
                if(self._tpl)self._tpl.hide();
                self._clear();
            }
        },
        _cancel:function(){
            var self=this;
            if(self._markId){
                if(self._showed){
                    self.hide();
                }else{
                    _.resetRun('$Tips');
                    _.resetRun('$Tips3');
                    self._clear();
                }
            }
        },
        _clear:function(){
            var self=this;
            self._Node=self._curTips=self._markId = self._from=self._tpl = self._item = self._showed = null;
        }
    }
});