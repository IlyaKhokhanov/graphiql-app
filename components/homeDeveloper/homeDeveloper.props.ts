type developerListT = {
  img: string;
  name: string;
  github: 'developers.ilya.github' | 'developers.sergey.github' | 'developers.andrey.github';
  description: string;
};

export interface HomeDeveloperProps extends developerListT {
  locale: string;
}
