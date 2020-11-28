interface TypesCharacters {
  caracter: string;
  replace: string;
}

const Characters: TypesCharacters[] = [
  {caracter: '&', replace: 'E'},
  {caracter: "'", replace: '"'},
  {caracter: '`', replace: ''},
  {caracter: '*', replace: ''},
];

export default Characters;
