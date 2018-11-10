# project-dialog-magnify-util
一个类似于图片查看器的开源插件,使用方法详见doc里的demo;自定义支持多张图片的查看,方法如下:

1.页面引用css:

        <link rel="stylesheet" href="/magnify/docs/font-awesome-4.7.0/css/font-awesome.min.css" >
        <link rel="stylesheet" href="/magnify/dist/jquery.magnify.min.css">
        <link rel="stylesheet" href="/magnify/docs/css/self-black-theme.css">
	
2.图片对象封装(无图显示的情况):

	<div id="passImg" style="display: none;">
		<img data-show="default" data-caption="暂无图片" data-src="<%=path%>/static/images/notExistImg.jpg"
			 src="<%=path%>/static/images/notExistImg.jpg">
	</div>
	
3.页面引用js:

        <script src="../magnify/dist/jquery.magnify.js"></script>
        <script src="../magnify/dist/jquery.magnify-chinese.js"></script>
	
4.js页面图片对象处理:

  1).初始化调用插件:
  
	  $(function () {
		$('#passImg img').magnify(options);
	  });
  
  2).取得图片真实路径,展示图片:
  
    // 图片弹窗显示(cellvalue为多图片的url,以#split#分割)
	function getImg(cellvalue) {
		// 清理原图片缓存
		$('[data-show=add]').remove();
		// 有两张图片
		var imgObjectList = cellvalue.split("#split#");
		if (null != imgObjectList && imgObjectList.length > 0) {
			for (var i = 0, j = 1; i < imgObjectList.length; i++, j++) {
				if (null != imgObjectList[i] && "" != imgObjectList[i] && imgObjectList[i] != "null") {
					$("#passImg").append('<img data-show="add"  data-caption="图' + j + '(共' + imgObjectList.length + '张)" data-src="' + imgObjectList[i] + '"  src="' + imgObjectList[i] + '" >');
				}
			}
			//初始化新增的图片对象
			$('[data-show=add]').magnify(options);
			if($('[data-show=add]').length>0){
				$('[data-show=add]').first().click();
			}else{
				$('#passImg img').magnify(options);
				$('[data-show=default]').click();
			}
		}
	}

   插件封装了放大镜功能,如果在部分弹框中需展示放大镜功能,则其用法如下:
   
  1.引用封装的放大镜css:
  
        <link rel="stylesheet" href="/static/common/magnify/docs/css/showmanagnify.css">
   
  2.封装图片的弹框html和js:
   1).单张图片:
    
        <div id="passImg" style="display: none;">
		<div id="magnify-large" class="magnify-large"></div>
		<img class="small" height="420" width="600" src="<%=path%>/static/images/notExistImg.jpg">
	</div>
	<script type="text/javascript" src="/magnify/src/js/showmagnify.js"></script>
	
   调用:         
	  
	  $("#passImg img").attr("src", url);
          //查看调用放大镜功能
          showManagnify(null, null, null, $("#passImg"), $("#passImg img"), $("#magnify-large"), url);
	
   2).多张图片:
        
	<div id="body">
	       <div id="winTop">
		        <div id="basicInfo">
				<div id="dataInfo">
				   ...
				</div>	
			</div>
			<div id="plateImage">
				<div id="magnify-large1" class="magnify-large"></div>
				<img class="small" src="<%=path%>/static/images/notExistImg.jpg">
			</div>
	        </div>
		<div id="winButtom">
			<div id="magnify-large2" class="magnify-large"></div>
			<img class="small" src="<%=path%>/static/images/notExistImg.jpg">
		</div>
         </div>
	 <script type="text/javascript" src="/static/common/magnify/src/js/showmagnify.js"></script>

   调用:
           
	  //查看调用放大镜功能
          showManagnify(null,"right",$("#basicInfo"),$("#plateImage"),$("#plateImage img"),$("#magnify-large1"), imgUrl1);
	  //查看调用放大镜功能
          showManagnify(null,null,null,$("#winButtom"),$("#winButtom img"),$("#magnify-large2"), imgUrl2);


	 
	 
	
        
