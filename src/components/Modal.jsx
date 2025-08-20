const Modal = ({ children, ...props }) => {
  return (
    <div className='backdrop' {...props}>
      <div
        className='modal'
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
