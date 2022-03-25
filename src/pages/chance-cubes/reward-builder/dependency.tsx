import { ConfirmationModal, Input } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';

type DependencyProps = {
    readonly type: string
    readonly value: string
    readonly color: string
    readonly changeValue: (val: string) => void
    readonly deleteDependency: () => void
}
export const Dependency = ({ type, value, color, changeValue, deleteDependency }: DependencyProps) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div
            className='m-2 container pb-3'
            style={{ border: `1px solid ${color}` }}
        >
            <div className='row ml-2 mr-2 mt-2'>
                <Input type='text' name='dep-input' label={type} value={value} onChange={e => changeValue(e.target.value)} />
                <div
                    className='ml-auto col-auto'
                    onClick={() => setShowModal(true)}
                >
                    <i className='clickable fas fa-trash' />
                </div>
            </div>
            {showModal && <ConfirmationModal
                show={showModal}
                text={'Are you sure you want to delete this dependency?'}
                yesText='Yes'
                onYesClick={() => {
                    setShowModal(false);
                    deleteDependency();
                }}
                noText='no'
                onNoClick={() => setShowModal(false)}
            />}
        </div>
    );
};
