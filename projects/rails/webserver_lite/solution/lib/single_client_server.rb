require 'socket'
require_relative 'request'
require_relative 'response'

class Webserver
  attr_reader :host, :port, :tcp_server, :app

  def initialize(app, host: 'localhost', port: 3000)
    @host = host
    @port = port
    @tcp_server = TCPServer.new(host, port)
    @app = app
  end

  def start
    puts "Starting server on #{host}:#{port}"

    loop do
      client_socket = tcp_server.accept
      request_str = process_request(client_socket)

      request = Request.new(request_str)
      response = Response.new

      puts "[#{Time.now}] #{request.method} #{request.path} #{client_socket.addr.last}"

      status, headers, body = app.call(request.env)

      response.status = status

      body.each do |chunk|
        response.write(chunk)
      end

      response.headers = headers

      client_socket.print(response)
      client_socket.close
    end
  end

  def process_request(client_socket)
    request_str = ""

    loop do
      line = client_socket.gets
      request_str += line if line
      break if line == "\r\n"
    end

    request_str
  end
end


