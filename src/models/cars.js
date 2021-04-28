const mongoose = require('mongoose');

const mongoHost = process.env['MONGO_HOST'] || 'localhost';
const mongoPort = process.env['MONGO_PORT'] || 27017;

const Car = mongoose.model('cars', { make: String, model: String, year: Number });

const defer = (fn) => {
    return async (data) => {
        const connection = await mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/simple_node_app`, {
            useNewUrlParser: true, useUnifiedTopology: true
        });

        try {
            return await fn(data);
        } finally {
            connection.disconnect();
        }
    };
}

module.exports = {
    save: defer(
        async ({ make, model, year }) =>
            await new Car({ make, model, year }).save()
    ),
    update: defer(
        async ({ make, model, year, id }) =>
            await Car.findByIdAndUpdate(id, { make, model, year }).exec()
    ),
    delete: defer(
        async (id) =>
            await Car.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec()
    ),
    findById: defer(
        async (id) => await Car.findById(id).exec()
    ),
    findAll: defer(
        async () => await Car.find({}).exec()
    ),
};
