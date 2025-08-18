import { FaRegPauseCircle } from 'react-icons/fa';

const PauseButton = (props) => {
  return (
    <button type='button' {...props}>
      <FaRegPauseCircle />
    </button>
  );
};

export default PauseButton;
