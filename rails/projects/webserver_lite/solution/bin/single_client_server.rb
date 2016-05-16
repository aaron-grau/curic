require_relative '../lib/single_client_server'

app = Proc.new do |env|
  ['200', {'Content-type' => 'text/html'}, ['Hello world']]
end

server = Webserver.new(app)

server.start

