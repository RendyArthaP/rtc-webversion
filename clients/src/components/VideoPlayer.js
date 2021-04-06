import React, { useContext } from 'react'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const classes = useStyles()
  const { 
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call
  } = useContext(SocketContext)

  return (
    <Grid container className={classes.gridContainer}>
      {/* My Video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid 
            item 
            xs={12} 
            md={6}
          >
            <Typography 
              variant="h5" 
              gutterBottom
            >
              {name || 'Name'}
            </Typography>
            <video 
                playsInline 
                muted 
                ref={myVideo}
                autoPlay 
                className={classes.video} 
              />
          </Grid>
        </Paper>
      )}
      {/* End My Video */}

      {/* Other User Video */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid 
            item 
            xs={12} 
            md={6}
          >
            <Typography 
              variant="h5" 
              gutterBottom
            >
              {call.name || 'Callers Name'}
            </Typography>
            <video 
                playsInline  
                ref={userVideo} 
                autoPlay 
                className={classes.video} 
              />
          </Grid>
        </Paper>
      )}
      {/* End Other User Video */}
    </Grid>
  )
}

export default VideoPlayer
