import { ContainedButton, Headline5 } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ChanceCubesAddDependencyModal } from '../../../modals/chance-cubes/chance-cubes-add-reward-dependency-modal';
import { isNotNullOrUndef } from '../../../util/type-helper';
import { ChanceCubesRewardDependency } from './chance-cubes-reward-dependency';
import { Dependency } from './dependency';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 8px;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
`;

type DependencyListProps = {
    readonly deps: ChanceCubesRewardDependency
    readonly changeValue: (type: string, val: string) => void
    readonly insertDependency: (type: string, val: string) => void
    readonly deleteDependency: (type: string) => void
}
export const DependencyList = ({ deps, changeValue, insertDependency, deleteDependency }: DependencyListProps) => {

    const [showModal, setShowModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Wrapper style={{ border: '1px solid black' }}>
            <Header>
                <Headline5>Dependencies</Headline5>
                <i className={`clickable fas ${collapsed ? 'fa-chevron-left' : 'fa-chevron-down'}`} onClick={() => setCollapsed(old => !old)} />
            </Header>
            {
                !collapsed &&
                <>
                    {
                        isNotNullOrUndef(deps.mod) &&
                        <Dependency
                            type='Mod'
                            value={deps.mod!}
                            color={'#c1fda1'}
                            changeValue={value => changeValue('mod', value)}
                            deleteDependency={() => deleteDependency('mod')}
                        />
                    }
                    {
                        isNotNullOrUndef(deps.mcVersion) &&
                        <Dependency
                            type='Minecraft Version'
                            value={deps.mcVersion!}
                            color={'#af2ea2'}
                            changeValue={value => changeValue('mcVersion', value)}
                            deleteDependency={() => deleteDependency('mcVersion')}
                        />
                    }
                    <ContainedButton onClick={() => setShowModal(true)}>
                        Add Dependency
                    </ContainedButton>
                </>
            }
            <ChanceCubesAddDependencyModal
                show={showModal}
                requestClose={() => setShowModal(false)}
                deps={deps}
                add={type => insertDependency(type, '')}
            />
        </Wrapper>
    );
};
