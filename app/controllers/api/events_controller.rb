class Api::EventsController < ApplicationController
  def index
    event = Event.first.date
    render json: { date: event, yesterday: event - (60 * 60 * 24), tomorrow: event + (60 * 60 * 24) }
  end
end
