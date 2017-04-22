$(function(){
	changeHeight();//窗口被拉小左侧栏不够显示完整的特殊处理。不够完整显示回归文档流，够完整显示，固定。
	scrollHeight();//滚动固定处理
	resizeHeight();//窗口尺寸变动
	Carousel();//图片轮播
	subMenuBar();//二级菜单
});

function Carousel(){
	var imgs = $('.imgs li');//轮播图片的li集合
	var nums = $('.num li'); //轮播点点的li集合
	var carousel = $('.Carousel');//轮播box
	var imgUl = $('.imgs');//全部图片的横幅ul
	var iNow = 0;//记录当前图片的索引
	var dt = null;//定时器
	imgUl.css('width', imgs.length*imgs[0].offsetWidth);//全部图片横幅(ul)长度
	function tab(){
		for (var i = 0; i < nums.length; i++) {
			nums[i].index = i;
			nums[i].onclick = function() {
				clearInterval(dt);
				iNow = this.index;
				for (var n = 0; n < nums.length; n++) {
					nums[n].className = "white";
				}
				this.className = "yellow";
				imgUl.animate({left: -(imgs[0].offsetWidth*iNow)}, 50);
			};
			nums[i].onmouseout = function(){
				start();
			};
		}
	}
	function start(){
		clearInterval(dt);
		dt = setInterval(function(){
			if (iNow>nums.length-2) { //譬如长度为5，索引到4的时候,下一张就是第0张
				iNow = 0;
				imgUl.css({left: -(imgs[0].offsetWidth*iNow)}, 1000);
			}else{
				iNow++;
			}
			for (var m = 0; m < nums.length; m++) {
				if (iNow == nums[m].index) {
					nums[m].className='yellow';
				}else{
					nums[m].className='white';
				}
			}
			imgUl.animate({left: -(imgs[0].offsetWidth*iNow)}, 500);
		},4000);
		tab();
	}
	start();
}


function resizeHeight(){
	$(window).resize(function() {  
		window.location.reload();
		var leftHeight = $(window).height();//窗口大小被用户变化时，重新获取浏览器可见高度,保证窗口变化时左侧栏依然满屏
		console.log($(window).height());
		$(".left").css('height', leftHeight);
		$(".subMenu").css('height', leftHeight);
		changeHeight();
		scrollHeight();
	});
}

function changeHeight(){
	var winHeight = $(window).height();
	if(winHeight<680){
		$(".left").css('height', $('.right').innerHeight());
		$(".leftBottom").css({
			bottom: '50px',
			top: 'auto'
		});
	}else{
		$(".left").css('height', $(window).height());
		$(".leftBottom").css({
			top: 'auto',
			bottom: '50px'
		});
	}
}

//响应窗口大小，当窗口被拉小到左侧栏不够铺满窗口时的滚动处理
function scrollHeight(){ 
	var leftMinHeight = parseInt($(".leftBottom").css('top')) + $('.leftBottom').height(); 
	if ($(window).height() <= 680) {
		$(window).scroll(function(){
			$('.left').css({
				top: 0,
				height: $('.right').innerHeight()
			});
			$(".leftBottom").css({
				top: 'auto',
				bottom: '50px'
			});
			$('.subMenu').css({
				top: 0,
				height: $('.right').innerHeight()
			});
		});
	}else{
		$(window).scroll(function(){
			var st = $(window).scrollTop();
			$('.left').css({
				top: st,
				height: $(window).height()
			});
			$('.subMenu').css({
				top: st
			});
		});
	}
}

function subMenuBar(){
	for (var i = 0; i < $(".menuBar").length; i++) {
		subMenu($(".menuBar:eq("+i+")"),$(".subMenu:eq("+i+")"));
	}
	function subMenu(menu,subMenu){
		menu.mouseenter(function(){
			subMenu.css({
				display: 'block',
				height: $('.left').height()
			});
			menu.addClass('active');
		}).mouseleave(function() {
			time = setTimeout(function(){
				subMenu.css('display', 'none');
				menu.removeClass('active');
			},50);
		});
		subMenu.mouseenter(function() {
			clearInterval(time);
			menu.addClass('active');
		}).mouseleave(function() {
			$(this).css('display', 'none');
			menu.removeClass('active');
		});
	}
}