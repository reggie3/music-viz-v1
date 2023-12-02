import { Canvas } from "@react-three/fiber";
import { Viz1 } from "./Viz1";
import "./App.css";
import { MicrophoneProvider } from "./MicrophoneContext";
import { Toolbar } from "./Toolbar";
import hackerTheme from "./hackerTheme";
import { Box, ThemeProvider } from "@mui/material";
import { AudioProvider } from "./AudioPlayerContext";
import { AudioAnalyzerProvider } from "./AudioAnalyzerContext/AudioAnalyzerContext";

function App() {
  return (
    <ThemeProvider theme={hackerTheme}>
      <AudioProvider>
        <MicrophoneProvider>
          <AudioAnalyzerProvider>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              component={"div"}
            >
              <Toolbar />
              <Canvas>
                <axesHelper />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <Viz1 />
              </Canvas>
            </Box>
          </AudioAnalyzerProvider>
        </MicrophoneProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
