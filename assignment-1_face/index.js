// Do NOT use import statements here — React and ReactDOM are already global

const width = 160;
const height = 160;

const array = d3.range(5 * 7);

const App = () => array.map(() => (
    <Face 
        width = {width}
        height = {height}
        centerX = {width / 2}
        centerY = {height / 2}
        strokeWidth = {10}
        eyeOffSetX = {30 + Math.random() * 15}
        eyeOffSetY = {30 + Math.random() * 5}
        eyeRadius = {5 + Math.random() * 10}
        mouthWidth = {7 + Math.random() * 3}
        mouthRadius = {40 + Math.random() * 10}
    />
));

// Use React 18 modern API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
