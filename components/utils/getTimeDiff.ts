import moment from 'moment'

export const getTimeDiff = (position_updated_at: string) => {
  const startTime = moment(position_updated_at)// This will use the current time
  const nowTime = moment() // This will use the current time

  // Calculate the difference
  const duration = moment.duration(nowTime.diff(startTime))
  return duration.asMinutes()
}