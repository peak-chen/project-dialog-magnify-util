/**
 * [showManagnify]
 * @param  {String}  directionTop  [图片的方向]
 * @param  {String}  directionLeft  [图片的方向]
 * @param  {[Object]}  num  [图片的左边的对象]
 * @param  {[Object]}  stage      [small 外层div]
 * @param  {[Object]}  small      [image 对象]
 * @param  {[Object]}  large      [large div]
 * @param  {String}  image        [image src]
 */
function showManagnify(directionTop,directionLeft,num,stage,small,large, imageUrl) {

    // The native width and height of the image.
    var defaults = {
        scaling: 0.3
    };

    // Combines object defaults and options.
    var options = $.extend(defaults, options),
        native_width = 0,
        native_height = 0,
        current_width = 0,
        current_height = 0,
        $small = small,
        $stage = stage,
        $large = large;
    if(directionTop!=null&&num!=null){
       var $directionTop=directionTop;
       var $num=num;
    }
    if(directionLeft!=null&&num!=null){
        var $directionLeft=directionLeft;
        var $num=num;
    }

    $stage.mousemove(function (e) {
        /* Act on the event */
        if (!native_width && !native_height) {
            var image_object = new Image();

            image_object.src = imageUrl;

            // Gets the image native height and width.
            native_height = image_object.height;
            native_width = image_object.width;

            // Gets the image current height and width.
            current_height = $small.height();
            current_width = $small.width();

            if(native_width-current_width<100){
                native_width=current_width+160;
            }
            if(native_height-current_height<100){
                native_height=current_height+160;
            }
            //给large赋背景图
            $large.css("background-image","url("+imageUrl+")");
            $large.css("background-size", native_width + "px " + native_height + "px");
            $large.css("background-repeat","no-repeat");

        } else {

            // Gets .maginfy offset coordinates.
            var magnify_offset = $(this).offset(),
                w=$(this).width(),
                h=$(this).height();
            // Gets coordinates within .maginfy.
                mx = e.pageX - magnify_offset.left,
                my = e.pageY - magnify_offset.top;

            // Checks the mouse within .maginfy or not.
            if (mx < $(this).width() && my < $(this).height() && mx >
                0 && my > 0) {
                $large.fadeIn(100);
            } else {
                $large.fadeOut(100);
            } if ($large.is(":visible")) {
                var rx = Math.round(mx / $small.width() * native_width - $large.width() /2) * -1,
                    ry = Math.round(my / $small.height() * native_height - $large.height()/2 ) * -1,
                    bgp = rx + "px " + ry + "px",
                    px = mx - $large.width()/ 2,
                    py = my - $large.height()/ 2;
                /*背景图片右对齐*/
                if($directionLeft==="right"&&$num!=null){
                    px=mx - $large.width()/ 2+$num.width();
                }
                if($directionLeft==="padding-left"&&$large!=null){
                    px=mx - $large.width()/ 2+magnify_offset.left;
                }
                if($directionTop==="padding-top"&&$num!=null){
                    py = my - $large.height()/ 2+$num.height();
                }
                if($directionTop==="bottom"&&$num!=null){
                    py = my - $large.height()/ 2+$num.height()/2;
                }
                $large.css({
                    left: px,
                    top: py,
                    backgroundPosition: bgp
                });
            }

        }
    });

    //当鼠标离开图片时去除放大镜样式
    $stage.mouseleave(function(){
        //去除放大镜显示效果
        $large.removeClass("magnify-large");
    });
    //当鼠标在图片时新增放大镜样式
    $stage.mouseenter(function(){
        //新增放大镜显示效果
        $large.addClass("magnify-large");
    });

}