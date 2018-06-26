function btnsEvent(){
    var opts = {
        rollSpeed : 10, // 0-100 滚动间隔速度
        steySpeed : 2000, // 1000-3500 停留时间
        paginationStyle : 'pagination-num',  // pagination-dot pagination-num
        itemArr : [
            'images/01.jpg',
            'images/02.jpg',
            'images/03.jpg',
            'images/04.jpg',
            'images/05.jpg'
        ]
    }

    // 公共id
    function $id(id){
        return document.getElementById(id);
    }
    // 公共class
    function $cls(classname){
        return document.getElementsByClassName(classname);
    }
    // 新增子元素
    var itemHtml = '';
    for(var q=0; q<opts.itemArr.length; q++){
        itemHtml += '<li class="item"><img src="'+opts.itemArr[q]+'"></li>';
    }
    $id('swiper').innerHTML = itemHtml;
    var  paginationSpan = $id('pagination').getElementsByTagName('span'),
        itemsLen = $cls('item').length,
        itemsWidth = $cls('item')[0].offsetWidth,// 获取每一帧宽度
        i = 0,
        j = 0,
        k = 0,
        pageArr = [],
        t = null,
        timer;
    
    //设置默认左偏移量
    $id('swiper').style.left = $id('swiper').offsetLeft;
    $id('swiper').style.width = itemsWidth * itemsLen + 'px';
    
    // 自动创建分页器个数
    for(; i<itemsLen; i++){
        pageArr.push('<span>' + (i+1) + '</span>');
    }
    $id('pagination').innerHTML = pageArr.join('');
    // 设置分页器样式
    $id('pagination').className += ' ' + opts.paginationStyle;
    // $id('pagination').setAttribute('class','pagination ' + opts.paginationStyle);

    // 默认第一个增加样式
    $id('pagination').children[0].setAttribute('class','on');


    // 鼠标按钮样式设置
    function btnsStyle(num){
        $id('prev').style.opacity = num;
        $id('next').style.opacity = num;
    }
    // 动画
    function animates(num){
        clearInterval(t);
        var target = 0;
        t = setInterval(function(){
            target =  - itemsWidth * num;
            // speed取整，避免左右留白
            var speed = (target - $id('swiper').offsetLeft) / itemsLen;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(target == $id('swiper').offsetLeft){
                // 最后一帧清除定时器
                clearInterval(t)
            }else{
                $id('swiper').style.left = $id('swiper').offsetLeft + speed + 'px';                
            }
        },opts.rollSpeed)
        
        for(var n=0; n<paginationSpan.length; n++){
            $id('pagination').children[n].removeAttribute('class');
        }
        $id('pagination').children[num].setAttribute('class','on');
    }

    // 遍历分页器元素，使用闭包达到点击当前元素效果
    for(; j<paginationSpan.length; j++){
        (function(j){
            $id('pagination').children[j].onclick = function(){
                for(var l=0; l<$id('pagination').children.length; l++){
                    $id('pagination').children[l].removeAttribute('class')
                }
                $id('swiper').style.left = -itemsWidth * j + 'px';
                this.setAttribute('class','on');
            }
        }(j))
    }
    var imgIdx = 1;
    // next
    $id('next').onclick = function(){
        clearInterval(t);
        imgIdx++;
        if(imgIdx == itemsLen){
            $id('swiper').style.left = -itemsWidth + 'px';
            imgIdx = 0;
        }
        animates(imgIdx);
    }
    // prev
    $id('prev').onclick = function(){
        clearInterval(t);
        imgIdx--;
        if(imgIdx == -1){
            $id('swiper').style.left = -itemsWidth * itemsLen + 'px';
            imgIdx = itemsLen-1;
        }
        animates(imgIdx);
    }

    // 自动播放
    function autoplay(){
        timer = setInterval(function(){
            $id('next').onclick();
        },opts.steySpeed);
    }
    autoplay(); // 默认自动播放
    
    // 鼠标经过停止播放
    function stop(){
        clearInterval(timer);
    }
    $id('container').onmouseover = function(){
        stop();
        btnsStyle(1); // 按钮显示
    }
    $id('container').onmouseout = function(){
        autoplay();
        btnsStyle(0); // 按钮隐藏
    }
    btnsStyle(0); // 默认隐藏
    
}
btnsEvent();