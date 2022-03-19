import React from 'react'
import { Button } from '@material-ui/core'
function Loading() {
  return (
    <div>
      Loading.....
      <Button onClick={() => window.location.reload(false)}>Reload!</Button>
    </div>
  )
}

export default Loading
