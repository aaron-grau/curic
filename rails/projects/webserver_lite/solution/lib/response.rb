class Response
  attr_reader :http_version, :body
  attr_accessor :status, :headers

  STATUS_NAMES = {
    200 => 'OK'
  }

  def initialize
    @headers = {}
    @http_version = 'HTTP/1.1'
    @status = 200
    @body = ''
  end

  def write(message)
    body << message
  end


  def to_s
    res = ''
    res << "#{http_version} #{status} #{STATUS_NAMES[status]}\r\n"
    res << "Connection: close\r\n"
    headers.each do |key, val|
      res << "#{key}: #{val}\r\n"
    end
    res << "\r\n"
    res << body
    res
  end
end
