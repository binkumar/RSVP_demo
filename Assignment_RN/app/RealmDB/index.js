const Realm = require("realm");
import mockData from '../Resources/MOCK_DATA-2.json';

const Registration = {
    name: 'Registration',
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        name: { type: 'string?' },
        age: { type: 'int' },
        dob: { type: 'string?' },
        locality: { type: 'string?' },
        no_of_guests: { type: 'int' },
        profession: { type: 'string?' },
        address: { type: 'string?' }
    },
};

let databaseOptions = {
    path: "assignment",
    schema: [Registration],
    schemaVersion: 0,
    // encryptionKey: new Int8Array(64),
};


export const insertData = async () =>
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                mockData.map(obj => realm.create(Registration.name, obj, Realm.UpdateMode.Modified))
            })
            return Promise.resolve("DB Inserted");
        })
        .catch(error => Promise.reject(error));


export const queryDB = async (query) =>
    Realm.open(databaseOptions)
        .then(realm => {
            let queryList = null;
            if (!query) {
                queryList = realm.objects(Registration.name).snapshot();
            } else {
                queryList = realm.objects(Registration.name).filtered(query).snapshot();
            }
            console.log("Fetched DB data", queryList);
            return Promise.resolve(queryResultsToArray(queryList));
        })
        .catch(error => Promise.reject(error));


const queryResultsToArray = (queryResults) => {
    let objectArr = [];
    for (let obj in queryResults) {
        objectArr.push(JSON.parse(JSON.stringify(queryResults[obj])));
    }
    return objectArr;
}
