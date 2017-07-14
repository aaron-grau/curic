class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def generate_unique_token_for_field(field)
    token = SecureRandom.base64_urlsafe(16)

    while self.class.exists?(field => token)
      token = SecureRandom.base64_urlsafe(16)
    end

    token
  end
end
