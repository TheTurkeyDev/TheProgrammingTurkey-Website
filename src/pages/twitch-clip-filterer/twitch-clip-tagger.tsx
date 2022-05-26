import { useEffect, useState } from 'react';
import { BaseTheme, ContainedButton, Input, Label, LinkButton, TextToast, ToggleSwitch, useToast, useUrlParams } from 'gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';
import Multiselect from 'multiselect-react-dropdown';
import { useAuth } from '../../contexts/auth-context';
import * as clipAPI from '../../network/twitch-clips-network';
import { TwitchClipVideoPlayer } from './twitch-clip-tagger-video';
import { useWasChanged } from '../../hooks/use-was-changed';
import { TwitchClip } from '../../types/twitch-clip-filter/twitch-clip';
import { TwitchClipTag } from '../../types/twitch-clip-filter/twitch-clip-tag';
import { TwitchClipTagEditorModal } from './twitch-clip-tag-editor-modal';

const ContentWrapper = styled.div`
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const TopButtonsBar = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto 1fr;
    align-items: center;
    gap: 16px;
    height: 45px;
`;

const QuickActionsWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    gap: 16px;
    width: min-content;
    justify-self: center;
`;

const TagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

type TagProps = {
    readonly color?: string
}
const Tag = styled(ContainedButton) <TagProps>`
    background-color: ${({ color }) => color};
    color: ${({ theme }: ThemeProps<BaseTheme>) => theme.surface.on};
`;

const BottomInput = styled.div`
    justify-self: center;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 16px;
    width: fit-content;
`;

const MultiSelectWrapper = styled.div`
    max-width: 750px;
`;

export const TwitchClipTagger = () => {
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const { channel } = useUrlParams();
    const channelId = parseInt(channel);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clipIndex, setClipIndex] = useState(-1);
    const [clips, setClips] = useState<readonly TwitchClip[]>([]);
    const [clipTags, setClipTags] = useState<readonly number[]>([]);
    const [tags, setTags] = useState<readonly TwitchClipTag[]>([]);
    const [onlyUntaggedClips, setOnlyUntaggedClips] = useState(true);
    const [allowedTags, setAllowedTags] = useState<readonly TwitchClipTag[]>([]);
    const [disallowedTags, setDisallowedTags] = useState<readonly TwitchClipTag[]>([]);
    const [newTag, setNewTag] = useState('');

    const indexChanged = useWasChanged(clipIndex);

    useEffect(() => {
        if (authState && channel && channel !== '-1')
            loadTags();
    }, [authChecked, channel]);

    useEffect(() => {
        nextClip(true);
    }, [onlyUntaggedClips, allowedTags, disallowedTags]);

    useEffect(() => {
        if (indexChanged && clips.length > 0 && clipIndex > -1) {
            clipAPI.getClipTags(clips[clipIndex].id).then(json => {
                if (json.success)
                    setClipTags(json.data);
            });
        }
    }, [clips, clipIndex]);

    const nextClip = (clear = false) => {
        setLoading(true);
        clipAPI.getNextClip(channelId, onlyUntaggedClips, allowedTags.map(ft => ft.id), disallowedTags.map(ft => ft.id), clipIndex === -1 || clear ? '' : clips[clipIndex].id).then(json => {
            if (json.success && json.data) {
                if (clear)
                    setClipIndex(0);
                setClips(clear ? [json.data] : [...clips, json.data]);
                if (!clear)
                    setClipIndex(old => old + 1);
            }
            else {
                pushToast(<TextToast text='Failed to load clip!' />);
            }
            setLoading(false);
        });
    };

    const loadTags = () => {
        clipAPI.getTags(channelId).then(json => {
            if (json.success)
                setTags(json.data);
        });
    };

    const updateClipTag = (tagId: number) => {
        if (clipTags.includes(tagId)) {
            clipAPI.removeTagFromClip(clips[clipIndex].id, [tagId]).then(json => {
                if (json.success)
                    setClipTags(tags => tags.filter(t => t !== tagId));
            });
        }
        else {
            clipAPI.addTagsToClip(clips[clipIndex].id, [tagId]).then(json => {
                if (json.success)
                    setClipTags(tags => [...tags, tagId]);
            });
        }
    };

    const addNewTag = () => {
        if (newTag === '')
            return;

        clipAPI.addTag({
            id: -1,
            display: newTag,
            channel_id: channelId
        }).then(json => {
            if (json.success) {
                clipAPI.addTagsToClip(clips[clipIndex].id, [json.data.id]).then(() => {
                    loadTags();
                    setClipTags(old => [...old, json.data.id]);
                });
                setNewTag('');
            }
        });

    };

    const getStyle = (tagId: number) => {
        return clipTags.find(t => t === tagId) ? ({ borderColor: '#0c940c', borderWidth: '3px' }) : {};
    };

    const tagOptions = tags.map(tag => {
        return { name: tag.display, id: tag.id };
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <ContentWrapper>
            <TopButtonsBar>
                <LinkButton to='/twitchclipfilterer/clips'>Back</LinkButton>
                <ContainedButton onClick={() => setShowModal(true)}>
                    Manage Tags
                </ContainedButton>
                <ToggleSwitch label='Only Untagged' checked={onlyUntaggedClips} onClick={() => setOnlyUntaggedClips(old => !old)} />
                {
                    !onlyUntaggedClips &&
                    <>
                        <Label>With Tag:</Label>
                        <MultiSelectWrapper>
                            <Multiselect className='bg-secondary'
                                options={tagOptions} // Options to display in the dropdown
                                selectedValues={allowedTags} // Preselected value to persist in dropdown
                                onSelect={(list, item) => setAllowedTags(ftags => [...ftags, item])} // Function will trigger on select event
                                onRemove={(list, item) => setAllowedTags(ftags => [...ftags.filter(t => t.id !== item.id)])} // Function will trigger on remove event
                                displayValue='name' // Property name to display in the dropdown options
                                style={{ option: { backgroundColor: '#111111' } }}
                            />
                        </MultiSelectWrapper>
                        <Label>Without Tag:</Label>
                        <MultiSelectWrapper>
                            <Multiselect className='bg-secondary'
                                options={tagOptions} // Options to display in the dropdown
                                selectedValues={disallowedTags} // Preselected value to persist in dropdown
                                onSelect={(list, item) => setDisallowedTags(ftags => [...ftags, item])} // Function will trigger on select event
                                onRemove={(list, item) => setDisallowedTags(ftags => [...ftags.filter(t => t.id !== item.id)])} // Function will trigger on remove event
                                displayValue='name' // Property name to display in the dropdown options
                                style={{ option: { backgroundColor: '#111111' } }}
                            />
                        </MultiSelectWrapper>
                    </>
                }
            </TopButtonsBar>
            <TwitchClipVideoPlayer clips={clips} clipIndex={clipIndex} loading={loading} setClipIndex={setClipIndex} nextClip={nextClip} />
            <QuickActionsWrapper>
                <ContainedButton onClick={() => updateClipTag(1)} style={getStyle(1)}>Good</ContainedButton>
                <ContainedButton onClick={() => updateClipTag(2)} style={getStyle(2)}>Meh</ContainedButton>
                <ContainedButton onClick={() => updateClipTag(3)} style={getStyle(3)}>Bad</ContainedButton>
                <ContainedButton onClick={() => updateClipTag(4)} style={getStyle(4)}>Delete</ContainedButton>
            </QuickActionsWrapper>
            <TagsWrapper>
                {
                    tags.filter(tag => tag.id !== 1 && tag.id !== 2 && tag.id !== 3 && tag.id !== 4).sort((a, b) => a.id - b.id).map(tag => {
                        return (
                            <Tag key={tag.id} color={tag.color} onClick={() => updateClipTag(tag.id)} style={getStyle(tag.id)}>{tag.display}</Tag>
                        );
                    })
                }
            </TagsWrapper>
            <BottomInput>
                <Input label='New Tag' value={newTag} onChange={e => setNewTag(e.target.value)} />
                <ContainedButton onClick={addNewTag}> Add</ContainedButton>
            </BottomInput>
            {showModal && <TwitchClipTagEditorModal show={showModal} requestClose={() => setShowModal(false)} tags={tags} setTags={setTags} />}
        </ContentWrapper>
    );
};
