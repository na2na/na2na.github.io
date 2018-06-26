function btnsEvent(){

    var container = document.getElementById('container'),
        swiperBox = document.getElementById('swiper'),
        pagination = document.getElementById('pagination'),
        paginationSpan = document.getElementsByTagName('span'),
        prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),
        itemsLen = swiperBox.getElementsByClassName('item').length,
        // 设置每一帧宽度
        itemsWidth = swiperBox.getElementsByClassName('item')[0].offsetWidth,
        i = 0,
        j = 0,
        k = 0,
        timer;
    //设置默认左偏移量
    swiperBox.style.left = swiperBox.offsetLeft;
    
    // 创建分页器函数
    function createDom(target,tagName,innerTxt){
        var tag = document.createElement(tagName);
        var txt = document.createTextNode(innerTxt);
        tag.appendChild(txt);
        target.appendChild(tag);
    }
    
    // 自动创建分页器个数
    for(; i<itemsLen; i++){
        createDom(pagination,'span',i+1);
    }
    // 默认第一个增加样式
    paginationSpan[0].className = 'on';

    // 鼠标按钮样式设置
    function btnsStyle(num){
        prevBtn.style.opacity = num;
        nextBtn.style.opacity = num;
    }
    
    // 动画
    function animates(offset){
        var n=0;

        // parseInt(swiperBox.style.left)获取当前盒子的偏移量（非初始值）并转为数字
        // offset设置偏移量
        // var swiperLeft = parseInt(swiperBox.style.left) + offset;
        var swiperLeft = swiperBox.offsetLeft + offset;

        if(swiperLeft <= -itemsWidth*itemsLen) {
            // 最后一帧，重置盒子偏移量为0
            swiperBox.style.left = 0;
        } else if(swiperLeft > 0) {
            /** 
             * 在第一帧点击上一张，则从最后一帧倒序播放
             * itemsLen-1即减去了最后一帧本身的宽度
             */
            swiperBox.style.left = -itemsWidth*(itemsLen-1) + 'px';
        }else{
            // 每次点击操作，盒子偏移量加处理一次
            swiperBox.style.left = swiperLeft + 'px';
        }

        // 获取当前索引
        var index = Math.abs( parseInt(swiperBox.style.left) / itemsWidth);
        
        // 循环所有分页元素并清除样式
        for(; n<paginationSpan.length; n++){
            paginationSpan[n].className = '';
        }
        paginationSpan[index].className = 'on';

    }

    // 清除兄弟元素样式
    function siblings(target){
        var siblings = target.parentNode.childNodes;
        for(; k<siblings.length; k++){
            siblings[k].className = '';
        }
    }

    // 遍历分页器元素，使用闭包达到点击当前元素效果
    for(; j<paginationSpan.length; j++){
        (function(j){
            paginationSpan[j].onclick = function(){
                siblings(this);
                swiperBox.style.left = -itemsWidth * j + 'px';
                paginationSpan[j].className = 'on';
            }
        }(j))
    }

    // next
    nextBtn.onclick = function(){
        animates(-itemsWidth);
    }
    // prev
    prevBtn.onclick = function(){
        animates(itemsWidth);
    }

    // 自动播放
    function autoplay(){
        timer = setInterval(function(){
            nextBtn.onclick();
            // prevBtn.onclick();

        },1000);
    }
    autoplay(); // 默认自动播放
    
    // 鼠标经过停止播放
    function stop(){
        clearInterval(timer);
    }
    container.onmouseover = function(){
        stop();
        btnsStyle(1); // 按钮显示
    }
    container.onmouseout = function(){
        autoplay();
        btnsStyle(0); // 按钮隐藏
    }
    btnsStyle(0); // 默认隐藏
    
}
btnsEvent();