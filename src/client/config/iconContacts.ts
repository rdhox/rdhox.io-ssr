import type { PictoName } from '../components/Picto';

export interface IconContact {
  name: PictoName;
  url: string;
  title: string;
}

const iconContacts: IconContact[] = [
  {
    name: 'maltIcon',
    url: 'https://www.malt.fr/profile/renauddechaux',
    title: 'Malt',
  },
  {
    name: 'githubIcon',
    url: 'https://github.com/rdhox',
    title: 'Github',
  },
  {
    name: 'mailIcon',
    url: 'mailto:contact@rdhox.io',
    title: 'mail',
  },
];

export default iconContacts;
