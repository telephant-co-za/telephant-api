import { Mockgoose } from 'mockgoose';

if (process.env.NODE_ENV === 'test') {
    // use mockgoose for testing
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(() => {
        mongoose.connect(process.env.mongoDB);
    });
} else {
    // use the real deal for everything else
    mongoose.connect(process.env.mongoDB);
}