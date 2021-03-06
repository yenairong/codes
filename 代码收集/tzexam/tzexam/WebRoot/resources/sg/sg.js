(function($){
   /**********************silder*****************************/
   for(i in document.images)document.images[i].ondragstart=function(){return false;};	
	$.fn.tzSlider = function(options){
		var opts = $.extend({},$.fn.tzSlider.methods,$.fn.tzSlider.defaults,options);
		$("body").data("opts",opts);
		this.each(function(){
			var optss = $.extend({},$("body").data("opts"),$.fn.tzSlider.optionAttr($(this)));
			opts.init($(this),optss);
		});
	};

	$.fn.tzSlider.methods = {
		init : function($slider,opts){
			this.template($slider,opts);
			//参数初始化
			this.params($slider,opts);
			//事件的初始化
			this.events($slider,opts);
		},

		template:function($slider,opts){
			if(opts.horizontal){
				$slider.addClass("tzui-slider tzui-slider-uhorizontal");
				if(opts.height)$slider.height(opts.height);
			}else{
				$slider.addClass("tzui-slider tzui-slider-horizontal");
				if(opts.width)$slider.width(opts.width);
			}
			if(opts.bgcolor){
				$slider.append("<div class='tzui-slider-range'></div>");
			}
			$slider.append("<a class='tzui-slider-handle' draggable='false' href='javascript:void(0);'></a>");
		},

		params : function($slider,opts){
			if(!opts.horizontal){
				var maxWidth = $slider.width();
				$slider.find(".tzui-slider-handle").css("left",(maxWidth * opts.percent)/100);
				if(opts.bgcolor)$slider.find(".tzui-slider-range").width(opts.percent+"%");
			}

			if(opts.horizontal){
				var maxHeight = $slider.height();
				$slider.find(".tzui-slider-handle").css("top",(maxHeight * opts.percent)/100);
				if(opts.bgcolor)$slider.find(".tzui-slider-range").height(opts.percent+"%");
			}
			
			if(!opts.silderColor){
				if(opts.randomcolor && opts.bgcolor){
					$slider.find(".tzui-slider-range").css("background",tzUtil.getRandomColor());
				}
			}else{
				$slider.find(".tzui-slider-range").css("background","#"+opts.silderColor);
			}
			
			if(opts.load)opts.load($slider,opts.percent);
		},

		silderX:function($this,e){
			var x= e.clientX;//获取当前鼠标按下去的x轴坐标，
			//拿滑块的距离
			var left = $this.offset().left;
			var nleft = x-left;
			var maxWidth = $this.width();
			//赋予滑块的新的left
			$this.find(".tzui-slider-handle").css("left",nleft);
			//计算百分比
			var percent =  Math.ceil((nleft/maxWidth)*100);
			$this.find(".tzui-slider-range").width(percent+"%");
		},

		silderY:function($this,e){
			var y= e.clientY;//获取当前鼠标按下去的x轴坐标，
			//拿滑块的距离
			var top = $this.offset().top;
			var ntop = y-top;
			var maxHeight = $this.height();
			//赋予滑块的新的left
			$this.find(".tzui-slider-handle").css("top",ntop);
			//计算百分比
			var percent =  Math.ceil((ntop/maxHeight)*100);
			$this.find(".tzui-slider-range").height(percent+"%");
		},

		events : function($slider,opts){
			var flag = false;
			//滑块事件绑定
			var obj = this;
			$slider.mousedown(function(e){
				if(!opts.horizontal)obj.silderX($(this),e);
				if(opts.horizontal)obj.silderY($(this),e);
			});

			//滑块拖动事件绑定
			$slider.find(".tzui-slider-handle").on("mousedown",function(e){
				flag = true;
				var $this = $(this);
				var x = e.clientX;//获取当前鼠标按下去的x轴坐标，
				var y = e.clientY;//获取当前鼠标按下去的y轴坐标，
				var left = $this.position().left;//获取元素的绝对位置left
				var top = $this.position().top;//获取元素的绝对位置top
				var maxWidth = $this.parent().width();//获取滑块宽度
				var maxHeight = $this.parent().height();//获取滑块高度
				var sliderWidth = $this.width();//获取小滑块的宽度
				var sliderHeight= $this.height();//获取小滑块的高度
				var percent = 0;
				var horizontalMark = opts.horizontal;
				$(document).on("mousemove",function(ev){
					if(flag){
						if(!horizontalMark){
							var nx = ev.clientX;
							var nleft = nx+left-x+(sliderWidth/2)-4 ;
							if(nleft<=0)nleft=0;
							if(nleft > maxWidth)nleft = maxWidth;
							$this.css({left:nleft});
							percent =  Math.ceil((nleft/maxWidth)*100);
							$slider.find(".tzui-slider-range").width(percent+"%");
						}else{
							var ny = ev.clientY;
							var ntop = ny+top-y+(sliderHeight/2)-4 ;
							if(ntop<=0)ntop=0;
							if(ntop > maxHeight)ntop = maxHeight;
							$this.css({top:ntop});
							percent =  Math.ceil((ntop/maxHeight)*100);
							$slider.find(".tzui-slider-range").height(percent+"%");
						}
					}
				}).on("mouseup",function(){
					flag = false;
					if(opts.callback)opts.callback($slider,percent);
				});
			}).on("mouseup",function(){
				flag = false;	
			});
		}
	};

	$.fn.tzSlider.optionAttr = function($slider){
		return {
			width:$slider.data("width"),
			height:$slider.data("height"),
			percent:$slider.data("percent"),
			bgcolor:$slider.data("bgcolor"),
			silderColor:$slider.data("sildercolor"),
			horizontal:	$slider.data("horizontal")
		};
	};

	$.fn.tzSlider.defaults = {
		bgcolor :true,
		percent:20,
		width:0,
		height:0,
		horizontal:true,
		randomcolor:true,
		silderColor:"",
		load:function($silder,percent){

		},
		callback:function($silder,percent){
		
		}
	};
	
	$.fn.tmTip = function(options){
		return this.each(function(){
			var opts = $.extend({},$.fn.tmTip.defaults,options,$.fn.tmTip.parseOptions($(this)));
			if(opts.event=='hover'){
				$(this).hover(function(){
					tipInit($(this),opts);
				},function(){
					if(opts.event!='click'){
						$('.tm-tips').remove();
					}
				});
			}
			
			if(opts.event=='click'){
				$(this).click(function(){
					tipInit($(this),opts);
				});
			}
			
			
			$(this).blur(function(){
				$('.tm-tips').remove();
			});
			/*.mouseleave(function(){
				$('.tm-tips').remove();
			});*/
		});
		
		function tipInit($this,opts){
			$('.tm-tips').remove();
			var content = opts.tip;
			if(opts.proxy)content = $this.find(opts.proxy).html();
			if(isEmpty(content))content = opts.title;
			if(isEmpty(content))content = $this.attr("placeholder");
			if(isEmpty(content))content = $this.text();
			if(isEmpty(content))content = "提示";
			$("body").append('<div class="tm-tips"><div class="tm-window-tip tooltip-nightly"><div id="tm-tip-content"></div></div><div class="tooltip-nightly-arrow"></div><div>');
			$('#tm-tip-content').css("textAlign",opts.contentAlign).html(content);//设置内容
			if(opts.width!=0){$(".tm-window-tip").css({width:opts.width});}/*设置高度如果高度设置为0：则为自动高度*/
			if(opts.height!=0){$(".tm-window-tip").css({height:opts.height});}/*设置高度如果高度设置为0：则为自动高度*/
			var _selfWidth = $(".tm-window-tip").width();//tip框的宽度
			var _selfHeight = $(".tm-window-tip").height();//tip框的高度
			var height = $this.height();/*元素自身高度*/
			var width = $this.width();/*元素自身宽度*/
			var offsetLeft = $this.offset().left;/*元素的相对左边距*/
			var offsetTop = $this.offset().top;/*元素的相对顶部距离*/
			var bodyWidth = $("body").innerWidth();
			var bodyHeight = $("body").innerHeight();
			var fixWidth = offsetLeft+_selfWidth+width;
			var fixHeight = offsetTop+_selfHeight+height;
			var left = 0;
			var top = 0;
			var arrowLeft = 0;
			var arrowTop = 0;
			
			/*如果offsetLeft=0的情况下*/
			if(offsetLeft==0 || offsetLeft<_selfWidth){
				if(opts.arrow=='rightTop')opts.arrow = "leftTop";
				if(opts.arrow=='rightMiddle')opts.arrow = "leftMiddle";
				if(opts.arrow=='rightBottom')opts.arrow = "leftBottom";
				if(opts.arrow=='topRight')opts.arrow = "topLeft";
				if(opts.arrow=='topMiddle')opts.arrow = "topLeft";
				if(opts.arrow=='bottomMiddle')opts.arrow = "bottomLeft";
				if(opts.arrow=='bottomRight')opts.arrow = "bottomLeft";
			}
			
			if(offsetTop==0 || offsetTop < _selfHeight){
				opts.arrow = "topMiddle";
			}
			
			if(fixWidth > bodyWidth ){
				if(opts.arrow=='topLeft')opts.arrow = "topRight";
				if(opts.arrow=='topMiddle')opts.arrow = "topRight";
				if(opts.arrow=='bottomMiddle')opts.arrow = "bottomRight";
				if(opts.arrow=='bottomLeft')opts.arrow = "bottomRight";
				if(opts.arrow=='leftTop')opts.arrow = "rightTop";
				if(opts.arrow=='leftMiddle')opts.arrow = "rightMiddle";
				if(opts.arrow=='leftBottom')opts.arrow = "rightBottom";
			}
			
			if(fixHeight > bodyHeight){
				opts.arrow = "bottomMiddle";
			}	
			
			
			if(opts.arrow=='topMiddle'){
				left = offsetLeft - _selfWidth/2+width/2  ;
				top = offsetTop+height+10;
				arrowLeft = offsetLeft+width/2-5 ;
				arrowTop = offsetTop +height-2;
			}
			
			if(opts.arrow=='topLeft'){
				left = offsetLeft + width/2;
				top = offsetTop+height+14;
				arrowLeft = offsetLeft+(width/2)+7;
				arrowTop = offsetTop +height+4;
			}
			
			if(opts.arrow=='topRight'){
				left = offsetLeft - _selfWidth+width/2;
				top = offsetTop+height+10;
				arrowLeft = offsetLeft+width/2-16;
				arrowTop = offsetTop +height ;
			}
			
			if(opts.arrow=='bottomLeft'){
				top = offsetTop-_selfHeight-13 ;
				left = offsetLeft +width/2;
				arrowLeft = offsetLeft+width/2+12 ;
				arrowTop = offsetTop-10;
			}
			
			if(opts.arrow=='bottomMiddle'){
				top = offsetTop-_selfHeight-16 ;
				left = offsetLeft - _selfWidth/2 +width/2 ;
				arrowLeft = offsetLeft+width/2-4 ;
				arrowTop = offsetTop-12;
			}
			
			if(opts.arrow=='bottomRight'){
				top = offsetTop-_selfHeight-13 ;
				left = offsetLeft -_selfWidth+width/2;
				arrowLeft = offsetLeft+width/2-18;
				arrowTop = offsetTop-10;
			}
			
			if(opts.arrow=='leftTop'){
				left = offsetLeft +width+14;
				top = offsetTop;
				arrowLeft = offsetLeft+width+2;
				arrowTop = offsetTop+12;
			}
			if(opts.arrow=='leftMiddle'){
				left = offsetLeft +width+12;
				top = offsetTop - _selfHeight/2+2;
				arrowLeft = offsetLeft+width-2;
				arrowTop = offsetTop;
			}
			if(opts.arrow=='leftBottom'){
				left = offsetLeft +width+12;
				top = offsetTop-_selfHeight+12;
				arrowLeft = offsetLeft+width;
				arrowTop = offsetTop-1;
			}
			
			if(opts.arrow=='rightTop'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop+14;
			}
			if(opts.arrow=='rightMiddle'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop - _selfHeight/2+2;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop;
			}
			if(opts.arrow=='rightBottom'){
				left = offsetLeft -_selfWidth-16;
				top = offsetTop - _selfHeight;
				arrowLeft = offsetLeft-12;
				arrowTop = offsetTop-16;
			}
			if(!opts.hideArrow){
				$(".tooltip-nightly-arrow").addClass("tooltip-nightly-"+opts.arrow);
			}
			if(isEmpty(opts.arrow))opts.arrow = "bottomMiddle";
			var st = 2;
			opts.border = "2px solid #333";
			opts.background = opts.background||"#333";
			$(".tooltip-nightly-arrow").addClass("tooltip-nightly-"+opts.arrow+"-black");
			$(".tooltip-nightly-arrow").css({left:(arrowLeft+opts.offLeft),top:(arrowTop+opts.offTop)});
			$(".tm-window-tip").css({left:left+"px",top:(top+st),opacity:1,border:opts.border,background:opts.background,color:opts.fontColor});
			$('.tm-tips').click(function(){
				$(this).remove();
			});
		}	
	};

	$.fn.tmTip.parseOptions = function($target) {
		return {
			width : $target.data("width"),
			height : $target.data("height"),
			tip : $target.attr("tip"),
			title:$target.attr("title"),
			event:$target.data("event"),
			arrow:$target.data("arrow"),
			offLeft:$target.data("offLeft"),
			offTop:$target.data("offTop"),
			background:$target.data("background"),
			border:$target.data("border"),
			color:$target.data("color"),
			proxy:$target.data("proxy")
		};
	};
	$.fn.tmTip.defaults ={
		width : 0,//宽度
		height : 0,//高度如果为0则为自动高度
		title:"",//如果tip为空用title
		event:"hover",//触发的事件类型
		arrow:"bottomMiddle",
		hideArrow:false,//是否隐藏方向箭头
		background:"",//设置背景
		border:"",
		proxy:"",
		tip : "",//内容
		contentAlign:"left",
		offLeft:0,//左部偏移
		offTop:0,//顶部移动
		color:"black"
	};



	/********************tab***************************/
	$.fn.tzTab = function(options){
		var opts = $.extend({},$.fn.tzTab.methods,$.fn.tzTab.defaults,options);
		this.each(function(){
			var optss = $.extend({},opts,$.fn.tzTab.parseOptions($(this)));
			opts.init($(this),optss);
		});
	};

	$.fn.tzTab.methods = {
		init : function($tab,opts){
			$tab.addClass("tzui-tabs");
			var $ul = $("<ul class='tzui-tabs-nav'></ul>");
			var liHtml = "";
			var contentHtml = "";
			var jdata = opts.tabDatas;
			var length = jdata.length;
			var className = "tzui-state-default";
			
			if(opts.index==0 || opts.index>length)opts.index=0;//边界判断
			for(var i=0;i<length;i++){
				var classStyle = "display:none";
				if(opts.index == i){
					className="tzui-tabs-active tzui-state-active";
					classStyle="";
				}
				liHtml+= "<li tab='tab-"+i+"' data-url='"+jdata[i].url+"' class='"+className+"'><a href='javascript:void(0)' class='tzui-tabs-anchor'>"+jdata[i].title+"</a></li>";
				contentHtml+="<div id='tab-"+i+"' class='tzui-tabs-panel' style='"+classStyle+"'>"+jdata[i].content+"</div>";
				className = "";					
			}
			$ul.html(liHtml);
			$tab.append($ul);
			//面板内容
			$tab.append(contentHtml);
			if(opts.width)$tab.width(opts.width);
			if(opts.height)$tab.height(opts.height);
			if(opts.background){
				$tab.css("border","2px solid "+opts.background);
				$ul.css({"background":opts.background});
				$ul.find("li>a").filter(function(){
					if(!$(this).parent().hasClass("tzui-state-active")){
						$(this).css({"background":opts.background,"color":"#fff"});
					}
				});
			}

			if(opts.linear && opts.border){
				$tab.css("border","2px solid "+opts.border);
				$ul.css({"background":"linear-gradient("+opts.linear+")"});
				$ul.find("li>a").filter(function(){
					if(!$(this).parent().hasClass("tzui-state-active")){
						$(this).css({"background":"linear-gradient("+opts.linear+")","color":"#fff"});
					}
				});
			}

			$tab.find(".tzui-tabs-nav > li").on(opts.event,function(){
				var markFlag = $(this).hasClass("tzui-tabs-active");
				if(markFlag)return;
				var tab = $(this).attr("tab");
				$(this).addClass("tzui-tabs-active tzui-state-active").siblings().removeClass("tzui-tabs-active tzui-state-active");
				$tab.find(".tzui-tabs-panel").hide();
				var $content = $tab.find("#"+tab);
				$content.show();
				$(this).find("a").removeAttr("style");
				if(opts.linear && opts.border){
					$(this).siblings().find("a").css({"background":"linear-gradient("+opts.linear+")","color":"#fff"});
				}else{
					$(this).siblings().find("a").css({"background":opts.background,"color":"#fff"});
				}
				if(opts.callback)opts.callback($(this),$content);
				//当前元素解绑事件
			});

			
		}
	};

	$.fn.tzTab.parseOptions = function($target){
		var datas = $target.find(".data").text();
		var json = {
			width:$target.data("width"),//选项卡的宽度
			height:$target.data("height"),//选项卡的高度
			event:$target.data("event"),//选项卡的事件类型
			background:$target.data("background"),
			linear:$target.data("linear"),
			border:$target.data("border"),
			index:$target.data("index")//默认选择哪一个
		};
		if(datas)json["tabDatas"]=eval("("+datas+")");
		return json;
	};

	$.fn.tzTab.defaults = {
		width:600,//选项卡的宽度
		height:300,//选项卡的高度
		event:"click",//选项卡的事件类型
		background:"#4684b2",
		linear:"",
		border:"",
		index:2,//默认选择哪一个
		callback:function($current,$content){
			
		},
		tabDatas:[
			{title:"选项卡1",content:"士大夫收到111","url":"user.action"},
			{title:"选项卡2",content:"士大夫收到22222","url":"delete.action"},
			{title:"选项卡3",content:"选项卡3333"}
		]
	};


	/**********************drag***********************/
	$.fn.tzDrag = function(options){
		var opts = $.extend({},$.fn.tzDrag.methods,$.fn.tzDrag.defaults,options);
		this.each(function(){
			var optss = $.extend({},opts,$.fn.tzDrag.parseOptions($(this)));
			opts.init($(this),optss);	
		});
	};

	$.fn.tzDrag.methods = {
		init:function($dialog,opts){//层拖动
			var thisObj = this;
			var mark = false;
//			$dialog.css("position","absolute");
			var $dialogClone  = null;
			$dialog.on("mousedown",opts.handler,function(e){
				//镜像
				tzUtil.forbiddenSelect();
				if(opts.ghost)$dialogClone= thisObj.ghsot($dialog,opts);
				var $this = $(this).parent();

				if(!opts.handler){
					$this=$(this);
				}

				var x = e.clientX;
				var y = e.clientY;
				var left = $this.offset().left;
				var top = $this.offset().top;
				var w = $this.width();
				var h = $this.height();
				var offsetHeight = $this.parent().height() - h-2;
				//var offsetHeight = $(document).height() - h-2;
				var offsetWidth= $this.parent(). width() - w-2;
				var stop= $(window).scrollTop();
				var jsonData = {};
				jsonData.width=w;
				jsonData.height=h;
				mark = true;
				$(document).on("mousemove",function(e){
					if(mark){
						var nx = e.clientX;
						var ny = e.clientY;
						var nl = nx + left - x;
						var nt = ny + top - y - stop;
						if(nl<=0)nl=1;
						if(nt<=0)nt=1;
						if(nl>=offsetWidth)nl = offsetWidth;
						if(nt>=offsetHeight)nt = offsetHeight;
						jsonData.left = nl;
						jsonData.top = nt;
						if(opts.ghost){
							$dialogClone.css({left:nl,top:nt});	
						}else{
							$this.css({left:nl,top:nt});	
						}
						if(opts.move)opts.move(jsonData,$this);
					}

				}).on("mouseup",function(){
					if(opts.ghost){
						$dialogClone.remove();
						$this.css({left:jsonData.left,top:jsonData.top});	
					}
					tzUtil.autoSelect();
					if(opts.up)opts.up($this);
					mark = false;
				});
			});
		},
		ghsot:function($dialog,opts){
			var $dialogClone = $dialog.clone();
			$dialogClone.css({"background":"#f9f9f9","opacity":0.5,"border":"1px dotted #ccc"}).find(".tzui-empty").empty();
			$("body").append($dialogClone);
			return $dialogClone;
		}	


	   };

	   $.fn.tzDrag.parseOptions = function($dialog){
			return {
				handler:$dialog.data("handler"),
				ghost:$dialog.data("ghost")
			};
	   };

	   $.fn.tzDrag.defaults = {
			handler:"",//拖动代理
			ghost:true,//是否产生镜像
			move:function(opts){
			},
			up:function(opts){
			}

	   };

})(jQuery);




//jquery插件的定义方式
var tzLoading = function(message,options){
	var opts = $.extend({},options);
	this.init(message,opts.timeout,opts);
};

tzLoading.prototype = {
	init : function(message,timeout,opts){
		var $loading = this.template(message,opts);
		if($loading){
			//定位	
			tzUtil._position($loading).resize($loading);
			//事件绑定
			this.events($loading,function(){
				if(opts.top)$loading.css("top",opts.top);
				if(opts.left)$loading.css("left",opts.left);
			});
			//时间关闭
			this.timeout($loading,timeout);
		}
	},
	
	template:function(content,opts){
		var $loading = $("#tzloading");
		if(content=="remove"){
			tzUtil.animates($loading,"slideUp");
			return;
		}
		if($loading.length==0){
			if(content=="remove"){
				tzUtil.animates($loading,"slideUp");
				return;
			}
			$loading = $("<div id='tzloading' class='tzui-loading "+tz_animateIn()+"'></div>");
			var $loadingGif = $("<div class='tzui-loading-gif'></div>");
			var $loadingContent = $("<div class='tzui-loading-cnt'></div>");
			$loadingContent.html(content);
			$loading.append($loadingGif).append($loadingContent);
			$("body").append($loading);
			if(opts.overlay){
				$("body").append("<div class='tzui-loading-overlay'></div>");
				$loading.next().click(function(){
					$(this).remove();
					$loading.trigger("click");
				});
			}
		}else{
			$loading.find(".tzui-loading-cnt").html(content);
		}
		
		if(opts.height)$loading.height(opts.height);
		return $loading;
	},

	events :function($loading,callback){
		$loading.click(function(){
			tzUtil.animates($(this),"slideUp",function(){
				if(callback)callback();
			});
		});
	},

	timeout:function($loading,timeout){
		var timr = null;
		if(isNotEmpty(timeout+"") && timeout >0){
			clearTimeout(timr);
			timr = setTimeout(function(){
				//事件的触发
				$loading.trigger("click");
			},timeout*500);
		}
	}
};

var loading = function(message,timeout,overlay){
	new tzLoading(message,{"timeout":timeout,overlay:overlay});
};

/*******************dialog**********************************/
//dialog的弹出层
$.tzConfirm = function(options){
	var opts = $.extend({},$.tzDialog.methods,$.tzDialog.defaults,options);
	opts.icon = "warn";
	opts.init(opts);
};

$.tzPrompt = function(options){
	var opts = $.extend({},$.tzDialog.methods,$.tzDialog.defaults,options);
	var $dialog = opts.init(opts);
	var mw= opts.width - 68;
	if(opts.textarea){
		var mh = opts.height - 120;
		$dialog.find(".tzdialog_message").html("<div style='width:"+mw+"px;margin:0 auto;text-align:left'>" +
				"<p><textarea class='dtext' autofocus='autofocus' style='overflow:auto;line-height:22px;font-size:12px;width:"+mw+"px;height:"+mh+"px;border:1px solid #ccc;' placeholder='请输入内容...'>"+opts.value+"</textarea></p></div>");
		
	}else{
		$dialog.find(".tzdialog_message").html("<div style='width:"+mw+"px;margin:0 auto;text-align:left'><p>&nbsp;&nbsp;"+opts.content+":</p>" +
				"<p><input type='text'  class='dtext' autofocus='autofocus' style='width:"+mw+"px;height:25px;text-indent:0.5em;border:1px solid #ccc;' value='"+opts.value+"' placeholder='请输入内容...'></p></div>");
	}
	$dialog.find(".tzdialog_message").find(".dtext").select();
	//这个确定按钮事件
	$dialog.find(".tzdialog_ok").off("click").on("click",function(){
		var $input = $dialog.find(".tzdialog_message").find(".dtext");
		var value = $input.val().trim();
		if(value==""){
			loading("请输入内容!",2);
			$input.select();
			return;
		}
		if(opts.validator($input)){
			if(opts.callback)opts.callback(value);//回调方法
			$dialog.next().remove();
			tzUtil.animates($dialog,opts.animate);
		}
	});
};


$.tzIframe = function(options){
	var opts = $.extend({},$.tzDialog.methods,$.tzDialog.defaults,options);
	var $dialog = opts.init(opts);
	$dialog.find(".tzdialog_message").html("<div  class='tm-dialog-loading tmWindow_loading'><img src='"+rootPath+"/images/loading.gif'><label style='font-size:12px;'>请稍后，正在加载中...</label></div>");
	var iframe=document.createElement("iframe");
	iframe.id = opts.dialogId+"_iframe";
	iframe.width="100%";
	iframe.height="100%";
	iframe.scrolling="no";
	iframe.frameborder ="0";
	var src = "";
	if(opts.content.indexOf("?")==-1){
		src = opts.content+"?window=true";
	}else{
		src = opts.content+"&window=true";
	}
	iframe.src=src;
	iframe.style.display ="none";
	$(iframe).attr("frameborder","0");
	var h = 42;
	if(!opts.showButton)h=42;
	$dialog.find(".tzdialog_message").height(opts.height-h).css("padding","1px").append(iframe);
	$(iframe).load(function(){
		$dialog.find(".tmWindow_loading").remove();
		iframe.style.display ="block";
		if(opts.loadSuccess)opts.loadSuccess(iframe.contentWindow);
	});
	$dialog.find(".tzdialog_ok").off("click").on("click",function(){
		if(opts.callback)opts.callback(iframe.contentWindow,$dialog,opts);
	});
};

$.tzDialog = {};

$.tzAlert = function(options){
	var opts = $.extend({},$.tzDialog.methods,$.tzDialog.defaults,options);
	opts.icon = "tip";
	opts.init(opts);
	//var $dialog = opts.init(opts);
//	$dialog.find(".tzdialog_cancel").remove();
};

$.tzDialog.methods = {
	//初始化
	init:function(opts){
		var $dialog = this.template(opts);
		//弹出层事件初始化
		this.events($dialog,opts);
		this.params($dialog,opts);
		var btns = opts.buttons;
		for(var key in btns){
			$dialog.append("<a class='btns' href='javascript:void(0);'>"+key+"</a>&nbsp;&nbsp;");
		}
		$dialog.find("a.btns").click(function(){
			var text = $(this).text();
			btns[text].call($dialog);
		});	
		
		return $dialog;
	},
	params:function($dialog,opts){
		if(opts.width)$dialog.width(opts.width);
		if(opts.height){
			if(opts.height<=160)opts.height=160;
			$dialog.height(opts.height);
		}
		$dialog.find(".tzdialog_message").css({"textAlign":"center","lineHeight":opts.height-135+"px"}).height(opts.height-135);
		//弹出层居中
		tzUtil._position($dialog,1);
		//拖动事件的绑定
		if(opts.drag)$dialog.tzDrag({handler:".tzdialog_title","ghost":opts.ghost});
	},
	
	//弹出层的模板
	template : function(opts){
		var $dialog = $("<div class='tzui-dialog "+tz_animateIn(13)+"'>"+
		"		<h1 class='tzdialog_title'>"+opts.title+"</h1>" +
		"		<a href='javascript:void(0);' class='delete'>x</a>"+
		"		<div class='tzdialog_content tzui-empty'>"+
		"			<div class='tzdialog_message'>" +
		"			<span class='icon "+opts.icon+"'></span>" +
		"			<span class='content'>"+opts.content+"</span></div>"+
		"			<div class='tzdialog_panel'>"+
		"				<input type='button' value='&nbsp;"+opts.sureText+"&nbsp;' class='tzdialog_ok'> "+
		"				<input type='button' value='&nbsp;"+opts.cancelText+"&nbsp;' class='tzdialog_cancel'>"+
		"			</div>"+
		"		</div>"+
		"	</div>");
		$("body").append($dialog).append("<div class='tmui-overlay'></div>");
		if(!opts.showButton)$dialog.find(".tzdialog_panel").remove();
		return $dialog;
	},
	events:function($dialog,opts){
		//这个确定按钮事件
		$dialog.find(".tzdialog_ok").on("click",function(){
			if(opts.callback)opts.callback(true);//回调方法
			$dialog.next().remove();
			tzUtil.animates($dialog,opts.animate);
		});

		//关闭按钮事件
		$dialog.find(".tzdialog_cancel,.delete").on("click",function(){
			if(opts.callback)opts.callback(false);//回调方法
			$dialog.next().remove();
			tzUtil.animates($dialog,opts.animate);
		});

		//响应事件
		var timer = null;
		$(window).resize(function(){
			clearTimeout(timer);
			timer = setTimeout(function(){tzUtil._position($dialog);},30);
		});
	}
};

//弹出层的默认参数
$.tzDialog.defaults = {
	width:272,
	handle:".tzdiaog_title",
	height:200,
	title:"标题",
	icon:"success",
	drag:true,
	ghost:true,
	textarea:false,
	value:"",
	animate:"top",
	showButton:true,
	cancelText:"取消",
	sureText:"确定",
	validator:function($input){
		return true;
	},
	callback:function(ok){
	},
	content:"请输入内容..."
};

var ajaxTimeout = null;
$.tzAjax = {
	request : function(options,dataJson){
		var opts = $.extend({},{limit:true,before:function(){
		},error:function(){
			
		},callback:function(data){
			
		}},options);
		var _url = opts.url;
		if(isEmpty(_url)){
			_url = basePath+"/"+opts.model+"/"+opts.method;
		}
		if(isNotEmpty(opts.params)){
			_url+="&"+opts.params;
		}
		
		if(opts.limit){
			clearTimeout(ajaxTimeout);
			ajaxTimeout = setTimeout(function(){
				$.tzAjax.ajaxMain(opts,_url,dataJson);
			},200);
		}else{
			$.tzAjax.ajaxMain(opts,_url,dataJson);
		}
	},
	ajaxMain:function(opts,_url,dataJson){
		$.ajax({
			type:"post",
			data : dataJson,
			url : _url,
			beforeSend:function(){opts.before();},
			error:function(){loading("抱歉！因为操作不能够及时响应，请稍后在试...",1);opts.error();clearTimeout(ajaxTimeout);},
			success:function(data){
				if(data=="logout"){
					//loading("session超时,请登录...",4);
					//parent.window.location.href = rootPath+"/login";
					parent.$.tzIframe({drag:false,title:"",content:rootPath+"/loginDialog",showButton:false,width:375,height:460});
				}else if(data=="nopermission"){
					loading("非常抱歉,您没有权限...",4);
					parent.window.location.href = rootPath+"/error";
				}else{
					if(opts.callback)opts.callback(data);
				}
				clearTimeout(ajaxTimeout);
			}
		});
	}
};


$.tmCookie = {
	setCookie : function(name, value,time,option){
	    var str=name+'='+escape(value); 
	    var date = new Date();
	    date.setTime(date.getTime()+this.getCookieTime(time)); 
	    str += "; expires=" + date.toGMTString();
	    if(option){ 
	        if(option.path) str+='; path='+option.path; 
	        if(option.domain) str+='; domain='+option.domain; 
	        if(option.secure) str+='; true'; 
	    } 
	    document.cookie=str; 
	},
	
	getCookie : function(name){
		var arr = document.cookie.split('; '); 
	    if(arr.length==0) return ''; 
	    for(var i=0; i <arr.length; i++){ 
	        tmp = arr[i].split('='); 
	        if(tmp[0]==name) return unescape(tmp[1]); 
	    } 
	    return ''; 
	},
	
	delCookie : function(name){
		$.tmCookie.setCookie(name,'',-1); 
		var date=new Date();
        date.setTime(date.getTime()-10000);
		document.cookie=name+"=; expire="+date.toGMTString()+"; path=/";
	},
	
	getCookieTime : function(time){
	   if(time<=0)return time;
	   var str1=time.substring(1,time.length)*1;
	   var str2=time.substring(0,1);
	   if (str2=="s"){
	        return str1*1000;
	   }
	   else if (str2=="m"){
	       return str1*60*1000;
	   }
	   else if (str2=="h"){
		   return str1*60*60*1000;
	   }
	   else if (str2=="d"){
	       return str1*24*60*60*1000;
	   }
	}
};


$.tzConsole = (function(){
var arr =[];
var speed = 50;
var wordbox = null;
var c = "",index = 0,pos = 0;
var strLen = 0,tlen =0;
	var row = 0;
	function setData(targetId,sp,data){
		arr = data;
		speed = sp||50;
		wordbox = document.getElementById(targetId);
		strLen = arr[0].length;
		tlen = arr.length; 
		start();
	}
	
	function start(){
		c='';
		row = Math.max(0,index-tlen);
		while(row < index){
			c += arr[row++] + '\r\n';
		}
		wordbox.innerText = c+arr[index].slice(0,pos)+"_"; 
		wordbox.scrollTop=wordbox.scrollHeight;
		if(pos==strLen){
			pos = 0;
			c = arr[index]+"\r\n";
			index ++;			
			if(index < tlen){
				strLen = arr[index].length;
				setTimeout(start,300);
			}else{
				wordbox.innerText = wordbox.innerText.replace("_","");
				}
			}else{
				pos++;
				setTimeout(start,speed);
			}
	}
	
	return {
		console:setData	
	};
})();