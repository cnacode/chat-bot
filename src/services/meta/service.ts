import getVersion from '../../version';

export default {
    generateMetaData: async () => {
        return {
            version: getVersion(),
            apiName: process.env['API_NAME'],
        }
    }
}