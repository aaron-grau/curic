require_relative '../phase5/router'
require_relative './route_helpers'

module Phase8
  class Route < Phase5::Route
    def initialize(pattern, http_method, controller_class, action_name)
      super
      add_route_helpers
    end

    private

    def add_route_helpers
      case action_name
      when :edit
        name = "edit_#{ class_name_singular }"
        add_path_method(name, "/#{ class_name_plural }/:id/edit")
      when :new
        name = "new_#{ class_name_singular }"
        add_path_method(name, "/#{ class_name_plural }/new")
      when :show, :destroy, :update
        name = "#{ class_name_singular }"
        add_path_method(name, "/#{ class_name_plural }/:id")
      when :index, :create
        name = "#{ class_name_plural }"
        add_path_method(name, "/#{ name }")
      end
    end

    def class_name
      controller_class.to_s.underscore.gsub('_controller', '')
    end

    def class_name_plural
      class_name.pluralize
    end

    def class_name_singular
      class_name.singularize
    end

    def add_path_method(name, path)
      path_name = "#{ name }_path"
      puts "#{ path_name } #=> #{ path }"

      RouteHelpers.send(:define_method, path_name) do |*args|
        id = args.first.to_s
        if path.include?(':id') && !id.nil?
          path.gsub!(':id', id)
        end
        path
      end
    end
  end

  class Router < Phase5::Router
    def add_route(pattern, method, controller_class, action_name)
      @routes << Route.new(
        pattern,
        method,
        controller_class,
        action_name
      )
    end
  end
end
