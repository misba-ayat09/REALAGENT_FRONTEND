type ColorsType = {
  [key: string]: string;
};
const getBackgroundColor = (letter: string) => {
  const colors: ColorsType = {
    A: '#FFCDD2',
    B: '#F8BBD0',
    C: '#E1BEE7',
    D: '#D1C4E9',
    E: '#C5CAE9',
    F: '#BBDEFB',
    G: '#B3E5FC',
    H: '#B2EBF2',
    I: '#B2DFDB',
    J: '#C8E6C9',
    K: '#DCEDC8',
    L: '#F0F4C3',
    M: '#FFECB3',
    N: '#FFE0B2',
    O: '#FFCCBC',
    P: '#D7CCC8',
    Q: '#F5F5F5',
    R: '#CFD8DC',
    S: '#FFCDD2',
    T: '#F8BBD0',
    U: '#E1BEE7',
    V: '#D1C4E9',
    W: '#C5CAE9',
    X: '#BBDEFB',
    Y: '#B3E5FC',
    Z: '#B2EBF2'
  };

  return colors[letter.toUpperCase() as keyof ColorsType] || '#ddd';
};

const LetterIcon = ({ letter }: { letter: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: getBackgroundColor(letter),
    color: '#333',
    fontSize: '12px',
    fontWeight: 'bold'
  }}>
    {letter}
  </div>
);

export default LetterIcon;
