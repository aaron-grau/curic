class Request
  attr_reader :headers, :method, :path, :http_version
  def initialize(string)
    @headers = parse(string)
  end

  def env
    headers
  end

  private

  def parse(string)
    res = {}
    headers = string.split(/\r\n/)
    first_line = headers.shift.split
    @method = first_line[0]
    @path = first_line[1]
    @http_version = first_line[2]
    headers.each do |header_line|
      key, val = header_line.split(': ')
      res[key] = val
    end
    res
  end
end
