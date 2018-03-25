/**
 *
 *
 * Created by marker on 2016/12/29.
 */

angular.module('mainApp', [
])

.controller('MainController',function ( $rootScope, $scope) {
    $scope.index = 0;
    $scope.select = 0;
    $scope.currnetItem = null;// 当前选择的组件

    $scope.data = {
        name: "甜馨浪漫时尚花卉小清新完美婚礼/婚宴邀请函",
        pages:[
            {
                title: "dsada",
                items: [
                    {
                        name:"sadds5",
                        type: "image",
                        src: "./images/a9d3fd1f4134970a686077ac9ecad1c8a7865d25.jpg",
                        width:400,
                        height:1000,
                        top: 90,
                        left:100,
                        fontSize:30,
                        zIndex:1,
                    },
                    {
                        name:"sadds2",
                        type:"text",
                        width:140,
                        height:40,
                        top:10,
                        left:20,
                        fontSize:30,
                        zIndex:1,
                        text:"哈哈哈"

                    },
                    {
                        name:"sadds1",
                        type: "image",
                        src: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png",
                        width:100,
                        height:40,
                        top: 90,
                        left:100,
                        fontSize:30,
                        zIndex:1,
                        text: "哈哈哈"

                    },
                    {
                        name:"sadds5",
                        type: "image",
                        src: "http://res.yaoyue365.com/syspic/201802/img/22827a8516db66636ecd2585132f5e51.jpg!8",
                        width:400,
                        height:500,
                        top: 90,
                        left:100,
                        fontSize:30,
                        zIndex:1,
                        text: "哈哈哈"

                    },
                    {
                        name:"sadds5",
                        type: "image",
                        src: "http://res.yaoyue365.com/user/2018/0217/thumb_639faf470d9ae4180b007fa4cb2209e1.png",
                        // width:100,
                        // height:40,
                        top: 90,
                        left:100,
                        fontSize:30,
                        zIndex:1,
                        animate:[
                            {
                                animationName: 'bounce',
                                delay: "0",
                                duration: "3",
                                iterationCount: "infinite",
                            },
                        ]
                    }

                ]
            } ,
            {
                title: "dsada1",
                items: [
                    {
                        name:"sadds2",
                        type:"text",
                        width:140,
                        height:40,
                        top:10,
                        left:20,
                        fontSize:30,
                        zIndex:1,
                        text:"哈哈哈"

                    }

                ]
            }
        ]
    }
    progressStyle($scope.data);

    // 当前页面
    $scope.currentPage = $scope.data.pages[$scope.index];

    /**
     * 处理样式
     * @param data
     */
    function progressStyle(data){
        var pages = data.pages;
        for (var i=0; i < pages.length; i++) {
            var page = pages[i];
            angular.forEach(page.items, function (o, i) {
                o.style =  {
                    "position":"absolute",
                    "top" :  o.top + "px",
                    "left" : o.left + "px",
                    "width" : o.width + "px",
                    "height" : o.height + "px",
                    "font-size" : o.fontSize + "px",
                    "z-index": o.zIndex,
                };
                o.styleAnimate = {

                    animation : animate(o)
                };
            });
        }


        function animate(o){
            if(!o.animate){o.animate = []}
            var array = [];
            var len = o.animate.length;
            for(var i=0; i<len; i++){
                var tmp = [];
                var a = o.animate[i];
                tmp.push(a.animationName);
                tmp.push(a.duration + 's');
                tmp.push(a.delay + 's');
                tmp.push(a.iterationCount);
                array.push(tmp.join(' '));
            }
            return array.join(',');
        }
    }


    $('.j_screen').on('mousedown','li', function(e) {
        $(this).parent().children().each(function(i,el){
            $(el).removeClass("active");
        });
        $(this).addClass("active");
    });



    $(document).on('mouseup', function(e){
        $(document).off('mousemove');
    });


    $(document).on('mousedown','.edit_mode',function(e1){
        var ev1 = e1 || event;
        stopBubble(ev1);

        // 鼠标按下时的位置
        var mouseDownX = ev1.clientX;
        var mouseDownY = ev1.clientY;
        var liEl  = this;

        var $li    = $(liEl).parent().parent().parent();
        var index  = $li.index();
        var width  = $li.width();
        var height = $li.height();
        var left   = $li.position().left;
        var top    = $li.position().top;

        // 判断改变方块的大小的方向
        var direction = $(this).attr("class").split(' ')[1];

        console.log(direction)
        if(direction == 'edit_mode_move'){
            $li    = $(liEl);
            index  = $li.index();
            width  = $li.width();
            height = $li.height();
            left   = $li.position().left;
            top    = $li.position().top;

        }


        $scope.$apply(function () {
            $scope.select = index;
        });

        // 纠正移动
        $(document).on('mousemove', function(e2){
            var ev2 = e2 || event;
            ev2.preventDefault();

            // 鼠标移动时的鼠标位置
            var mouseMoveX = ev2.clientX;
            var mouseMoveY = ev2.clientY;

            //根据改变方块大小的方向不同进行大小的改变
            if(direction == 'edit_mode_radius_b_r'){
                $scope.$apply(function(){
                    var widthNewVal  = (width * 0.5 + (mouseMoveX - mouseDownX)) / 0.5;
                    var heightNewVal = (height* 0.5 + (mouseMoveY - mouseDownY)) / 0.5;
                    $scope.currentPage.items[index].width  = widthNewVal ;
                    $scope.currentPage.items[index].height = heightNewVal ;
                });
                return;
            }
            if(direction == 'edit_mode_radius_b_l'){
                $scope.$apply(function(){
                    var leftNewVal   = (left  + (mouseMoveX - mouseDownX))/0.5;
                    var widthNewVal  = (width -  (mouseMoveX - mouseDownX)/0.5);
                    var heightNewVal = (height + (mouseMoveY - mouseDownY)/0.5);
                    $scope.currentPage.items[index].left   = leftNewVal  ;
                    $scope.currentPage.items[index].width  = widthNewVal ;
                    $scope.currentPage.items[index].height = heightNewVal;
                });
                return;
            }
            if(direction == 'edit_mode_radius_t_l'){
                $scope.$apply(function(){
                    $scope.currentPage.items[index].left  = (left  + (mouseMoveX - mouseDownX))/0.5;
                    $scope.currentPage.items[index].width = width -  (mouseMoveX - mouseDownX)/0.5  ;
                    $scope.currentPage.items[index].top    = (top   + (mouseMoveY - mouseDownY))/0.5 ;
                    $scope.currentPage.items[index].height = height -  (mouseMoveY - mouseDownY)/0.5 ;
                });
                return;
            }
            if(direction == 'edit_mode_radius_t_r'){
                $scope.$apply(function(){
                    $scope.currentPage.items[index].width  = width +  (mouseMoveX - mouseDownX)/0.5;
                    $scope.currentPage.items[index].top    = (top   + (mouseMoveY - mouseDownY))/0.5;
                    $scope.currentPage.items[index].height = height -  (mouseMoveY - mouseDownY)/0.5;
                });
                return;
            }

            if(direction == 'edit_mode_move'){
                $scope.$apply(function() {
                    var leftNewVal = (left / 0.5 + (mouseMoveX - mouseDownX) / 0.5);
                    var topNewVal  = (top / 0.5  + (mouseMoveY - mouseDownY)/ 0.5 );
                    $scope.currentPage.items[index].left = leftNewVal ;
                    $scope.currentPage.items[index].top  = topNewVal ;
                });
                return;
            }
        });

    });




    $scope.$watch('currentPage.items',function(obj){
        progressStyle($scope.data);
    }, true);


    /**
     * 选择页面
     * @param $index
     */
    $scope.selectPage = function($index){
        $scope.index  = $index;
        $scope.select = 0;

        // 当前页面
        $scope.currentPage = $scope.data.pages[$scope.index];

    }





    // 禁止事件冒泡
    function stopBubble(e) {
        // 如果提供了事件对象，则这是一个非IE浏览器
        if ( e && e.stopPropagation )
            // 因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        else
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
    }


    function getTypeText(text){
        return {
            name: text,
            type: "text",
            width:100,
            height:40,
            top: 0,
            left: 0,
            fontSize:30,
            zIndex:1,
            text: text
        }
    }


    /**
     * 添加文本
     */
    $scope.addText = function(){
        layer.prompt({title: '请输入文本！', formType: 2}, function(text, index){
            layer.close(index);
            $scope.$apply(function(){
                $scope.data.pages[$scope.index].items.push(getTypeText(text));
            });
        });

    }

    /**
     * 移除页面
     * @param $index
     */
    $scope.removePage = function($index){
        $scope.data.pages.splice($index, 1);
        // TODO 移除页面后，设置页面活跃
    };

    $scope.addEmptyPage = function(){
        $scope.data.pages.push({
            items:[]
        });
    }


    /**
     * 移除动画
     * @param $index
     */
    $scope.removeAnimation = function($index){
        $scope.data.pages[$scope.index].items[$scope.select].animate.splice($index, 1);
    };


    /**
     * 添加动画
     * @param $index
     */
    $scope.addAnimation = function(){
        var json =  {
            animationName: 'none',
            delay: "0",
            duration: "3",
            iterationCount: "1",
        };
        $scope.data.pages[$scope.index].items[$scope.select].animate.push(json);
    };


    $scope.publish = function(){
        localStorage.data = angular.toJson($scope.data);
    }

}).run(function($rootScope) {
    /**
     * 动画集合
     * @type {[*]}
     */
    $rootScope.animationList = [
        {category: "默认", name: "无", value: "none"},

        {category: "强调", name: "无", value: "none"},
        {category: "强调", name:"弹跳", value:"bounce"},
        {category: "强调", name:"闪烁", value:"flash"},
        {category: "强调", name:"脉动", value:"pulse"},
        {category: "强调", name:"橡皮圈", value:"ubberBand"},
        {category: "强调", name:"摇动", value:"shake"},
        {category: "强调", name:"摆动", value:"swing"},
        {category: "强调", name:"波动", value:"tada"},
        {category: "强调", name:"晃动", value:"wobble"},
        {category: "强调", name:"心跳", value:"heartbeat"},
        {category: "强调", name:"上移", value:"slideInUp"},
        {category: "强调", name:"下移", value:"slideInDown"},
        {category: "强调", name:"扩张", value:"scaleOutUp"},
        {category: "强调", name:"收缩", value:"scaleOutDown"},

        {category: "弹现", name:"弹动出现", value:"bounceIn"},
        {category: "弹现", name:"向下弹入", value:"bounceInDown"},
        {category: "弹现", name:"从左弹入", value:"bounceInLeft"},
        {category: "弹现", name:"从右弹入", value:"bounceInRight"},
        {category: "弹现", name:"向上弹入", value:"bounceInUp"},

        {category: "弹出", name:"弹动离开", value:"bounceOut"},
        {category: "弹出", name:"向下弹出", value:"bounceOutDown"},
        {category: "弹出", name:"向左弹出", value:"bounceOutLeft"},
        {category: "弹出", name:"向右弹出", value:"bounceOutRight"},
        {category: "弹出", name:"向上弹出", value:"bounceOutUp"},

        {category: "渐现", name:"渐现", value: "fadeIn"},
        {category: "渐现", name:"向下渐现", value: "fadeInDown"},
        {category: "渐现", name:"大幅向下渐现", value: "fadeInDownBig"},
        {category: "渐现", name:"从左渐现", value: "fadeInLeft"},
        {category: "渐现", name:"大幅从左渐现", value: "fadeInLeftBig"},
        {category: "渐现", name:"从右渐现", value: "fadeInRight"},
        {category: "渐现", name:"大幅从右渐现", value: "fadeInRightBig"},
        {category: "渐现", name:"向上渐现", value: "fadeInUp"},
        {category: "渐现", name:"大幅向上渐现", value: "fadeInUpBig"},

        {category: "渐隐", name: "渐隐", value:"fadeOut"},
        {category: "渐隐", name: "向下渐隐", value:"fadeOutDown"},
        {category: "渐隐", name: "大幅向下渐隐", value:"fadeOutDownBig"},
        {category: "渐隐", name: "向左渐隐", value:"fadeOutLeft"},
        {category: "渐隐", name: "大幅向左渐隐", value:"fadeOutLeftBig"},
        {category: "渐隐", name: "向右渐隐", value:"fadeOutRight"},
        {category: "渐隐", name: "大幅向右渐隐", value:"fadeOutRightBig"},
        {category: "渐隐", name: "向上渐隐", value:"fadeOutUp"},
        {category: "渐隐", name: "大幅向上渐隐", value:"fadeOutUpBig"},

        {category: "翻转", name: "翻转", value:"flip"},
        {category: "翻转", name: "横向翻入", value:"flipInX"},
        {category: "翻转", name: "纵向翻入", value:"flipInY"},
        {category: "翻转", name: "横向翻出", value:"flipOutX"},
        {category: "翻转", name: "纵向翻出", value:"flipOutY"},

        {category: "快速", name: "快速进入", value:"lightSpeedIn"},
        {category: "快速", name: "快速移出", value:"lightSpeedOut"},


        
    ]

    $rootScope.repeatList = [
        {category: "次数", name: "1", value: "1"},
        {category: "次数", name: "2", value: "2"},
        {category: "次数", name: "3", value: "3"},
        {category: "次数", name: "4", value: "4"},

        {category: "循环", name: "无限次", value: "infinite"},

    ]











});
