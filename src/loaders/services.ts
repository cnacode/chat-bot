import metaService from '../services/meta'
import messageService from '../services/message'

export default function (app: Application, deps: ServiceDependencies) {
    metaService(app, deps)
    messageService(app, deps)
}
