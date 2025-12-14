import Modal from '../common/Modal';
import SweetForm from './SweetForm';

export default function SweetModal({
  isOpen,
  onClose,
  sweet,
  onSubmit,
  loading,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sweet ? 'Edit Sweet' : 'Add New Sweet'}
      size="md"
    >
      <SweetForm
        sweet={sweet}
        onSubmit={onSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </Modal>
  );
}