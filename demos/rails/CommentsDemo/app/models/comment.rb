class Comment < ActiveRecord::Base
  validates :text, presence: true
  validates :parent_comment, presence: { if: -> { self.parent_comment_id } }
  validates :read, inclusion: [true, false]

  belongs_to :parent_comment, class_name: "Comment"
  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    dependent: :destroy
  )

  after_initialize do
    self.read = false if self.read.nil?
  end

  def self.tree
    comments = Hash.new()

    Comment.all.each do |comment|
      comments[comment.parent_comment_id] ||= []
      comments[comment.parent_comment_id] << comment
    end

    comments
  end
end
