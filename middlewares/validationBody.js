const {RequestError} = require("../helpers");

const vallidationBody = schema => {
    const func = async(req, _, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            next(RequestError(400, error.message));
        }
        next();
    }

    return func;
}

module.exports = vallidationBody;