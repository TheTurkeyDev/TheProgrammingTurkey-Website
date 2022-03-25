import { Modal } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../components/inputs/color-input';
import * as clipAPI from '../../network/twitch-clips-network';
import { TwitchClipTag } from '../../types/twitch-clip-filter/twitch-clip-tag';

const ContentWrapper = styled.div`
    overflow-y: hidden;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
`;

const TagsList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    justify-items: left;
    margin-inline: auto;
    padding: 0 250px;
    overflow-y: auto;
`;
type TwitchClipTagEditorModal = {
    readonly tags: readonly TwitchClipTag[]
    readonly setTags: (tags: readonly TwitchClipTag[]) => void
    readonly show: boolean
    readonly requestClose: () => void
}
export const TwitchClipTagEditorModal = ({ show, requestClose, tags, setTags }: TwitchClipTagEditorModal) => {

    const [tagsCopy, setTagsCopy] = useState(tags);

    useEffect(() => {
        setTags(tagsCopy);
    }, [tagsCopy]);

    const editTag = (tag: TwitchClipTag) => {
        clipAPI.editTag(tag).then(json => {
            if (json.success) {
                setTagsCopy(old => [
                    ...old.filter(t => t.id !== tag.id),
                    tag
                ]);
            }
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <h2>Twitch Clip Tags</h2>
                <TagsList>
                    {[...tagsCopy].sort((a, b) => a.id - b.id).map(tag => (
                        <ColorPicker key={tag.id} name='bg_color' label={tag.display} color={tag.color?.substr(1) ?? ''} onClose={color => editTag({ ...tag, color: `#${color}` })} />
                    ))}
                </TagsList>
            </ContentWrapper>
        </Modal>
    );
};
