require 'socket'

class Webserver
  attr_reader :host, :port, :tcp_server

  def initialize(host: 'localhost', port: 3000)
    @host = host
    @port = port
    @tcp_server = TCPServer.new(host, port)
  end

  def start
    puts "Starting server on #{host}:#{port}"

    loop do
      client_socket = tcp_server.accept
      request_str = process_request(client_socket)
      request = request_str.split("\r\n")
      method, path, http_version = request.first.split

      puts "[#{Time.now}] #{method} #{path} #{client_socket.addr.last}"

      client_socket.print "HTTP/1.1 200 OK\r\n"
      client_socket.print "Connection: close\r\n"
      client_socket.print "\r\n"
      client_socket.print "Hello world"
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


