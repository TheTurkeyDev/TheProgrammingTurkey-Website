import { Body1, ContainedButton, Headline3, Modal, OutlinedButton } from '@theturkeydev/gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import * as authAPI from '../network/auth-network';

type AccountMergeModalProps = {
    readonly platform: string
    readonly username: string
    readonly redir: string
    readonly show: boolean
    readonly requestClose: () => void
}
export const AccountMergeModal = ({ platform, username, redir, show, requestClose }: AccountMergeModalProps) => {
    const navigate = useNavigate();
    const mergeAccount = () => {
        authAPI.confirmMerge(platform).then(resp => {
            if (resp.success)
                navigate(redir);
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <div className='mr-5 ml-5 mt-2'>
                <div className='mt-3 fluid-container'>
                    <div className='row mb-3    '>
                        <Headline3 className='col' style={{ textDecoration: 'underline' }}>
                            Account Merge
                        </Headline3>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Body1>
                                {platform} user {username} is currently linked to another account!
                            </Body1>
                            <Body1>
                                Would you like to merge the accounts? Stored data related to this account and/or platform on the existing account may be lost!
                            </Body1>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <ContainedButton onClick={mergeAccount}>
                            Confirm
                        </ContainedButton>
                        <OutlinedButton onClick={() => { requestClose(); navigate(redir); }}>
                            Cancel
                        </OutlinedButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
