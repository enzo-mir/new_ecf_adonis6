import React from 'react'
interface HomeProps {
  title: string
}
const home: React.FunctionComponent<HomeProps> = ({ title }) => {
  return <div>hello ! {title}</div>
}

export default home
