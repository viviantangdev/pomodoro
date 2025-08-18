import { IoSettings } from 'react-icons/io5';

const SettingsButton = (props) => {
  return (
    <button type='button' {...props}>
      <IoSettings />
    </button>
  );
};

export default SettingsButton;
