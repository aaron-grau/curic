class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def generate_unique_token_for_field(field)
    token = SecureRandom.urlsafe_base64(16)

    while self.class.exists?(field => token)
      token = SecureRandom.urlsafe_base64(16)
    end

    token
  end
end
