import raw from './lang.json';

export type LangCode = keyof typeof raw;
export type LangStringKey = keyof typeof raw.fr;

export default raw;
