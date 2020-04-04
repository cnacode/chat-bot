import * as pkj from '../../../package.json'

export const generateAppData = (deps: MethodDependencies) => {
    const { name, version } = pkj
    return {
        name,
        version,
    }
}
