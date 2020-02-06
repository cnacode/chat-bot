export default {
    generateMetaData: async () => {
        const { version } = require('../../../../package.json');
        console.log(version);

        return {
            version,
            apiName: process.env['API_NAME'],
        }
    }
}