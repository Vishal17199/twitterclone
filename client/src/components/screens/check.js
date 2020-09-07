import React, { useEffect } from "react"
import { useHistory } from 'react-router-dom'



function Check() {
  const history = useHistory()

  if (!localStorage.getItem("jwt") || !localStorage.getItem("user")) {
    localStorage.clear()
    history.push('/signin')
  } else {
    history.push('/bbvfvjksrjfvnmzcvbnmhgjsdhfgvj')
  }



  return (
    <div>
      <h2>Loading</h2>
    </div>
  )
}

export default Check;