# == Schema Information
#
# Table name: taggings
#
#  id               :integer          not null, primary key
#  tag_topic_id     :integer          not null
#  shortened_url_id :integer          not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Tagging < ActiveRecord::Base

  validates :shortened_url_id, :tag_topic_id, presence: true
  validates :shortened_url_id, uniqueness: { scope: :tag_topic_id }

  belongs_to :tag_topic,
  primary_key: :id,
  foreign_key: :tag_topic_id,
  class_name: :TagTopic


  belongs_to :shortened_url,
  primary_key: :id,
  foreign_key: :shortened_url_id,
  class_name: :ShortenedUrl

end
