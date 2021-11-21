import { Fragment, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../../../contexts/overlay-context';
import * as API from '../../../../network/stream-animations-network';
import { ButtonSecondary } from '../../../../styles/common-styles';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: center;
`;

const SettingsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 8px;
`;

const Label = styled.span`
    justify-self: right;
`

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const getInputForSetting = (def, userData, value, onChange) => {
    switch (def.type) {
        case 'integer':
            return <input type='number' value={value} onChange={e => onChange(clamp(e.target.value, 0, 1000))} min={0} max={1000} />;
        case 'string':
            return <input type='text' value={value} onChange={e => onChange(e.target.value)} />;
    }
}

export const StreamAnimationSettingsOverlay = ({ animation, userData, channelPointRewards, save }) => {
    const overlayContext = useContext(OverlayContext);
    const [settingsDefs, setSettingsDefs] = useState([]);
    const [values, setValues] = useState({});

    useEffect(() => {
        API.getSettingDef(animation.id).then(settings => {
            const vals = {};
            settings.map(def => vals[def.id] = userData[def.id]?.value ?? def.default_val);
            setValues(vals);
            setSettingsDefs(settings);
        })
    }, []);

    const updateValue = (id, val) => {
        setValues(old => {
            const updated = { ...old }
            updated[id] = val;
            return updated;
        })
    }

    return (
        <ContentWrapper>
            <h2>{animation.display}</h2>
            <SettingsWrapper>
                <Label>Channel Point</Label>
                <select value={values['channel_point']} onChange={e => updateValue('channel_point', e.target.value)}>
                    <option value=''>N/A</option>
                    {
                        channelPointRewards.map(reward => (
                            <option key={reward.id} value={reward.id}>
                                {reward.title}
                            </option>
                        ))
                    }
                </select>
                {
                    settingsDefs.filter(def => def.id !== 'channel_point').map(def => {
                        return (
                            <Fragment key={def.id}>
                                <Label>{def.display}</Label>
                                {getInputForSetting(def, userData[def.id], values[def.id], val => updateValue(def.id, val))}
                            </Fragment>
                        )
                    })
                }
            </SettingsWrapper>
            <ButtonSecondary onClick={() => { save(values); overlayContext.popCurrentOverlay(); }}>Save</ButtonSecondary>
        </ContentWrapper>
    );
}
