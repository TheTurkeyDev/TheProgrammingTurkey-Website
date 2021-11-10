import { PageLoading } from '../pages/base/page-loading'
import { Modal } from './modal-base'

export const LoadingModal = ({ loading, children }) => (
    <Modal show={loading}>
        {children}
        <PageLoading />
    </Modal>
)