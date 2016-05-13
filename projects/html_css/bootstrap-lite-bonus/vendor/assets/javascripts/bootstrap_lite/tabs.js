(function ($) {
  // TABS CLASS DEFINITION
  //=======================
  
  function Tab(element){
    this.$element = $(element);
    this.$pane = $((this.$element.data("target")));
  }
  
  Tab.prototype.show = function(){
    if(this.$element.hasClass('active')){
      return
    }
    var previous = $(this.$element.parent()).children("li.active")[0];
    if(previous){
      var prevTab = $(previous).data('my.tab');
      if (!(prevTab)){
        $(previous).tab();
      }
      $(previous).data('my.tab').deactivate();
    }
    this.activate();
  };
  
  Tab.prototype.activate = function(){
    this.$element.addClass("active");
    this.$pane.addClass("active");
    this.$element.trigger("show.my.tab");
  };
  
  Tab.prototype.deactivate = function(){
    this.$element.removeClass("active");
    this.$pane.removeClass("active");
    this.$element.trigger("hide.my.tab");
  };
  
  // TABS PLUGIN DEFINITION
  //========================
  
  
  $.fn.tab = function (option) {
    return this.each(function () {
      var $el = $(this);
      if(!($el.data('my.tab'))){
        $el.data('my.tab', (new Tab(this))); 
      }
      $el.data('my.tab').show();
    });
  }
  
  // ADDING FUNCTIONALITY TO THE DOM
  // ================================
  $(document).on('click', '[data-toggle="tab"]', function(e){
    e.preventDefault();
    $(this).tab();
  });
  
})(jQuery);
  
  
