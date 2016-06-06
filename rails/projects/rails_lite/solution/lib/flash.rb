require 'json'

class Flash
  attr_reader :now

  def initialize(req)
    cookie = (req.cookies['_rails_lite_app_flash'])
    cookie_content = cookie ? JSON.parse(cookie) : {}
    @now = FlashStore.new(cookie_content)
    @flash = FlashStore.new
  end

  def [](key)
    @flash[key] || @now[key]
  end

  def []=(key, value)
    @flash[key] = value
  end

  def store_flash(res)
    res.set_cookie('_rails_lite_app_flash', value: @flash.to_json, path: '/')
  end
end


class FlashStore
  def initialize(store = {})
    @store = store
  end

  def [](key)
    val = @store[key.to_s]

    if val.is_a?(String) && val.start_with?("__SYM__")
      return val.slice(7, val.length).to_sym
    end

    val
  end

  def []=(key, val)
    val = "__SYM__" + val.to_s if val.is_a?(Symbol)
    @store[key.to_s] = val
  end

  def to_json
    @store.to_json
  end
end
