Class('xui.UI.TimePicker', ['xui.UI',"xui.absValue"], {
    Dependency:['xui.Date'],
    Instance:{
        activate:function(){
            this.getSubNode('PRE').focus();
            return this;
        },
        _setCtrlValue:function(value){
            return this.each(function(profile){
                if(!profile.renderId)return;

                var cls = profile.box,
                    arr2=cls._v2a(value);
                profile.$hour=arr2[0];
                profile.$minute=arr2[1];
                
                profile.getSubNode('HI',true).removeClass(cls._excls_c3).removeClass(cls._excls_mo3);
                profile.getSubNode('HI',arr2[0]).addClass(cls._excls_c3);

                profile.getSubNode('MI',true).removeClass(cls._excls_c).removeClass(cls._excls_mo);
                profile.getSubNode('MI',arr2[1]).addClass(cls._excls_c);

                profile.getSubNode('HOUR').html(arr2[0],false);
                profile.getSubNode('MINUTE').html(arr2[1],false);
                profile.getSubNode('CAPTION').html(profile.box._showV(profile,profile.box._v2a(arr2)),false);
            });
        }
    },
    Initialize:function(){
        this.addTemplateKeys(['HI','MI']);

        var a,i,h,m,cls,cls2,id,t;

        cls=this._excls3;
        cls2=this._excls4;
        id=xui.UI.$ID;
        t='<span id="'+this.KEY+'-HI:'+id+':@" class="xui-node xui-node-span '+cls+' !" '+xui.$IEUNSELECTABLE()+' >@</span>';
        a=[];
        for(i=0;i<24;i++)
            a[a.length]=t.replace(/@/g,i<10?('0'+i):i).replace('!',((i%6===0)?cls2:'')+" xui-custom {comcls}");
        h=a.join('');
        a.length=0;

        cls=this._excls;
        cls2=this._excls2;
        id=xui.UI.$ID;
        t='<span id="'+this.KEY+'-MI:'+id+':@" class="xui-node xui-node-span '+cls+' !" '+xui.$IEUNSELECTABLE()+' >@</span>';
        a=[];
        for(i=0;i<60;i++)
            a[a.length]=t.replace(/@/g,i<10?('0'+i):i).replace('!',((i%5===0)?cls2:'') +" xui-custom {comcls}");
        m=a.join('');
        a.length=0;
        
        this.setTemplate({
            tagName : 'div',
            onselectstart:'return false',
            style:'{_style};height:auto;',
            BORDER:{
                tagName : 'div',
                BAR:{
                    tagName:'div',
                    className:'xui-uibar-top',
                    style:'{barDisplay};',
                    BART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'xui-uibar-t',
                        BARTR:{
                            tagName:'tr',
                            BARTDL:{
                                tagName:'td',
                                className:'xui-uibar-tdl'
                            },
                            BARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'xui-uibar-tdm'
                            },
                            BARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'xui-uibar-tdr'
                            }
                        }
                    },
                    BARCMDL:{
                        tagName: 'div',
                        className:'xui-uibar-cmdl',
                        PRE2:{
                            $order:0,
                            tabindex: '{tabindex}'
                        },
                        PRE:{
                            $order:1,
                            tabindex: '{tabindex}'
                        },
                        HOUR:{
                            $order:2,
                            className:'xui-ui-draggable xui-bginput xui-uiborder-inset'
                        },
                        MTXT:{$order:3,text:':'},
                        MINUTE:{
                                $order:4,
                                className:'xui-ui-draggable xui-bginput xui-uiborder-inset'
                            },
                        NEXT:{
                            $order:6,
                            tabindex: '{tabindex}'
                        },
                        NEXT2:{
                            $order:7,
                            tabindex: '{tabindex}'
                        }
                    },
                    BARCMDR:{
                        tagName: 'div',
                        className:'xui-uibar-cmdr',
                        CLOSE:{
                            className:'xui-uicmd-close ',
                            style:'{closeDisplay}'
                        }
                    }
                },
                MAIN:{
                    $order:2,
                    tagName:'div',
                    className:'xui-uicon-main',
                    MAINI:{
                        tagName:'div',
                        className:'xui-uibg-bar xui-uicon-maini',
                        CONH:{
                            tagName:'div',
                            className:'xui-uiborder-inset',
                            text:h
                        },
                        CONM:{
                            $order:2,
                            tagName:'div',
                            className:'xui-uiborder-inset',
                            text:m
                        }
                    }
                },
                TAIL:{
                    $order:3,
                    tagName:'div',
                    className:'xui-uicon-main',
                    TAILI:{
                        tagName:'div',
                        className:'xui-uibg-bar xui-uicon-maini',
                        CAPTION:{
                            text : '{caption}'
                        },
                        SET:{
                            className:'xui-ui-btn',
                            SETI:{
                                className:'xui-ui-btni',
                                SETC:{
                                    className:'xui-ui-btnc',
                                    SETA:{
                                        tabindex: '{tabindex}',
                                        text:"{_set}"
                                    }
                                }
                            }
                        }
                    }
                },
                BBAR:{
                    $order:4,
                    tagName:'div',
                    className:'xui-uibar-bottom-s',
                    BBART:{
                        cellpadding:"0",
                        cellspacing:"0",
                        width:'100%',
                        border:'0',
                        tagName:'table',
                        className:'xui-uibar-t',
                        BBARTR:{
                            tagName:'tr',
                            BBARTDL:{
                                tagName:'td',
                                className:'xui-uibar-tdl'
                            },
                            BBARTDM:{
                                $order:1,
                                width:'100%',
                                tagName:'td',
                                className:'xui-uibar-tdm'
                            },
                            BBARTDR:{
                                $order:2,
                                tagName:'td',
                                className:'xui-uibar-tdr'
                            }
                        }
                    }
                }
            }
        });
    },
    Static:{
        _shadowRB:"BBARTDR",
        _excls:'xuiex-timepicker xui-uitd',
        _excls2:'xuiex-timepicker xui-uitd xui-uitd-alt ',
        _excls3:'xuiex-timepicker3 xui-uitd',
        _excls4:'xuiex-timepicker xui-uitd xui-uitd-alt',

        _excls_mo:'xui-uitd-mouseover',
        _excls_c:'xui-uitd-checked',
        _excls_mo3:'xui-uitd-mouseover',
        _excls_c3:'xui-uitd-checked',
        _mover:function(src, type){
            var b=this,cn=src.className;
            if(type==2){
                if(cn.indexOf(b._excls_mo3)==-1)
                    src.className=cn + ' ' + b._excls_mo3;
            }else{
                if(cn.indexOf(b._excls_mo)==-1)
                    src.className=cn + ' ' + b._excls_mo;
            }
            src=null;
        },
        _mout:function(src,type){
            var b=this,cn=src.className;
            if(type==2){
                if(cn.indexOf(b._excls_mo3)!=-1)
                    src.className=cn.replace(b._excls_mo3,'');
            }else{
                if(cn.indexOf(b._excls_mo)!=-1)
                    src.className=cn.replace(b._excls_mo,'');
            }
            src=null;
        },
        Appearances:{
            KEY:{
            },
            MAINI:{
                'padding-top':'4px'
            },
            CONH:{
                width:'240px'
            },
            CONM:{
                'margin-top':'4px',
                width:'240px'
            },
            BARCMDL:{
                top:'3px'
            },
            'PRE,PRE2,NEXT,NEXT2':{
                position:'relative',
                margin:'0 2px',
                width:'15px',
                height:'15px',
                'vertical-align': 'middle',
                cursor:'default',
                'background-image': xui.UI.$bg('icons.gif', '', true),
                'background-repeat':'no-repeat',
                _zoom:1
            },
            PRE:{
                $order:1,
                'background-position': '-260px -70px'
            },
            'PRE-mouseover':{
                $order:2,
                'background-position': '-260px -90px'
            },
            'PRE-mousedown':{
                $order:3,
                'background-position': '-260px -110px'
            },
            NEXT:{
                $order:1,
                'background-position': '-280px -70px'
            },
            'NEXT-mouseover':{
                $order:2,
                'background-position': '-280px -90px'
            },
            'NEXT-mousedown':{
                $order:3,
                'background-position': '-280px -110px'
            },
            PRE2:{
                $order:1,
                'background-position': '-240px -70px'
            },
            'PRE2-mouseover':{
                $order:2,
                'background-position': '-240px -90px'
            },
            'PRE2-mousedown':{
                $order:3,
                'background-position': '-240px -110px'
            },
            NEXT2:{
                $order:1,
                'background-position': '-300px -70px'
            },
            'NEXT2-mouseover':{
                $order:2,
                'background-position': '-300px -90px'
            },
            'NEXT2-mousedown':{
                $order:3,
                'background-position': '-300px -110px'
            },
            'HOUR, MINUTE':{
                $order:3,
                margin:'0 2px',
                height:'15px',
                width:'16px',
                'font-weight':'bold',
                'vertical-align': 'middle',
                cursor:'e-resize',
                'padding-left':'2px'
            },
            SET:{
                position:'absolute',
                display:'none',
                color:'#ff0000',
                top:'1px',
                right:'5px'
            },
            TAILI:{
                position:'relative',
                'padding-top':'4px',
                height:'20px',
                'text-align':'center'
            },
            CAPTION:{
                'font-size':'12px',
                'vertical-align':xui.browser.ie6?'baseline':'middle'
            },
            '.xuiex-timepicker':{
                'font-size':"12px",
                width:'24px',
                height:'16px',
                'text-align':'center'
            },
            '.xuiex-timepicker3':{
                'font-size':"12px",
                width:'20px',
                height:'16px',
                'text-align':'center',
                'font-weight':'bold'
            }
        },
        Behaviors:{
            HoverEffected:{CLOSE:'CLOSE',PRE:'PRE',NEXT:'NEXT',PRE2:'PRE2',NEXT2:'NEXT2',SET:'SET'},
            ClickEffected:{CLOSE:'CLOSE',PRE:'PRE',NEXT:'NEXT',PRE2:'PRE2',NEXT2:'NEXT2',SET:'SET'},
            KEY:{onClick:function(){return false}},
            HOUR:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    xui(src).startDrag(e, {
                        dragType:'blank',
                        targetReposition:false,
                        widthIncrement:5,
                        dragCursor:true
                    });
                    profile.$temp2=0;
                },
                onDrag:function(profile, e, src){
                    var count,off = xui.DragDrop.getProfile().offset,v=profile.properties.$UIvalue,a=v.split(':');
                    a[0]=(parseFloat(a[0])||0)+parseInt(off.x/10,10);
                    a[0]=(a[0]%24+24)%24;
                    profile.$temp2=(a[0]<=9?'0':'')+a[0];

                    if(v[0]!=profile.$temp2)
                        profile.getSubNode('HOUR').html(profile.$temp2,false);
                },
                onDragstop:function(profile, e, src){
                    if(profile.$temp2){
                        profile.$hour=profile.$temp2;
                        profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    }
                    profile.$temp2=0;
                    profile.box._hourC(profile);
                }
            },
             MINUTE:{
                beforeMousedown:function(profile, e, src){
                    if(xui.Event.getBtn(e)!="left")return;
                    xui(src).startDrag(e, {
                        dragType:'blank',
                        targetReposition:false,
                        widthIncrement:5,
                        dragCursor:true
                    });
                    profile.$temp2=0;
                },
                onDrag:function(profile, e, src){
                    var count,off = xui.DragDrop.getProfile().offset,v=profile.properties.$UIvalue,a=v.split(':');
                    a[0]=(parseFloat(a[0])||0)+parseInt(off.x/20,10);
                    a[0]=(a[0]%60+60)%60;
                    profile.$temp2=(a[0]<=9?'0':'')+a[0];

                    if(v[0]!=profile.$temp2)
                        profile.getSubNode('MINUTE').html(profile.$temp2,false);
                },
                onDragstop:function(profile, e, src){
                    if(profile.$temp2){
                        profile.$minute=profile.$temp2;
                        profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    }
                    profile.$temp2=0;
                    profile.box._hourC(profile);
                }
            },
            SET:{
                onClick:function(profile){
                    var pro=profile.properties,
                        v=pro.$UIvalue,
                        a=v.split(':');
                    a[0]=profile.$hour;
                    a[1]=profile.$minute;
                    profile.boxing().setUIValue(a.join(':'),true,null,'click');
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            HI:{
                onMouseover:function(profile, e, src){
                    if(profile.properties.disableHoverEffect)return;
                    profile.box._mover(xui.use(src).get(0),2);
                },
                onMouseout:function(profile, e, src){
                    if(profile.properties.disableHoverEffect)return;
                    profile.box._mout(xui.use(src).get(0),2);
                },
                onClick:function(profile, e, src){
                    profile.$hour=profile.getSubId(src);
                    profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    if(profile.box)profile.box._hourC(profile);
                },
                onDblclick:function(profile, e, src){
                    profile.$hour=profile.getSubId(src);
                    profile.boxing().setUIValue(profile.$hour+":"+profile.$minute,true,null,'dblclick');
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            MI:{
                onMouseover:function(profile, e, src){
                    if(profile.properties.disableHoverEffect)return;
                    profile.box._mover(xui.use(src).get(0));
                },
                onMouseout:function(profile, e, src){
                    if(profile.properties.disableHoverEffect)return;
                    profile.box._mout(xui.use(src).get(0));
                },
                onClick:function(profile, e, src){
                    profile.$minute=profile.getSubId(src);
                    profile.boxing().setUIValue(profile.$hour+":"+profile.$minute,true,null,'click2');
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            PRE:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    var v=profile.$minute;
                    v=(parseFloat(v)||0)-1;
                    v=(v%60+60)%60;
                    profile.$minute=v=(v<=9?'0':'')+v;
                    profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            NEXT:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    var v=profile.$minute;
                    v=(parseFloat(v)||0)+1;
                    v=(v%60+60)%60;
                    profile.$minute=v=(v<=9?'0':'')+v;
                    profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            PRE2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    var v=profile.$hour;
                    v=(parseFloat(v)||0)-1;
                    v=(v%24+24)%24;
                    profile.$hour=v=(v<=9?'0':'')+v;
                    profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            NEXT2:{
                onClick:function(profile, e, src){
                    var p = profile.properties;
                    if(p.disabled||p.readonly)return;
                    var v=profile.$hour;
                    v=(parseFloat(v)||0)+1;
                    v=(v%24+24)%24;
                    profile.$hour=v=(v<=9?'0':'')+v;
                    profile.boxing()._setCtrlValue(profile.$hour+":"+profile.$minute);
                    if(profile.box)profile.box._hourC(profile);
                }
            },
            CLOSE:{
                onClick:function(profile, e, src){
                    var properties = profile.properties,
                        instance = profile.boxing();
                    if(properties.disabled||properties.readonly)return;
                    if(false===instance.beforeClose(profile, src)) return;
                    instance.destroy(true);
                }
            }
        },
        DataModel:{
            height:{
                ini:'auto',
                readonly:true
            },
            width:{
                ini:250,
                readonly:true
            },
            value:{
                ini:'00:00',
                format:'time'
            },
            closeBtn:{
                ini:true,
                action:function(v){
                    this.getSubNode('CLOSE').css('display',v?'':'none');
                }
            }
        },
        EventHandlers:{
            beforeClose:function(profile, src){}
        },
        _hourC:function(profile){
            var pro=profile.properties,
                v=pro.$UIvalue,
                a=v.split(':'),
                d = (a[0]+"")==(profile.$hour+"") && (a[1]+"")==(profile.$minute+"");
            profile.getSubNode('SET').css('display',d?'none':'block');
            profile.getSubNode('CAPTION').css('color',d?'':'#ff0000');
        },
        _prepareData:function(profile){
            var data=arguments.callee.upper.call(this, profile);
            var nodisplay='display:none';
            data.closeDisplay = data.closeBtn?'':nodisplay;
            data._set = xui.wrapRes('inline.set');
            return data;
        },
//        RenderTrigger:function(){
//            this.getSubNode('HOURTXT').html(xui.wrapRes('date.H'),false);
//        },
        _ensureValue:function(profile, value){
            var a,b=[];
            if(value&& typeof value == 'string')
                a=value.split(':')
            else if(value && typeof value=='object' && _.isArr(value))
                a=value;
            else a=[];

            b[0]= parseFloat(a[0])||0;
            b[1]=parseFloat(a[1])||0;
            if(b[0]<0)b[0]=0;
            if(b[0]>23)b[0]=23;
            if(b[1]<0)b[1]=0;
            if(b[1]>59)b[1]=59;

            b[0]=(b[0]<=9?'0':'')+b[0];
            b[1]=(b[1]<=9?'0':'')+b[1];

            return b.join(':');
        },
        formatValue:function(value){
            return value.join(':');
        },
        _v2a:function(v){
            return typeof v == 'string'? v.split(':') : v;
        },
        _showV:function(profile, a){
            var f=profile.CF;
            if(typeof f.formatCaption == 'function')
                return f.formatCaption(a);
            else
                return a.join(':');
        },
        _onresize:function(){}
    }
});