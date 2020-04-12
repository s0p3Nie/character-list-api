const Config = require('../Resources/config');

const protocol = Config.serverHasSertificate ? 'https' : 'http';
const host = Config.server.host;
const port = (Config.server.port ? (':' + Config.server.port) : '');

class RawDataAdapter {
    static soloUrl = ['father', 'mother', 'currentLord', 'heir', 'overlord', 'founder'];
    static multipleUrl = ['characters', 'povCharacters', 'books', 'povBooks', 'cadetBranches', 'swornMembers'];

    static adapt(rawData) {
        rawData.forEach(element => {
            element.url = this.urlUpdate(element.url);
            RawDataAdapter.soloUrl.forEach(key => {
                if (element[key] && element[key].length) {
                    element[key] = this.urlUpdate(element[key]);
                }
            });

            RawDataAdapter.multipleUrl.forEach(key => {
                if (element[key] && element[key].length) {
                    element[key] = element[key].map((value) => {return this.urlUpdate(value)})
                }
            });
        });

        return rawData;
    }

    static urlUpdate(string) {
        let base = 'https://anapioficeandfire.com';
        if (string.includes(base)) {
            return protocol + '://' + host + port + string.slice(base.length)
        }
    }
}

module.exports = RawDataAdapter;
