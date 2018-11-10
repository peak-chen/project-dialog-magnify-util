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
    <script src="/magnify/dist/jquery.magnify.js"></script>
    <script src="/magnify/dist/jquery.magnify-chinese.js"></script>
	
4.js页面图片对象处理:

  1).初始化调用插件:
  
	  $(function () {
		$('#passImg img').magnify(options);
	  });
  
  2).取得图片真实路径,展示图片:
  
    // 图片弹窗显示(cellvalue为多图片的url,以#split#分割)
	function getImg(cellvalue) {
		//清理原图片缓存
		$('[data-show=add]').remove();
		// 视频方案有两张图片
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