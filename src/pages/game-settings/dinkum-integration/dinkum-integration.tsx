import { ButtonRow, ContainedButton, Headline2, Headline5, HorizontalRule, Icon, Loading, OutlinedButton, SpaceBetween, useFetch, useQuery } from 'gobble-lib-react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { getParams, postParams } from '../../../network/auth-network';
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

    const { userId: userID } = useAuth();
    const [settings, fetching, { setData, resetData }] = useFetch<readonly DinkumIntegrationSettings[]>(`${getDevAPIBase()}/gamesettings/dinkum/${userID}/integration`, {
        skip: !userID,
        requestData: getParams
    });
    const [query, querying] = useQuery(`${getDevAPIBase()}/gamesettings/dinkum/${userID}/integration`, {
        requestData: postParams
    });

    const update = (index: number, setting: DinkumIntegrationSettings) => {
        setData([...(settings ?? []).slice(0, index), setting, ...(settings ?? []).slice(index + 1)]);
    };

    const remove = (index: number) => {
        setData([...(settings ?? []).slice(0, index), ...(settings ?? []).slice(index + 1)]);
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
                <Icon className='fas fa-plus' onClick={() => setData([
                    ...(settings ?? []),
                    { itemId: getValidNumber(0), value: 0, description: '' }
                ])} />
            </SpaceBetween>
            {
                fetching && <Loading />
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
                <OutlinedButton onClick={resetData}>Cancel</OutlinedButton>
                <ContainedButton onClick={save} loading={querying} >Save</ContainedButton>
            </ButtonRow>
        </Wrapper>
    );
};