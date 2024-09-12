import { developerListT } from './homeList.props';
import { HomeDeveloper } from '../homeDeveloper/homeDeveloper';

import styles from './homeList.module.css';

const developers: developerListT[] = [
  {
    img: '/ilya.jpg',
    name: 'developers.ilya.name',
    github: 'developers.ilya.github',
    description: 'developers.ilya.description',
  },
  {
    img: '/sergey.jpg',
    name: 'developers.sergey.name',
    github: 'developers.sergey.github',
    description: 'developers.sergey.description',
  },
  {
    img: '/andrey.jpg',
    name: 'developers.andrey.name',
    github: 'developers.andrey.github',
    description: 'developers.andrey.description',
  },
];

export const HomeList = ({ locale }: { locale: string }) => {
  return (
    <ul className={styles.list}>
      {developers.map((el) => (
        <HomeDeveloper
          locale={locale}
          key={el.name}
          img={el.img}
          name={el.name}
          github={el.github}
          description={el.description}
        />
      ))}
    </ul>
  );
};
