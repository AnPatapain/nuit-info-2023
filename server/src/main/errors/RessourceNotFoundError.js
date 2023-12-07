class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "RessourceNotFoundError"
    }
}

module.exports = ResourceNotFoundError