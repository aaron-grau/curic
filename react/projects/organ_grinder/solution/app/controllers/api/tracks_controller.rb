class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.find(params[:id])

    if @track.destroy
      render json: @track, status: 200
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  ROLL_FILTER = {:roll => [:time, :notes => []]}

  def track_params
    params.require(:track).permit(:name, ROLL_FILTER)
  end
end
