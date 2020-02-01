type Strings = {
    criticalError: string
}

export let humanStrings: Strings = {
    criticalError: 'a critical error has happened in the application, please try again later',
}

/**
 * changes language for human specific strings for this module
 *
 * @remarks
 * Call this hook to set error messages in a specific language.
 * This method is compatible with cnacodei18n api
 *
 * @param { languageSpecific: Strings } - language specific strings for this module
 *
 */
export const i8nHook = ({ languageSpecific }: {languageSpecific: Strings}): void => {
    humanStrings = {...humanStrings, ...languageSpecific};
}
