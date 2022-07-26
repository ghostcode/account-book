import react , { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import routes from '../src/router'
import './App.css'

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'


function App() {

  return (
    <Router>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <Routes>
          {
            routes.map((route, i) => {
              return (<Route key={route.path} path={route.path} element={<route.component/>}></Route>)
            })
          }
        </Routes>
      </ConfigProvider>
    </Router>
  )
}

export default App
