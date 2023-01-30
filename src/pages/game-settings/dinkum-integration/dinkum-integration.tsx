import { ButtonRow, ContainedButton, Headline2, Headline5, HorizontalRule, Input, OutlinedButton, SpaceBetween } from 'gobble-lib-react';
import styled, { keyframes } from 'styled-components';
import { Icon } from '../../../components/icon';
import { LoadingIcon } from '../../../components/loading-icon';
import { useAuth } from '../../../contexts/auth-context';
import { useFetch } from '../../../hooks/use-fetch';
import { useQuery } from '../../../hooks/use-query';
import { getPostAuthParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { DinkumIntegrationItemAdjustment } from './dinkum-integration-item-adjustment';
import { DinkumIntegrationSettings } from './dinkum-integration-setting';

const Wrapper = styled.div`
    max-width: 1000px;
    display: grid;
    margin-inline: auto;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const ItemsWrapper = styled.div`
    width: 100%;
    display: grid;
    margin-inline: auto;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
    align-items: center;
`;

export const DinkumIntegration = () => {

    const { userID } = useAuth();
    const { fetching, data: settings, error, setData, resetData } = useFetch<readonly DinkumIntegrationSettings[]>(
        `/gamesettings/dinkum/${userID}/integration`,
        {
            skip: !userID
        }
    );
    const { query, querying } = useQuery(`${getDevAPIBase()}/gamesettings/dinkum/${userID}/integration`, {
        requestData: getPostAuthParams()
    });

    const update = (index: number, setting: DinkumIntegrationSettings) => {
        setData(old => [...(old ?? []).slice(0, index), setting, ...(old ?? []).slice(index + 1)]);
    };

    const remove = (index: number) => {
        setData(old => [...(old ?? []).slice(0, index), ...(old ?? []).slice(index + 1)]);
    };


    const save = () => {
        query(JSON.stringify(settings));
    };

    const nums = (settings ?? []).map(s => s.itemId);

    const getValidNumber = (num: number) => {
        while (nums.includes(num))
            num++;
        return num;
    };

    return (
        <Wrapper>
            <Headline2>Dinkum Integration Settings</Headline2>
            <HorizontalRule />
            <SpaceBetween>
                <Headline5>Item Adjustments</Headline5>
                <Icon name='fas fa-plus' onClick={() => setData(old => [...(old ?? []), { itemId: getValidNumber(0), value: 0, description: '' }])} />
            </SpaceBetween>
            {
                fetching && <LoadingIcon />
            }
            {
                settings &&
                <ItemsWrapper>
                    {
                        settings.map((setting, i) => <DinkumIntegrationItemAdjustment setting={setting} update={setting => update(i, setting)} remove={() => remove(i)} nums={nums} />)
                    }
                </ItemsWrapper>
            }
            <ButtonRow>
                <OutlinedButton onClick={() => resetData()}>Cancel</OutlinedButton>
                <ContainedButton onClick={() => save()} loading={querying} >Save</ContainedButton>
            </ButtonRow>
        </Wrapper>
    );
};