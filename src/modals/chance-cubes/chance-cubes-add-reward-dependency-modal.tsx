import { ContainedButton, Headline4, Modal } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { ChanceCubesRewardDependency } from '../../pages/chance-cubes/reward-builder/chance-cubes-reward-dependency';

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: center;
`;

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
            <Content>
                <Headline4 style={{ textDecoration: 'underline' }}>
                    Add Dependency
                </Headline4>
                {
                    !deps.mod && (
                        <ContainedButton onClick={() => onPick('mod')}>
                            Mod
                        </ContainedButton>
                    )
                }
                {
                    !deps.mcVersion && (
                        <ContainedButton onClick={() => onPick('mcVersion')}>
                            Minecraft Version
                        </ContainedButton>
                    )
                }
            </Content>
        </Modal>
    );
};
