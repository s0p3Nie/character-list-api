const MongoDB = require('./Mongo/MongoDB');
const ApiIterator = require('./Common/ApiIterator');
const RawDataAdapter = require('./Common/RawDataAdapter');

/**
 * Сервис на запустить и забыть. Занимается инициализацией данных с "аналоговой" АПИ
 * 
 * Только в воскресенье вечером подумал что данные могут валяться в гите того АПИ.
 * Удивительно, но это оказалось верным предположением. Тупняк. И много потраченого времени.
 */
const init = async () => {
    let MongoClient = new MongoDB();
    let collections = MongoDB.COLLECTIONS_LIST;
    let ticks = collections.length;
    await MongoClient.createConnection();

    collections.forEach(async (element) => {
        MongoClient.setCollection(element);
        let Model = MongoClient.getModel();

        let removeResult = await Model.deleteMany();
        console.log('deleted ' + element + ' ' + removeResult.deletedCount);

        /**
         * В "аналоге" стоит жёсткое ограничение. Не больше 50 записей за запрос
         * У коллекции персонажей, например, тонна данных. По 50 руками не вариант
         * Решение. Рестовый пулемёт. 
         */
        let Iterator = new ApiIterator();
        Iterator.init(element);
        let total = 0;
        while (Iterator.isHaveMore()) {
            let docs = await Iterator.iterate();
            docs = RawDataAdapter.adapt(docs);
            Model.insertMany(docs, (err, docs) => {
                total += docs.length;
            });
        }

        console.log('\n' + total + ' ' + element + ' added');

        --ticks;
        if (!ticks) {
            close();
        }
    });
};

async function close() {
    await new MongoDB().disconnect();
    process.exit(0);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
