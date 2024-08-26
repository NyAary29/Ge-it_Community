import React from 'react'
import Header from 'components/Headers/Header'
import MyLoading from 'components/Loading/MyLoading'
import ScheduleManager from 'components/Calendar/DisplaySchedules'
function Event() {
  return (
    <div>
      <MyLoading />
      <Header />
      <ScheduleManager />
    </div>
  )
}

export default Event
