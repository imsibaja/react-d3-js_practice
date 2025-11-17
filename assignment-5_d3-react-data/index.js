const csvUrl = "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv"

const message = (data) => {
        let message = '';

        message = message + Math.round(d3.csvFormat(data).length / 1024) + " kb\n";
        message = message + data.length + " rows\n";
        message = message + data.columns.length + " columns\n";

        return message;
}

const App = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
    d3.csv(csvUrl).then(setData);
    }, []);

    return (
        <pre>{data ? message(data):'loading..'}</pre>
    )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);