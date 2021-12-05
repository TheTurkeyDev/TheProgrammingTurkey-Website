import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorPickerPopover } from '../../components/inputs/color-picker-popover';
import * as clipAPI from '../../network/twitch-clips-network';

const TagsList = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 16px;
`;

const TagDisplay = styled.span`
    justify-self: left;
    margin-left: 16px;
`;

const SplitLine = styled.div`
    grid-column: 1 / span 2;
    border-top: 1px solid #d1d1d1;
`;

export const TwitchClipTagEditorOverlay = ({ tags, setTags }) => {

    const [tagsCopy, setTagsCopy] = useState(tags);

    useEffect(() => {
        setTags(tagsCopy);
    }, [tagsCopy]);

    const editTag = (tag) => {
        clipAPI.editTag(tag).then(json => {
            if (json.success) {
                setTagsCopy(old => [
                    ...old.filter(t => t.id !== tag.id),
                    tag
                ])
            }
        })
    };

    return (
        <div>
            <h2>Twitch Clip Tags</h2>
            <TagsList>
                {tagsCopy.sort((a, b) => a.id - b.id).map(tag => {
                    return (
                        <Fragment key={tag.id}>
                            <TagDisplay>{tag.display}</TagDisplay>
                            <ColorPickerPopover id='bg_color' name='bg_color' color={tag.color.substr(1)} onClose={color => editTag({ ...tag, color: `#${color}` })} />
                            <SplitLine />
                        </Fragment>
                    );
                })}
            </TagsList>
        </div>
    );
}
