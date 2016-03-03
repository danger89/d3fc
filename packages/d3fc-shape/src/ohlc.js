import functor from './functor';

// Renders an OHLC as an SVG path based on the given array of datapoints. Each
// OHLC has a fixed width, whilst the x, open, high, low and close positions are
// obtained from each point via the supplied accessor functions.
export default (context) => {
    let x       = (d) => d.date;
    let open    = (d) => d.open;
    let high    = (d) => d.high;
    let low     = (d) => d.low;
    let close   = (d) => d.close;
    let orient  = 'vertical';
    let width   = functor(3);

    const ohlc = (data) => {
        const path = context();

        data.forEach((d, i) => {
            const xValue      = x(d, i);
            const yOpen       = open(d, i);
            const yHigh       = high(d, i);
            const yLow        = low(d, i);
            const yClose      = close(d, i);
            const halfWidth   = width(d, i) / 2;

            if (orient === 'vertical') {
                path.moveTo(xValue, yLow);
                path.lineTo(xValue, yHigh);

                path.moveTo(xValue, yOpen);
                path.lineTo(xValue - halfWidth, yOpen);
                path.moveTo(xValue, yClose);
                path.lineTo(xValue + halfWidth, yClose);
            } else {
                path.moveTo(yLow, xValue);
                path.lineTo(yHigh, xValue);

                path.moveTo(yOpen, xValue);
                path.lineTo(yOpen, xValue + halfWidth);
                path.moveTo(yClose, xValue);
                path.lineTo(yClose, xValue - halfWidth);
            }
        });

        return path.toString();
    };

    ohlc.x = (_x) => {
        if (!arguments.length) {
            return x;
        }
        x = functor(_x);
        return ohlc;
    };
    ohlc.open = (_x) => {
        if (!arguments.length) {
            return open;
        }
        open = functor(_x);
        return ohlc;
    };
    ohlc.high = (_x) => {
        if (!arguments.length) {
            return high;
        }
        high = functor(_x);
        return ohlc;
    };
    ohlc.low = (_x) => {
        if (!arguments.length) {
            return low;
        }
        low = functor(_x);
        return ohlc;
    };
    ohlc.close = (_x) => {
        if (!arguments.length) {
            return close;
        }
        close = functor(_x);
        return ohlc;
    };
    ohlc.width = (_x) => {
        if (!arguments.length) {
            return width;
        }
        width = functor(_x);
        return ohlc;
    };
    ohlc.orient = (_x) => {
        if (!arguments.length) {
            return orient;
        }
        orient = functor(_x);
        return ohlc;
    };

    return ohlc;
};
