import { Box, Button } from "@mui/material";
import { useMicrophone } from "../MicrophoneContext";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useAudioPlayer } from "../AudioPlayerContext";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

const Toolbar = () => {
  const { startMicrophone, stopMicrophone, isRecording } = useMicrophone();
  const { isPlaying, play, pause } = useAudioPlayer();

  const toggleRecording = () => {
    isRecording ? stopMicrophone() : startMicrophone();
  };

  const togglePlaying = () => {
    isPlaying ? pause() : play();
  };

  return (
    <Box
      width="100%"
      p={1}
      component={"div"}
      display={"flex"}
      gap={2}
      flexDirection={"row"}
      position={"absolute"}
      top={0}
      zIndex={10}
    >
      <Button size="small" variant="outlined" onClick={toggleRecording}>
        {isRecording ? <MicOffIcon /> : <MicIcon />}
      </Button>
      <Button size="small" variant="outlined" onClick={togglePlaying}>
        {isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
      </Button>
    </Box>
  );
};

export default Toolbar;
