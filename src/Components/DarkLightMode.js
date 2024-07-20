<div style={{ backgroundColor: Mode }}>
  <input
    type="button"
    value={Mode}
    onClick={() => (Mode === "black" ? setMode("white") : setMode("black"))}
  />
</div>;
const [Mode, setMode] = useState("black");
