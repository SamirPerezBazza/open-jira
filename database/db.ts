import mongoose from 'mongoose';

const mongoConnection = {
  isConnected: 0,
};


export const connect = async () => {

  if (mongoConnection.isConnected) {
    console.log('Connected!');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('Using Previous connection!');
      return;
    }

    await mongoose.disconnect();
  }


  await mongoose.connect(process.env.MONGO_URL || '');

  mongoConnection.isConnected = 1;

  console.log(`Succesfully connected to ${process.env.MONGO_URL}!`);

};

export const disconnect = async () => {

  if (process.env.NODE_ENV === 'development') return;

  if (mongoConnection.isConnected === 0) {
    console.log('There is no connection to be closed!');
    return;
  }


  await mongoose.disconnect();
  console.log('Succesfully disconnected!');

};