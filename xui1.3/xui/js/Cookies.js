Class("xui.Cookies", null,{
    Static:{
        set:function(name,value,days,path,domain,isSecure){
	    if(name){
	        if(typeof value !="string")value=_.serialize(value);
    	        document.cookie = escape(name) + "=" + escape(value) +
    		        (days?";expires="+(new Date((new Date()).getTime()+(24*60*60*1000*days))).toGMTString():"")+
    		        (path?";path="+path:"")+
    		        (domain?";domain="+domain:"")+ 
    		        (isSecure?";secure":"");
    	    }
            return this;
        },
        get:function(name){
        	var i,a,s,ca = document.cookie.split( "; " ),hash={};
        	for(i=0;i<ca.length;i++){
        		a=ca[i].split("=");
        	        s=a[1]?unescape(a[1]):'';
        	        hash[a[0]]=_.unserialize(s)||s;
        		if(name && a[0]==escape(name))
        		    return hash[a[0]];
        	}
        	return name?null:hash;
        },
        remove:function(name){
        	return this.set(name,"",-1).set(name,"/",-1);
        },
        clear:function(){
            _.arr.each(document.cookie.split(";"),function(o){
                xui.Cookies.remove(_.str.trim(o.split("=")[0]));
            });
        }
    }
});