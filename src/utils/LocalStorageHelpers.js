export const loadState = token => {
    try {
        let ledger = [];
        for (let i = 0; i < localStorage.length; i++) {
            let serializedStateKey = localStorage.key(i);
            if(!serializedStateKey.search(token)) {
                ledger.push(localStorage.getItem(serializedStateKey))
            }
        }
        const serializedState = "";
        if (serializedState === null) {
            return undefined;
        }
        console.log(ledger);
        return ledger;
        //return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
