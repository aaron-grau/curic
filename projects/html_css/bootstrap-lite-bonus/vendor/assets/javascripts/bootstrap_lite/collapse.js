/* A module for general collapsing, dropdown, show/hide functionality */

(function(root){
  // COLLAPSE CLASS DEFINITION
  // =========================
  var Collapse = function(element){
    this.$element = $(element);
    this.$target = $($(element).data('target'));
    this.visible = this.$target.hasClass('visible');
  }
  
  Collapse.prototype.toggle = function(){
   this.$target.toggleClass('visible'); 
  }

  // COLLAPSE PLUGIN DEFINITION
  // ==========================
  $.fn.collapse = function(option){
    return this.each(function(){
      var $el = $(this);
      if(!$el.data('my.collapse')){
        $el.data('my.collapse', (new Collapse(this)));
      }
      $el.data('my.collapse').toggle();
    });
  
  }

  // ADDING FUNCTIONALITY TO THE DOM
  // ===============================
  $(document).on("click", '[data-toggle="collapse"]', function(e){
    e.preventDefault();
    $(this).collapse();
  });
})(jQuery);
