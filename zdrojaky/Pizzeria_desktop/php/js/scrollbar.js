ScrollBar = function(selector) {
	var  $this = this;
	
	this.scrollableBox	= $(selector);
	this.contentBox		= this.scrollableBox.children('.scrollable-body');
	this.scrollBar		= this.scrollableBox.children('.scroll-bar');
	this.scrollHandle	= this.scrollBar.children('.scroll-handle');

	/** initialize some visual attributes
	 *  you may need to reinitialize the visual settings later..
	 */
	this.init = function() {
		//hide the browsers scrollBar:
		$this.contentBox.css('width', $this.scrollableBox.width() + 15);
		
		$this.boxHeight		= $this.scrollableBox.height();
		$this.contentHeight	= $this.contentBox[0].scrollHeight;
		$this.handleHeight	= $this.boxHeight * $this.boxHeight / $this.contentHeight;
		$this.scale			= ($this.boxHeight - $this.handleHeight) / ($this.contentHeight - $this.boxHeight);
		
		//set the handle scrollbar
		$this.scrollHandle.css('height', $this.handleHeight);
	};

	//initialiaze some visual attributes:
	this.init();
	
	//bind the events to scrollbar elements:
	this.scrollableBox.mouseover(function(event){
		$this.scrollBar.show();
	});
	
	this.scrollableBox.mouseleave(function(){
		if (!$(this).is(this.scrollBar)) {
			$this.scrollBar.fadeOut();
		}
	});
	
	this.contentBox.scroll(function(event){
		$this.handlePosition = $this.contentBox.scrollTop() * $this.scale;
		$this.handleUpdate();
	});
	
	
	this.scrollBar.click(function(downEvent){
		if (!$(downEvent.target).is('.scroll-handle')) {
			$this.scrollTo(downEvent.layerY);
		}
	});
	
	// move
	this.scrollHandle.mousedown(function(downEvent) {
		//start bind to mouse move 
		var handlePosition, oY;
		handlePosition = $this.scrollHandle.css('top');
		handlePosition = handlePosition.substring(0, handlePosition.length-2) * 1;
		oY = downEvent.pageY - handlePosition + downEvent.layerY;
		
		$('html').bind('mousemove', function(moveEvent){
			var handlePosition = moveEvent.pageY - oY;
			$this.scrollTo(handlePosition);
		});
		
		return false;
	});
	
	$('html').mouseup(function() {
		//stop bind to mouse move 
		$('html').unbind('mousemove');
	});
	
	this.handleUpdate = function() {
		this.scrollHandle.css('top', $this.handlePosition);
	};
	
	// @param position: the scroll handle position
	this.scrollTo = function(handlePosition) {
		// Top of the page:
		if (handlePosition < 0)
		{
			handlePosition = 0;
		}
		
		// Bottom of the page:
		if (handlePosition > $this.boxHeight - $this.handleHeight)
		{
			handlePosition = $this.boxHeight - $this.handleHeight;
		}
			
		$this.handlePosition = handlePosition;
		$this.handleUpdate();
		
		//scroll the content:
		$this.contentBox.scrollTop(handlePosition / $this.scale);
	};

};
