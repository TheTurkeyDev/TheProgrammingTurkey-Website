import { ContainedButton, Modal } from '@theturkeydev/gobble-lib-react';
import { ChanceCubesRewardDependency } from '../../pages/chance-cubes/reward-builder/chance-cubes-reward-dependency';

type ChanceCubesAddDependencyModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly deps: ChanceCubesRewardDependency
    readonly add: (id: string) => void
}
export const ChanceCubesAddDependencyModal = ({ show, requestClose, deps, add }: ChanceCubesAddDependencyModalProps) => {

    const onPick = (id: string) => {
        add(id);
        requestClose();
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <div className='row'>
                <h2 className='col-auto mx-auto' style={{ textDecoration: 'underline' }}>
                    Add Dependency
                </h2>
            </div>
            <>
                {
                    !deps.mod && (
                        <ContainedButton onClick={() => onPick('mod')}>
                            Mod
                        </ContainedButton>
                    )
                }
            </>
            <>
                {
                    !deps.mcVersion && (
                        <ContainedButton onClick={() => onPick('mcVersion')}>
                            Minecraft Version
                        </ContainedButton>
                    )
                }
            </>
        </Modal>
    );
};
