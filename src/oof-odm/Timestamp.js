export default class Timestamp {
    constructor (value) {
        this.value = value;
    }

    /* #region Getters */

    get toDate () {
       return this.value.toDate();
    }

    get asUTC () {
        return Timestamp.treatAsUTC(this.toDate);
    }

    get timeSince () {
        if (this.value === undefined) {
            // TODO: Add support for months with more or less than 30 days
            // TODO: Does this cover leap years/seconds?
            const intervals = new Map([                                                                 
                ["year"  , 31536000],
                ["month" , 2592000],
                ["week"  , 604800],
                ["day"   , 86400],
                ["hour"  , 3600],
                ["minute", 60],
                ["second", 1]
            ]); 
            const difference = Timestamp.treatAsUTC(Date.now()) - this.asUTC;
            const results    = new Map();        
            let   delta      = Math.abs(difference) / 1000;                           
            intervals.forEach((milliseconds, interval) => {
                results.set(interval, Math.floor(delta / milliseconds));
                delta -= results.get(interval) * milliseconds;
            });
            for (const [interval, value] of results) {
                const isPlural = value > 1;
                if (value) return `${value} ${interval}${isPlural ? "s" : ""}`;
            }
        }
        return "0 seconds";
    }    
    
    /* #endregion Getters */

    static treatAsUTC (date) {
        const result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
}