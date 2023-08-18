const drumPads = [
  {
    keyCode: 81,
    text: "Q",
    audioClip: "Heater 1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    text: "W",
    audioClip: "Heater 2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    text: "E",
    audioClip: "Heater 3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    text: "A",
    audioClip: "Heater 4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    text: "S",
    audioClip: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    text: "D",
    audioClip: "Open HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    text: "Z",
    audioClip: "Kick n' Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    text: "X",
    audioClip: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    text: "C",
    audioClip: "Closed HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [key, setKey] = React.useState("");
  const [record, setRecord] = React.useState("");
  const [onRecord, SetOnRecord] = React.useState(true);
  const [speed, setSpeed] = React.useState(0.5);

  const handleKeyPress = (e) => {
    drumPads.forEach((pad) => {
      if (e.keyCode === pad.keyCode) {
        handlePlayPad(pad.text, pad.audioClip);
      }
      SetOnRecord(true);
    });
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handlePlayPad = (id, name) => {
    const tap = document.getElementById(id);
    tap.play();

    setKey(name.toUpperCase());
    setRecord((prev) => prev + id);
  };

  const handlePlay = () => {
    if (record === "") {
      SetOnRecord(true);
    } else {
      SetOnRecord(false);
    }
    let index = 0;
    let recordArr = record.split("");

    const interval = setInterval(() => {
      const recording = document.getElementById(recordArr[index]);
      recording.play();
      index++;
    }, 600 * speed);

    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArr.length - 1
    );
  };

  const handleStop = () => {
    SetOnRecord(true);
    setRecord("");
    setKey("");
  };

  const handleRepeat = () => {
    let index = 0;
    let recordArr = record.split("");

    const interval = setInterval(() => {
      const recording = document.getElementById(recordArr[index]);
      recording.play();
      index++;
    }, 600 * speed);

    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArr.length - 1
    );
  };

  return (
    <div className="app">
      <h1 className="hero">Tap away!</h1>
      <div id="drum-machine">
        <div id="display">{key}</div>
        <div className="record">{record} </div>
        <div className="interactive">
          <input
            type="range"
            step="0.01"
            value={speed}
            max="1"
            min="0.1"
            onChange={(e) => {
              setSpeed(e.target.value);
              SetOnRecord(true);
            }}
          ></input>
          {onRecord === true ? (
            <i className="fa-solid fa-play btn" onClick={handlePlay}></i>
          ) : (
            <div className="stopPause">
              <i className="fa-solid fa-stop" onClick={handleStop}></i>
              {"  "}
              <i className="fa-solid fa-repeat" onClick={handleRepeat}></i>
            </div>
          )}
        </div>

        <div className="drum-pads">
          {drumPads.map((pad) => (
            <div
              className="drum-pad"
              key={pad.keyCode}
              id={drumPads.indexOf(pad)}
              onClick={() => handlePlayPad(pad.text, pad.audioClip)}
            >
              {pad.text}
              <audio className="clip" id={pad.text} src={pad.src}></audio>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);
