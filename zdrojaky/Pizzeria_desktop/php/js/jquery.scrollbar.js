/**
 * jQuery plugin
 
 useage:
 $(selector).scrollBar({
 	 width : 400
	,height: 400
	,theme : 'class-name'
	,preload: true
 });
 
 
 */
(function($){
	$.fn.extend({
		scrollBar : function(config) {
			var	defaultConfig = {
					 width : 200
					,height: 200
					,theme : 'scrollable-default-theme'
					,preload: false
				}, target;
				
			// normalize config
			if (typeof(config) == 'object' && config != null)
			{
				config = $.extend(defaultConfig, config);
			} else {
				config = defaultConfig;
			}

			return this.each(function() {
				var $this = $(this); 
				/* manipulation */
				$this.wrap('<div class="scrollable-area '+ config.theme +'"/>')
					   .before('<div class="scroll-bar"><div class="scroll-handle"/></div>')
					   .wrap('<div class="scrollable-body"/>');
				
				target = $this.parent().parent();
				
				target.height(config.height);
				target.width(config.width);
				
				$this.mouseover(function() {
					$this.unbind('mouseover');
					$this.parent().css({'overflow-y': 'scroll'});

					//apply scrollable:
					var scrollBar = new ScrollBar(target);
				});
			});
		}
	});
})(jQuery);
