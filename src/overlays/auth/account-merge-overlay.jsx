import { useOverlay } from '../../contexts/overlay-context';

import * as authAPI from '../../network/auth-network';

export const AccountMergeOverlay = (props) => {
    const { popCurrentOverlay } = useOverlay();

    const mergeAccount = () => {
        authAPI.confirmMerge(props.platform).then(resp => {
            if (resp.success)
                location.href = props.redir;
        });
    }

    return (
        <div className='mr-5 ml-5 mt-2'>
            <div className='mt-3 fluid-container'>
                <div className='row mb-3    '>
                    <h2 className='col' style={{ textDecoration: 'underline' }}>
                        Account Merge
                    </h2>
                </div>
                <div className='row'>
                    <div className='col'>
                        <p className='m-0'>
                            {props.platform} user {props.username} is currently linked to another account!
                        </p>
                        <p className='m-0'>
                            Would you like to merge the accounts? Stored data related to this account and/or platform on the existing account may be lost!
                        </p>
                    </div>
                </div>
                <div className='row mt-3'>
                    <button className='col-auto ml-auto mr-2' onClick={mergeAccount}>
                        <span style={{ 'fontSize': '24px' }}>
                            Confirm
                        </span>
                    </button>
                    <button className='col-auto mr-auto ml-2' onClick={() => { popCurrentOverlay(); location.href = props.redir; }}>
                        <span style={{ 'fontSize': '24px' }}>
                            Cancel
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
