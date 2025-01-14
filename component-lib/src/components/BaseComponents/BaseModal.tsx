import { Modal } from 'flowbite-react';

interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  size: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  show,
  onClose,
  size,
  header,
  footer,
  children,
}) => {
  return (
    <>
      <Modal
        show={show}
        size={size}
        onClose={onClose}
        className='modal-container'
      >
        <div className='modal'>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body className='modal-body'>{children}</Modal.Body>
          <Modal.Footer className='modal-footer'>{footer}</Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default BaseModal;
