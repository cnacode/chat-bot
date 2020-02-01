export default (name: string): (string|undefined) | never => {
    if(process.env[name] === undefined || process.env[name] == '') throw new Error(`env ${name} not found`);
    return process.env[name];
}