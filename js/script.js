/* модальные окна */
var Modal = function() {
	this.container = $('.modal-overlay');
	this.close     = $('.modal__close');
	this.thanks    = $('.modal_thx');
};

Modal.prototype.fadeIn = function() {
	this.container.fadeIn(400);
};

Modal.prototype.fadeOut = function() {
	this.container.fadeOut(400);
};

Modal.prototype.showThanks = function() {
 	this.thanks.delay(200)
			.fadeIn(400, function() {
				$(this).addClass('visible');
			});	
 };

Modal.prototype.initClose = function() {
	var self = this;

	this.container.on('click', function(e) {
		if( $(e.target).closest('.modal').length == 0 ) {

			$(this).find('.modal.visible')
				.fadeOut(400, function() {
					$(this).removeClass('visible');
				});

			self.fadeOut();
		}
	});
};

/* call модальное окно*/

var ModalItem = function(elem, btnToClick) {
	Modal.apply(this, arguments);
	this.elem = $('.modal_' + elem );
	this.button = $(btnToClick);
};

ModalItem.prototype = Object.create( Modal.prototype );

ModalItem.prototype.show = function() {
	this.elem.fadeIn(400, function() {
		$(this).addClass('visible');
	});
};

ModalItem.prototype.hide = function() {
	this.elem.fadeOut(400, function() {
		$(this).removeClass('visible');
	});
			
	this.showThanks();
};

ModalItem.prototype.init = function() {
	var self = this;

	this.button.on('click', function(e) {
		e.preventDefault(); 

		self.fadeIn();
		self.show();

	});

	this.close.on('click', function() {

		$(this).parent()
				.fadeOut(400, function() {
					$(this).removeClass('visible');
				});

		self.fadeOut();
	});

	this.elem.find('.send').on('click', function(e) {
		e.preventDefault();

		self.hide();
	});
};

/* модальное окно опрос*/

var ModalQuiz = function() {
	ModalItem.apply(this, arguments);

	this.step1 = $('.quiz-step1');
	this.step2 = $('.quiz-step2');
	this.step3 = $('.quiz-step3');
	this.progress = $('.progress');

	this.next = $('button.quiz-next');
	this.back = $('button.quiz-back');

	this.page = 1;
};

ModalQuiz.prototype = Object.create( ModalItem.prototype );

ModalQuiz.prototype.show = function() {
	var self = this;

	ModalItem.prototype.show.apply(this, arguments);

	this.elem.find(self.step1).fadeIn(400);

	this.moveNext();
	this.movePrev();
};

ModalQuiz.prototype.moveNext = function() {
	var self = this;

	this.next.on('click', function() {
		console.log(self.page);

		if( self.page == 1) {
			self.step1.fadeOut(200, function() {
                self.step2.fadeIn(200);
                self.progress.find('li:first').removeClass('active');
                self.progress.find('li:nth-child(2)').addClass('active');

                self.page = 2;

                console.log(self.page);
                console.log('click');
            });
		} else if( self.page == 2){
			self.step2.fadeOut(200, function() {
                self.step3.fadeIn(200);
                self.progress.find('li:nth-child(2)').removeClass('active');
                self.progress.find('li:nth-child(3)').addClass('active');

                self.page = 3;

                console.log(self.page);
            });
		}	

	});
};

ModalQuiz.prototype.movePrev = function() {
	var self = this;

	this.back.on('click', function() {
		if( self.page == 3) {
			self.step3.fadeOut(200, function() {
                self.step2.fadeIn(200);
                self.progress.find('li:nth-child(3)').removeClass('active');
                self.progress.find('li:nth-child(2)').addClass('active');
                self.page = 2;

                console.log(self.page);
            });
		} else if( self.page == 2){
			self.step2.fadeOut(200, function() {
	            self.step1.fadeIn(200);
	            self.progress.find('li:nth-child(2)').removeClass('active');
	            self.progress.find('li:first').addClass('active');
	            self.page = 1;
	        });    

		}

	});
};

ModalQuiz.prototype.init = function() {
	var self = this;

	ModalItem.prototype.init.apply(this, arguments);

	this.elem.find('.send').on('click', function(e) {
		e.preventDefault();

		self.step2.fadeOut();
		self.step3.fadeOut();

		self.hide();
		self.page = 1;

		setTimeout(function() {
			self.progress.find('.active').removeClass('active');
			self.progress.find('li:first').addClass('active');
		}, 800);
	});
};

ModalQuiz.prototype.initClose = function() {
	var self = this;

	this.container.on('click', function(e) {
		if( $(e.target).closest('.modal').length == 0 ) {

			$(this).find('.modal.visible')
				.fadeOut(400, function() {
					$(this).removeClass('visible');
				});

			self.fadeOut();

			self.step2.fadeOut();
			self.step3.fadeOut();

			setTimeout(function() {
				self.progress.find('.active').removeClass('active');
				self.progress.find('li:first').addClass('active');
			}, 800);
		}

		self.page = 1;

	});
	
};


/* news */
var News = (function() {

	var _loadNews = function(button) {

        if( $('.hidden').length > 0) {
            $('.hidden').first().fadeIn(600, function() {
                $('.hidden').first().fadeIn(600, function() {
                    $('.hidden').first().fadeIn(600, function() {
                        if( $('.hidden').length == 0) {
                            button.fadeOut(400);
                        }
                    }).removeClass('hidden').css('display', 'inline-block');
                }).removeClass('hidden').css('display', 'inline-block');
            }).removeClass('hidden').css('display', 'inline-block');
        } 
	};

	var _initHandlers = function() {
		$('.show-news').on('click', function(e) {
			e.preventDefault();

			_loadNews( $(this) );
		});
	};

	return {
		init: _initHandlers
	};
})();




/* small help functions*/

function sliceText( item, length ) {
	item.each(function() {
		newString =  $(this).html().slice(0, length),
		i         = newString.lastIndexOf(' ');

		$(this).html( newString.slice(0, i) + '...' );	 
	});
}

function resizeNewsItemText( item ) { 
	item.each(function() {
		var h = $(this).find('h3').outerHeight(),
			p = $(this).find('p');

		switch( h ) {
			case 22:
			case 24:
			case 26:
				sliceText( p, 210 );
				break;

			case 42:
			case 44:
			case 52:
				sliceText( p, 182 );
				break;
				
			case 66:
			case 78:
				sliceText( p, 130 );
				break;	

			case 96:
				sliceText( $(this).find('h3'), 120 );
				sliceText( p, 100 );
				break;			
		}
	});
}

function resizeCatalogItemText( item ) { 
	item.each(function() {

		var d = $(this).find('div'),
			h = $(this).find('h3').height(),
			p = $(this).find('p');

		console.log('h3 - ', h);

		switch( h ) {
			case 21:
				sliceText( p, 160 );
				break;

			case 42:
				sliceText( p, 100 );
				d.addClass('mid-header');
				break;
				
			case 63:
				sliceText( p, 45 );
				d.addClass('big-header');
				break;		
		}
	});
}

function scrollTop(elem, elem_f) {
	var elem = $(elem),
		elem_f = $(elem_f);

	var point = ($(document).height() - $('body').height()) - $('.footer').height() - 20;

	$(window).on('scroll', function(e) {

		if( $(this).scrollTop() > 600 ) {
			elem.fadeIn();

			if( $(this).scrollTop() >= point)  {

				if( !elem.hasClass('invisible') ) {
					elem.addClass('invisible');
					elem_f.fadeIn();
				}

			} else {
				elem_f.fadeOut(function() {
					elem.removeClass('invisible');
				});
			}

		} else {
			$(elem).fadeOut();
		}

		
	});

	elem.on('click', function() {

		$('html, body').animate({
			scrollTop: 0
		}, 600);
	});

	elem_f.on('click', function() {

		$('html, body').animate({
			scrollTop: 0
		}, 600);
	});
}

function stickHeader() {
	$(window).on('scroll', function() {
		if( $(window).scrollTop() > 102 ) {
			$('.fixheader').fadeIn(400);
		} else {
			$('.fixheader').fadeOut(400);
		}
	});
}

function changePicture( img ) {
	img.each(function() {

		$(this).on('mouseenter', function() {
			var src = $(this).attr('src'),
				data = $(this).data('img');

			$(this).attr('src', data);

			$(this).on('mouseout', function() {
				$(this).attr('src', src);
			});
		});
	});
}

function changeVerticalAlign( elems ) {
	$(elems).each(function() {
		var span =  $(this).find('span');

		if( span.height() > 80 ) {
			span.addClass('va-top');
			$(this).find('img').addClass('va-top');
		} 
	});
}


function getFooterHeight() {
	
	var fh = $('.footer').innerHeight(),
		item = $('.footer__item'),
		itemH = [];
	

	$('.wrapper').css('margin-bottom', '-' + fh + 'px');
	$('head').append('<style> .wrapper:after{ content: ""; display: block; height: '+ fh +'px }</style>');

	item.each(function() {
		
		itemH.push( $(this).innerHeight() );
	});

	console.log(itemH);

	item.innerHeight( Math.max.apply(null, itemH) );
	
}

function checkForPhoto() {
	$('.news__img img, .card__left img').each(function() {
		if( !$(this).attr('src') ) {
			$(this).attr('src', '../images/nophoto.png')
		}
	});
}


function setSelectWidth() {
	$('ul.options').each(function() {
		var w = $(this).innerWidth();
		console.log(w);
		$(this).parents('.fancy-select').width( w );

		w = null;
	});
}

/* =======*/


/* initialize */
$(document).ready(function() {
	(function() {
		var m = $('.header .menu'),
			i = m.find('li'),
			il = m.find('li:last');

		if( i.length > 4) {

			i.addClass('more');
			il.css('margin-right', '0');

			m.css('text-align', 'left').addClass('clearfix');
		}else {

			i.removeClass('more');
			il.css('margin-right', '0');

			m.css('text-align', 'center').addClass('clearfix');
		}
	})();

	getFooterHeight();

	var mc = new ModalItem('call', '.call');
	mc.initClose();
	mc.init();


	scrollTop( '.scrollTop', '.scrollTop_f' );
	stickHeader();

	if( $('.basic').length > 0) {
		$('.basic').fancySelect();
	}


	if( $('.slider').length > 0) {

		$('.slider__wrapper').owlCarousel({
			pagination : true, 
			slideSpeed : 800,
			paginationSpeed : 400,
			singleItem:true,
			autoPlay: 5000
		});

	}


	if( $('.catalog__item').length > 0) {
		resizeCatalogItemText( $('.catalog__item') );

		sliceText( $('.catalog__item_big p'), 90 );
	}

	if( $('.news__item').length > 0 ) {
		resizeNewsItemText( $('.news__item') );

		News.init();
	}


	if( $('.about__partners').length > 0) {
		changePicture( $('.about__partners img') );

		changeVerticalAlign('.about__advantages li');

		var owl = $('.about__slider-wrapper ul').owlCarousel({
			
			pagination : false,
			navigation: false, 
			slideSpeed : 300,
		});

		$('.right').click(function(){
			owl.trigger('owl.next');
		});
		$('.left').click(function(){
			owl.trigger('owl.prev');
		});

		$('.fancybox-button').fancybox({
			helpers:  {
				overlay : {
				locked : false
				}
			}
		});
	}

	if( $('.card').length > 0) {
		var morder = new ModalItem('order', '.order');
		morder.initClose();
		morder.init();



		$('.fancybox-button').fancybox({
			helpers:  {
				overlay : {
				locked : false
				}
			}
		});
	}

	if( $('.calc').length > 0) {
		var mq = new ModalQuiz('quiz', '.open-quiz');
		mq.initClose();
		mq.init();	
	}

	if( $('.news__img img, .card__left img').length > 0 ) {
		checkForPhoto();
	}


	if( $('.catalog .basic').length > 0) {
		setSelectWidth();
	}
});