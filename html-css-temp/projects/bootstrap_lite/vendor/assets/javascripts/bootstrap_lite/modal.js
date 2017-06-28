(function ($) {
  // MODAL CLASS DEFINITION
  //=========================
  
  function Modal(element, options){
    this.$element = $(element);
    this.options = options;
    this.isShown = null;
  };
  
  Modal.DEFAULTS = {
    "backdrop": true
  };
    
  Modal.prototype.show = function(e) {
    if(this.isShown || e.isDefaultPrevented()){ return };
    if(this.options["backdrop"]){
      this.addBackdrop();
    }
    this.$element.show();
    this.$element.trigger("show.my.modal");
    this.isShown = true;
    this.bindCloseEvent();
  };
  
  Modal.prototype.bindCloseEvent = function(){
    this.$element.on("click", "[data-dismiss='modal']", this.hide.bind(this));
    this.$element.on("click", this.hide.bind(this));
  };

  Modal.prototype.hide = function(e) {
    if(e.currentTarget === e.target){
      this.$element.off("click");
      if(!this.isShown || e.isDefaultPrevented()){ 
        return };
      this.removeBackdrop();
      this.$element.hide();
      this.$element.trigger("hide.my.modal");
      this.isShown = false; 
    }
  };
  
  Modal.prototype.toggle = function(e) {
    (this.isShown) ? this.hide(e) : this.show(e);
  };

  Modal.prototype.addBackdrop = function() {
    var backdrop = $("<div></div>").addClass("modal-backdrop");
    $("body").append(backdrop); 
  };

  Modal.prototype.removeBackdrop = function() {
    $(".modal-backdrop").remove();
  };
  
  // MODAL PLUGIN DEFINITION
  // ========================
  
  $.fn.modal = function (passedOptions) {
    return this.each(function () {
      var $this = $(this);
      var mergedOpts = $.extend({}, Modal.DEFAULTS, passedOptions)
      $this.data('my.modal', (data = new Modal(this, mergedOpts)));
    });
  }
  
  // ADDING FUNCTIONALITY TO THE DOM
  // ================================
  $(document).on('click', '[data-toggle="modal"]', function(e){
    var targetModalEl = $(e.currentTarget).data("target");
    if(!($(targetModalEl).data('my.modal'))){
      // add processing of options from data later
      $(targetModalEl).modal({});
    }
    $(targetModalEl).data('my.modal').toggle(e);
  });

})(jQuery);
