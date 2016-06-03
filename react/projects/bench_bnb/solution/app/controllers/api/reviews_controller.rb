class Api::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)

    if review.save
      @bench = review.bench
      render '/api/benches/show'
    else
      render json: review, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :body, :bench_id)
  end
end
