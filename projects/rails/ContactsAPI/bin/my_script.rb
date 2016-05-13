require 'addressable/uri'
require 'rest-client'

def index_users
  url = Addressable::URI.new(
    scheme: 'http',
    # host: 'aa-contactsapi.herokuapp.com',
    # port: 80,
    host: 'localhost',
    port: 3000,
    path: '/users.json'
  ).to_s

  puts RestClient.get(url)
end

def create_user
  url = Addressable::URI.new(
    scheme: 'http',
    # host: 'aa-contactsapi.herokuapp.com',
    # port: 80,
    host: 'localhost',
    port: 3000,
    path: '/users.json'
  ).to_s

  puts RestClient.post(
    url,
    { :user => { :username => "Gizmo" } }
  )
end

create_user
