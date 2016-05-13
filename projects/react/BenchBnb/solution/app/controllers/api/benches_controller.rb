class Api::BenchesController < ApplicationController
  def index
    benches = Bench.all
    if(bounds)
      benches = Bench.in_bounds(bounds)
    end

    if (params[:minSeating] && params[:maxSeating])
      benches = benches.where(seating: seating_range)
    end
    @benches = benches.includes(:reviews)
    render 'index'
  end

  def create
    bench = Bench.create!(bench_params)
    render json: bench
  end

  private

  def seating_range
    (params[:minSeating]..params[:maxSeating])
  end

  def bench_params
    params.require(:bench).permit(
      :lat,
      :lng,
      :description,
      :seating
    )
  end

  def bounds
    params[:bounds]
  end
end
