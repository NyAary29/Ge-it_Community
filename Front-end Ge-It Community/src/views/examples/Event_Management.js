import React from 'react'
import Header from 'components/Headers/Header'
import MyLoading from 'components/Loading/MyLoading'
import MySchedule from 'components/Calendar/Schedule'
function Event() {
  return (
    <div>
      <MyLoading />
      <Header />
      <MySchedule/>
    </div>
  )
}

export default Event
