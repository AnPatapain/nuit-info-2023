class DailyFactError extends Error {
    constructor(message) {
        super(message)
        this.name = "DailyFact"
    }
}


module.exports = DailyFactError
