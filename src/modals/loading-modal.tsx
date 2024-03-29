import { Loading, Modal, WithChildren } from 'gobble-lib-react';

type LoadingModalProps = WithChildren & {
    readonly loading: boolean
}
export const LoadingModal = ({ loading, children }: LoadingModalProps) => (
    <Modal show={loading}>
        <>{children}</>
        <Loading />
    </Modal>
);