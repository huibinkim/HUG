$(function(){

	/* === Form element === */

	/* common-combo select -------------------------------------------------- */
	var selectTarget = $('.common-combo select');
	selectTarget.on('focus',function(){
		$(this).parent().addClass('on');
	});
	selectTarget.on('focusout',function(){
		$(this).parent().removeClass('on');
	});

	/* common-input focus */
	var input = $("input:not('.js-rdo-custom')");
	var numberInput = $("input[type='tel']");
	var numberInput2 = $("input[data-type='tel']");

	/* 모든 input type='number'에서는 숫자 키보드 처리 */
	numberInput.attr({
		pattern: '[0-9]*',
		inputmode: 'numeric'
	});
	numberInput2.attr({
		pattern: '[0-9]*',
		inputmode: 'numeric'
	});

	input.on('focus', function(event) {
		$(this).parent('.common-input').addClass('on');
	});
	input.on('focusout', function(event) {
		$(this).parent('.common-input').removeClass('on');
	});

	$(document).on('focus click', "input[type=checkbox]", function(){
		try{
			if($(this).is(":checked")) {
				$(this).attr('aria-checked', true);
			} else {
				$(this).attr('aria-checked', false);
			}
		}catch(e){console.error(e)}
	});

	$('.frm-pin').off('click').on('click', function() {
		$(this).children('input').focus();
		$(this).parent('.common-input').addClass('on');
	});

	/* textarea focus */
	var txtarea = $("textarea");
	txtarea.on('focus', function(event) {
		$(this).addClass('on');
	});
	txtarea.on('focusout', function(event) {
		$(this).removeClass('on');
	});

	/* === GNB === */
	$.fn.fnMenu = function(flag){
		var _this = $(this);
		_this.off('click').on('click', function(e){
			var sideWrap = $('.sidemenu-wrap');
			var side = $('.sidemenu');
			var gnb = $('.gnb');
			const $mainWrap = $('#__content');

			if(flag == true){
				if(REQ.getAToken() && REQ.getAToken() != "null"){
					COMM.setSidebarData(function(){
				pageScroll(false);

				sideWrap.addClass('on');
				side.animate({'right':0}, 400, '', function() {
					sideWrap.attr('aria-live', "assertive");
					$mainWrap.attr('aria-hidden', true);
				});
			});
			} else{
				pageScroll(false);

				sideWrap.addClass('on');
				side.animate({'right':0}, 400, '', function() {
					sideWrap.attr('aria-live', "assertive");
					$mainWrap.attr('aria-hidden', true);

					//side.find('.btn-home').focus();
				});			
			}
		}else if(flag == false){
				pageScroll(true);
				if($('.dim').length) $('.dim').remove();
				side.animate({'right':'-100%'}, 400, '', function() {
					sideWrap.removeAttr('tabindex');
					sideWrap.removeClass('on');
					$('.header .btn-menu').focus();
					sideWrap.removeAttr('aria-live');
					$mainWrap.removeAttr('aria-hidden');
				});
			} else if(flag == 'open'){
				var $this = $(this);
				var liOn = $this.parent().siblings();
				var li = $this.parent();
				if (li.hasClass('on')) {
					li.removeClass('on').children('ul').slideUp(200);
				} else {
					liOn.removeClass('on');
					liOn.find('.on').removeClass('on');
					liOn.find('ul').slideUp(200);
					li.addClass('on').children('ul').slideDown(200);
					$this.focus();
				}
			}else{
				return false;
			}
		});
	}


	// Select 선택콤보 레이어 타입
	$.fn.fnSelBox = function(){
		$(this).off('click').on('click',function(e){
			e.preventDefault();
			if(!$(this).hasClass("disabled")){
				var targetid = $("#"+$(this).attr("data-selbox"));
				targetid.toggleClass('open');
				if(targetid.hasClass('open')){
					targetid.slideDown(200);
				}else{
					targetid.slideUp(200);
				}
			}
		});
	}
	// Select 선택콤보 레이어 타입 - 아이템선택
	$.fn.fnSelBoxItem = function(){
		var _this = $(this);
		_this.off('click').on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			var value = $this.attr('data-value');
			var targetid = $("#"+$this.closest(".selbox-itemlist").attr("id"));

			$this.closest(".selbox-itemlist").find(".item").removeClass("on").removeAttr("title");
			$this.addClass("on").attr("title","선택됨");

			$this.closest(".select-box").find("> .selbox-selitem").attr("tabindex","-1").text($this.text()).focus();
			window.focusBtn = null;
			$this.closest(".select-box").find("> .selbox-value").val(value);

			// 팝업 닫기
			targetid.removeClass('open');
			targetid.slideUp(200);

		});
	}
	// 체크리스트 팁 영역 토글 : 아코디언타입
	$.fn.fnChkListItem = function(flag){
		var _this = $(this);
		_this.off('click').on("click",function(e){
			e.preventDefault();
			var $this = $(this);
			var $target_obj;
			var $help_box = $this.closest(".list-chk").find(".chklist-helpbox");

			if(flag == "c-info"){
				$target_obj = $this.closest('.common-check').siblings('.chklist-helpbox');
				if(!$target_obj.hasClass('on')){
					$help_box.attr({'aria-hidden': true});
					$help_box.removeClass("on");
					$help_box.slideUp(200);
				}
			}else if(flag == "c-close"){
				$target_obj = $this.closest('.chklist-helpbox');
			}

			$target_obj.toggleClass('on');
			if($target_obj.hasClass('on')){
				$target_obj.attr({'aria-hidden': false});
				$target_obj.slideDown(200);
			}else{
				$target_obj.attr({'aria-hidden': true});
				$target_obj.slideUp(200);
			}

		});
	}

	// 토글 단건/리스트 : 아코디언타입
	$.fn.fnToggleArea = function(flag){

		
		var _this = $(this);
		_this.off("click").on("click",function(e){
			e.preventDefault();
			var $this = $(this);
			var targetArea;
			var $toggle_bt = $this.closest(".list-toggle").find(".toggle-btn");
			var $toggle_ar = $this.closest(".list-toggle").find(".toggle-area");
			if(flag == "open"){
				targetArea = $("#"+$this.attr('data-area'));
				if(!$this.hasClass("on")){
					$toggle_bt.removeClass('on');
					$toggle_bt.attr({'aria-expanded': false});
					$toggle_ar.removeClass('on');
					$toggle_ar.slideUp(200);
				}
			}else if(flag == "close"){
				targetArea = $this.closest(".toggle-area");
			}
			$this.toggleClass('on');
			targetArea.toggleClass('on');
			if(targetArea.hasClass('on')){
				$this.attr({'aria-expanded': true});
				targetArea.slideDown(200);
			}else{
				$this.attr({'aria-expanded': false});
				targetArea.slideUp(200);
			}

		});
	}

	// 탭 : 라디오타입 포함
	$.fn.fnTab = function(){
		var _this = $(this);

		_this.on('click',function(){
			var $this = $(this);
			var tabId = $this.attr('aria-controls');

			$this.parent().siblings().find('.tab-btn').removeClass('on').attr('aria-selected','false');
			$this.addClass("on").attr("aria-selected","true");
			$('#' + tabId).addClass('on').siblings('.tab-panel').removeClass('on');
		});
	}

	$.fn.fnTabSel = function(){
		var _this = $(this);
		_this.on('change',function(){
			var $this = $(this);
			var itm = $this.val();
			console.log(itm);
			var select_itm = $('.sel-change-wrap').children('.'+itm);
			select_itm.siblings().hide();
			select_itm.show();
		});
	}

	$.fn.fnChkAll = function(){
		var _this = $(this);
		_this.on('change',function(){
			var $this = $(this);
			var thisName = $this.attr("name");
			if($this.is(":checked")){
				$("[name='" + thisName + "']").not($this).prop("checked", true);
			}else{
				$("[name='" + thisName + "']").not($this).prop("checked", false);
			}
		});
	}

	// toast Message
	$.fn.fnTMsg = function(){
		var _this = $(this);
		_this.off('click').on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			var tmsg = $this.attr("data-tmsg");

			$(".tmsg_box."+tmsg).fadeIn(400).delay(2000).fadeOut(400);

		});
	}

	// on/off toggle button
	$.fn.fnOnOff = function(){
		var _this = $(this);
		_this.off('click').on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			if (!$this.hasClass("on")) {
				$this.addClass("on").text("ON");
			} else {
				$this.removeClass("on").text("OFF");
			}
		});
	}

	// on/off2 toggle button
	$.fn.fnOnOff2 = function(){
		var _this = $(this);
		_this.off('click').on('click',function(e){
			e.preventDefault();
			var $this = $(this);
			if (!$this.hasClass("on")) {
				$this.addClass("on").text("네");
			} else {
				$this.removeClass("on").text("아니오");
			}
		});
	}

	$.fnInit = function(){

		/* 전체메뉴 */
		$('.header .btn-menu').fnMenu(true);
		$('.sidemenu-wrap .btn-close').fnMenu(false);
		$('.gnb a').fnMenu('open');

		// 선택 레이어팝업
		$('.select-box .selbox-selitem').fnSelBox();
		// 선택 레이어팝업 - 아이템선택
		$('.selbox-itemlist .selbox-item .item').fnSelBoxItem();

		// 체크리스트 항목 내용 토글
		$('.list-chk .ico-help02').fnChkListItem('c-info');
		$('.list-chk .chklist-helpbox  .btn-close').fnChkListItem('c-close');
		// 체크리스트 전체선택
		$('.list-chk .chk-all .common-check input[type=checkbox]').fnChkAll();

		

		// 토글 영역
		$('.toggle-btn').fnToggleArea('open');
		$('.toggle-area .btn-close').fnToggleArea('close');

		// 탭
		$('.tab-wrap .tab-list .tab-btn').fnTab();// 탭 버튼
		$('.tab-sel').fnTabSel(); // 탭 select

		// 토스트메세지
		$('.btn_tmsg').fnTMsg();

		// on/off 토글 버튼
		$('.btn-onoff').fnOnOff();

		// on/off 토글 버튼
		$('.btn-onoff02').fnOnOff2();

		//커스텀 체크버튼 라디오 접근성 추가
		$(document).on('click', '.js-rdo-custom', function(){
			$(this).attr('aria-checked', true).siblings('.js-rdo-custom').attr('aria-checked', false);		
		});
	}

	$.fnInit();
});

/* input type="number" 일때 maxlength 제한 oninput="maxLengthCheck(this)" */
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}
	// maxlength 입력하고 next element가 type='number' 일때 next element에 auto focus << 접근성 규칙으로 인해 삭제
	// if (object.value.length == object.maxLength ){
	// 	if (object.nextElementSibling.getAttribute('type') == "number" || object.nextElementSibling.getAttribute('type') == "password") {
	// 		object.nextElementSibling.focus();
	// 	}
	// }
}

/* 핀 번호(pin number) style */
function pinChk(e){
	var x = $(e).val().length;
	var pinChk = $(e).parent();

	pinChk.children('span').removeClass('on');
	pinChk.children('span:nth-of-type(-n+'+x+')').addClass('on');

	if (e.value.length > e.maxLength){
		e.value = e.value.slice(0, e.maxLength);
	}
}



/* ==========================================================================
 * header 및 footer 자동 숨김
 * ======================================================================== */
var headerScroll, footerScroll;
var lastScrollTop = 0;
var delta = 10;
var $header = $('.header');
var headerHeight = $header.outerHeight();
var $footer = $('.footer');
var footerHeight = $footer.outerHeight();
var $container = $('.container');

$(window).on('load', function(event){
	 //footer btn 갯수에 따라 넓이 조정
	var footer_btns = $footer.children('.btn');
	if (footer_btns.length > 1) {
		$footer.addClass('lay2');
	}

	// footer fixed 일때 container margin-bottom 조정
	if ( $footer.css('position') == 'fixed') {
		$container.addClass('footer-up');
	}
});
/* header 및 footer 자동 숨김 -------------------------------------------------- */
// 스크롤시에 사용자가 스크롤했다는 것을 알림
$(window).on('load scroll',function(event){
	var st = $(this).scrollTop();
	if ($header.hasClass('auto-hide')) {//스크롤을 내린 상태
		
		if ($('body').height() >= $(window).height()) {
			headerScroll = true;
		} else {
			$header.removeClass('header-up');
			headerScroll = false;
		}
	} else {
		headerScroll = false;
	}

	if ($footer.hasClass('auto-hide')) { //스크롤을 올린 상태
		if ($('body').outerHeight() > $(window).height()) {//문서의 높이가 창보다 긴 경우
			footerScroll = true;
		} else {
			$footer.addClass('footer-up');
			footerScroll = false;
		}
	} else {
		footerScroll = false;
	}
});

// hasScrolled()를 실행하고 headerScroll 상태를 재설정
setInterval(function() {
	if (headerScroll || footerScroll) {
		hasScrolled();
		headerScroll = false;
		footerScroll = false;
	}
}, 450);

// 동작을 구현
function hasScrolled() {
	var st = $(this).scrollTop();

	if(Math.abs(lastScrollTop - st) <= delta)
	return;

	const docu_height = $(document).height();
	const window_height = $(window).height();

	if (headerScroll) {
		if (st > lastScrollTop && st > headerHeight){
			// Scroll Down
			$header.removeClass('header-down').addClass('header-up');
		} else {
			// Scroll Up
			if(st + window_height < docu_height - 48) {
				$header.removeClass('header-up').addClass('header-down');

			}
		}
	}
	if (footerScroll) {
		if (st > lastScrollTop){
			// Scroll Down
			if((docu_height - window_height) <= footerHeight){ // 스크롤탑 최대가 푸터 높이보다 작을 경우 수정
				$footer.removeClass('footer-down').addClass('footer-up');
			}else{
				if(st > footerHeight){
					$footer.removeClass('footer-down').addClass('footer-up');
				}
			}
		} else {
			// Scroll Up
			if(st + window_height < docu_height - 48) {
				$footer.removeClass('footer-up').addClass('footer-down');
			}
		}
	}
	lastScrollTop = st;
}

/* goto top 버튼  */
$(function(){
	var offset = 400;
	var duration = 500;
	var doc_h = $(document).height(); 

	if (doc_h > 640) {
		$('body').append("<button type='button' class='btnGotop'><span class='blind'>맨위로 이동</span></button>");
	}
	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$('.btnGotop').fadeIn(duration);
		} else {
			$('.btnGotop').fadeOut(duration);
		}
	});

	$('.btnGotop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
});

var pageScroll = function(flag) { // flag : true , false
	if ( flag == false ) {
		if (window.scrollY < $('.header').height()) {
			t = 0;
		} else {
			t = window.scrollY;
		}
		$('body').css('margin-top', -t);
		$('html').attr('data-scroll',t);
	} else {
		$('body').css({
			marginTop: 'auto'
		});

		$(window).scrollTop(parseInt($('html').attr('data-scroll')));
		$('html').removeAttr('data-scroll');
	}
};

var LayerPopup = {

	pickCasePopType: function(obj){
		var $layerObj = $('.layerpop.'+obj);

		//풀페이지가 아니면 블랙레이어를 추가한다
		if( !$layerObj.hasClass('pop-page') && !$layerObj.hasClass('pop-right')) {
			$layerObj.before('<div class="dim"></div>');
		}

		var $body = $('body');
		$body.addClass('pop-active'); //바디 스크롤 고정
	},
	open:function(obj, abc){//abc는 함수 실행하는 요소 (this)
		pageScroll(false);

		this.pickCasePopType(obj);
		
		this.accessibleOff(obj);

		var prtId = $(abc).attr('id');
		if(typeof(abc) == "string"){
			prtId = abc;
		}
		this.accessibleOn(obj, prtId);

		try{
			//닫기 재정의
			REQ.goMobileBack = function(){
				if (abc) {
					$this = $(abc);
					this.close(obj, $this);
				} else {
					this.close(obj);
				}
			}
		}catch(e){
			console.log(e);
		}
	},
	accessibleOn: function(obj, prt) {//열리는 엘리먼트
		var $layer = obj ? $('.'+obj) : $('.layerpop');
		$layer.show().focus(); //현재 오픈하려고 하는 레이어
		$layer.attr({'aria-live': 'assertive', 'data-parent':prt}).removeAttr('aria-disabled aria-hidden');
	},
	accessibleOff: function(obj) {//가려지는 엘리먼트
		var $popupItems = $('.layerpop');
		var popCount = $popupItems.length; //현재 DOM에 레이어팝업이 여러 개일 경우

		var popActiveItems = null;
		if (popCount > 1) {//보여지고 있는 팝업을 확인
			var activeLayer = $popupItems.filter(function(idx, el){
				if($(el).css("display") != "none") {
					return el;
				}
			});

			popActiveItems = activeLayer.length > 1 ? 'yes' : 'no'; //열려있는 팝업이 있으면 마지막 팝업을 담는다
		}

		if (popActiveItems == 'yes') {//열려있는 팝업이 있을 때
			$(obj).attr('aria-hidden', true).removeAttr('aria-live'); 
		} else {//열려있는 팝업이 하나도 없을 때는 바닥페이지 엘리먼트를 가린다
			$('.page-wrapper').attr({'aria-hidden':true});
		}
	},
	close:function(obj){		

		var $layerObj = obj ? $('.'+obj) : $('.layerpop');
		var prt = $layerObj.data('parent'); //data-parent 속성으로 갖고있는 클릭했던 요소의 아이디 string

		if($('.dim').length) $layerObj.prev('.dim').remove();

		$layerObj.hide().attr('aria-hidden',true).removeAttr('aria-live data-parent');		
		this.closeFirst();
		pageScroll(true);
		$('#'+prt).focus();

		try{
			REQ.goMobileBack = function(){
				history.go(-1);
			}
		}catch(e){}
	},
	openBtm:function(obj, abc){
		pageScroll(false);
		this.pickCasePopType(obj);
		this.accessibleOff(obj);

		var prtId = $(abc).attr('id');
		if(typeof(abc) == "string"){
			prtId = abc;
		}
		this.accessibleOn(obj, prtId);


		$('.'+obj).animate({'bottom':'0'}, 400);

		try{
			//닫기 재정의
			REQ.goMobileBack = function(){
				LayerPopup.closeBtm(obj);
			}
		}catch(e){}

	},
	closeBtm:function(obj){

		var $layerObj = obj ? $('.'+obj) : $('.layerpop');
		var prt = $layerObj.data('parent'); //data-parent 속성으로 갖고있는 클릭했던 요소의 아이디 string

		//기본 dim, 바닥페이지 스크롤 auto로 변환
		if($('.dim').length) $layerObj.prev('.dim').remove();
		
		$layerObj.animate({'bottom':'-100%'}, 400)
		$layerObj.hide().attr('aria-hidden',true).removeAttr('aria-live data-parent');
		this.closeFirst();

		pageScroll(true);
		$('#'+prt).focus();

		try{
			REQ.goMobileBack = function(){
				history.go(-1);
			}
		}catch(e){}
	},
	openRight:function(obj, abc){
		pageScroll(false);

		this.pickCasePopType(obj);

		this.accessibleOff(obj);
		var prtId = $(abc).attr('id');
		if(typeof(abc) == "string"){
			prtId = abc;
		}
		this.accessibleOn(obj, prtId);

		$('.'+obj).animate({'right':'0'}, 400);

		try{
			//닫기 재정의
			REQ.goMobileBack = function(){
				LayerPopup.closeRight(obj);
			}
		}catch(e){}
	},
	closeRight:function(obj){			
		var $layerObj = obj ? $('.'+obj) : $('.layerpop');
		var prt = $layerObj.data('parent'); //data-parent 속성으로 갖고있는 클릭했던 요소의 아이디 string

		$layerObj.animate({'right':'-100%'}, 400);
		$layerObj.hide().attr('aria-hidden',true).removeAttr('aria-live data-parent');
		this.closeFirst();
		pageScroll(true);
		$('#'+prt).focus();

		try{
			REQ.goMobileBack = function(){
				history.go(-1);
			}
		}catch(e){
			console.error(e);
		}

	},
	closeFirst:function() {
		//기본 dim, 바닥페이지 스크롤 auto로 변환
		$('body').removeClass('pop-active');
	
		var $popupItems = $('.layerpop');
		var popCount = $popupItems.length > 1;
	
		if (popCount) {//현재 DOM에 있는 layerpop이 2개이상이면
			var activeLayer = $popupItems.filter(function(idx, el){
				if($(el).css("display") != "none") {//그 중에 열려있는 layerpop
					return el;
				}
			});

			if (activeLayer.length == 0) {
				$('.page-wrapper').removeAttr('aria-hidden');
				$('#__content').removeAttr('aria-hidden');
			}
		} else {
			$('.page-wrapper').removeAttr('aria-hidden');
			$('#__content').removeAttr('aria-hidden');
		}
	}
}


// 안심전세 툴팁 화면
$('.ico-help03').on('click', function(){
	$(this).toggleClass('active');
	$(this).next('.tooltip').toggleClass('active');
});

$('.btn-close').on('click', function(){
	$(this).parent('.tooltip').removeClass('active');
	$(this).parent().siblings('.ico-help03').removeClass('active');
});