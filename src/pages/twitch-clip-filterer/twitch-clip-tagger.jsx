import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';

import { TextToast } from '../../toasts/text-toast';
import { Button, ButtonLink, Label } from '../../styles/common-styles';
import { useURLParams } from '../../hooks/use-url-params';
import styled from 'styled-components';
import { Checkbox } from '../../components/inputs/checkbox';
import Multiselect from 'multiselect-react-dropdown';
import { TwitchClipVideoPlayer } from './twitch-clip-tagger-video';
import { TwitchClipTagEditorOverlay } from './twitch-clip-tag-editor-overlay';
import { OverlayContext } from '../../contexts/overlay-context';

const ContentWrapper = styled.div`
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const TopButtonsBar = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto 1fr;
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
`

const TagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const Tag = styled(Button)`
    background-color: ${({ color }) => color};
`;

const BottomInput = styled.div`
    justify-self: center;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 16px;
    width: fit-content;
`

const MultiSelectWrapper = styled.div`
    max-width: 750px;
`;

export const TwitchClipTagger = () => {

    const overlay = useContext(OverlayContext);
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const { channel } = useURLParams();

    const [loading, setLoading] = useState(true);
    const [clipIndex, setClipIndex] = useState(-1);
    const [clips, setClips] = useState([]);
    const [clipTags, setClipTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [onlyUntaggedClips, setOnlyUntaggedClips] = useState(true);
    const [allowedTags, setAllowedTags] = useState([]);
    const [disallowedTags, setDisallowedTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (auth.authState && channel && channel != -1)
            loadTags();
    }, [auth.authChecked, channel]);

    useEffect(() => {
        nextClip(true);
    }, [onlyUntaggedClips, allowedTags, disallowedTags]);

    useEffect(() => {
        if (clips.length > 0 && clipIndex > -1) {
            clipAPI.getClipTags(clips[clipIndex].id).then(json => {
                if (json.success)
                    setClipTags(json.data);
            });
        }
    }, [clips, clipIndex]);

    const nextClip = (clear = false) => {
        setLoading(true);
        clipAPI.getNextClip(channel, onlyUntaggedClips, allowedTags.map(ft => ft.id), disallowedTags.map(ft => ft.id), clipIndex == -1 || clear ? '' : clips[clipIndex].id).then(json => {
            if (json.success && json.data) {
                if (clear)
                    setClipIndex(0);
                setClips(clear ? [json.data] : [...clips, json.data]);
                if (!clear)
                    setClipIndex(old => old + 1);
            }
            else {
                toast.pushToast(<TextToast text='Failed to load clip!' />);
            }
            setLoading(false);
        });
    }

    const loadTags = () => {
        clipAPI.getTags(channel).then(json => {
            if (json.success)
                setTags(json.data);
        });
    }

    const updateClipTag = (tagId) => {
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
    }

    const addNewTag = () => {
        if (newTag === '')
            return;

        clipAPI.addTag({
            display: newTag,
            channel_id: channel
        }).then(json => {
            if (json.success) {
                clipAPI.addTagsToClip(clips[clipIndex].id, [json.data.id]).then(() => {
                    loadTags();
                    setClipTags(old => [...old, json.data.id]);
                });
                setNewTag('');
            }
        })

    }

    const getStyle = (tagId) => {
        return clipTags.find(t => t === tagId) ? ({ borderColor: '#0c940c', borderWidth: '3px' }) : {}
    }

    const tagOptions = tags.map(tag => {
        return { name: tag.display, id: tag.id }
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <ContentWrapper>
            <TopButtonsBar>
                <ButtonLink to='/twitchclipfilterer/clips'>Back</ButtonLink>
                <Button onClick={() => overlay.pushCurrentOverlay(<TwitchClipTagEditorOverlay tags={tags} setTags={setTags} />)}>
                    Manage Tags
                </Button>
                <Checkbox label='Only Untagged' checked={onlyUntaggedClips} onChange={e => setOnlyUntaggedClips(e.target.checked)} />
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
                <Button onClick={() => updateClipTag(1)} style={getStyle(1)}>Good</Button>
                <Button onClick={() => updateClipTag(2)} style={getStyle(2)}>Meh</Button>
                <Button onClick={() => updateClipTag(3)} style={getStyle(3)}>Bad</Button>
                <Button onClick={() => updateClipTag(4)} style={getStyle(4)}>Delete</Button>
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
                <label>New Tag</label>
                <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                <Button onClick={addNewTag}> Add</Button>
            </BottomInput>
        </ContentWrapper>
    );
}