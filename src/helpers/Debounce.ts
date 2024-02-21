const Debounce = (func: Function, timeout = 200) => {
    let timer: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};

export default Debounce;
