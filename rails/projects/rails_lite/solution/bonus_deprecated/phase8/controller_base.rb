require_relative '../phase7/controller_base'
require_relative './router'
require_relative './route_helpers'

module Phase8
  class ControllerBase < Phase7::ControllerBase
    include RouteHelpers
  end
end
