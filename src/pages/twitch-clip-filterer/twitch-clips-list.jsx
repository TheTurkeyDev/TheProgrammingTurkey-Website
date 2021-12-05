import { useEffect, useState, useContext, Fragment } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';
import { TextToast } from '../../toasts/text-toast';
import styled from 'styled-components';
import { Select } from '../../components/inputs/select';
import { Button, ButtonLink, ExtLink, Label } from '../../styles/common-styles';
import { OverlayContext } from '../../contexts/overlay-context';
import { TwitchClipTagEditorOverlay } from './twitch-clip-tag-editor-overlay';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin: 16px;
`;

const ChannelsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`

const TopInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    gap: 16px;
`

const ListWrapper = styled.div`
    display: grid;
    grid-template-columns: 20px 100px 150px 400px 300px 1fr;
    gap: 16px;
    margin-left: 16px;
`;

const SplitLine = styled.div`
    grid-column: 1 / span 6;
    border-top: 1px solid #d1d1d1;
`;

const CheckBoxWrapper = styled.input`
    justify-self: center;
    align-self: center;
`;

const BasicBorderWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr;
    gap: 16px;
    align-items: center;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    padding: 16px 8px;
`;

const MultiSelectWrapper = styled.div`
    max-width: 750px;
`;

const ClipTitle = styled.div`
    overflow-x: hidden;
`;

const DeleteTagButton = styled.div`
    position: absolute;
    top: 2px;
    right: 2px;
    line-height: 15px;
    height: 20px;
    width: 20px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    text-align: center;
`;

const ClipTags = styled.div`
    display: flex;
    gap: 8px;
`;

const TagWrapper = styled.div`
    position: relative;
    width: min-content;
    height: min-content;
    padding-right: 1.78rem;
    padding-left: 4px;
    border: 1px solid #00ff00;
    border-radius: 7px;
    word-wrap: unset;
`;

export const TwitchClipsList = () => {
    const toast = useContext(ToastContext);
    const overlay = useContext(OverlayContext);

    const [selectedChannel, setSlectedChannel] = useState(-1);
    const [channels, setChannels] = useState([63937599]);
    const [clips, setClips] = useState([]);
    const [selectedClips, setSelectedClips] = useState([]);
    const [page, setPage] = useState(0);
    const [tags, setTags] = useState([]);
    const [allowedTags, setAllowedTags] = useState([]);
    const [disallowedTags, setDisallowedTags] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (selectedChannel !== -1) {
            clipAPI.getTags(selectedChannel).then((json) => {
                if (json.success)
                    setTags(json.data);
            });
        }
        clipAPI.getManagingChannels().then(json => {
            if (json.success)
                setChannels(json.data);
        })
    }, []);

    useEffect(() => {
        setClips([]);
        setPage(0);
        setUpdate(true);
        if (selectedChannel !== -1) {
            clipAPI.getTags(selectedChannel).then((json) => {
                if (json.success)
                    setTags(json.data);
            });
        }
    }, [allowedTags, disallowedTags, selectedChannel]);

    useEffect(() => {
        if (!update || selectedChannel == -1)
            return;

        clipAPI.getClips(selectedChannel, page, 25, allowedTags.map(ft => ft.id), disallowedTags.map(ft => ft.id)).then((json) => {
            if (json.success)
                setClips(clips => [...clips, ...json.data]);
        });
        setUpdate(false);
    }, [page, allowedTags, disallowedTags, update, selectedChannel]);

    const pullClips = () => {
        clipAPI.pullTwitchClips(selectedChannel).then((json) => {
            toast.pushToast(<TextToast text={json.message} />);
        });
    }

    const loadMoreClips = () => {
        setPage(page => page + 1);
        setUpdate(true);
    }

    const removeTag = (clipId, tag) => {
        clipAPI.removeTagFromClip(clipId, [tag]).then((json) => {
            if (json.success) {
                setClips(clips => [...clips.map(clip => {
                    if (clip.id === clipId) {
                        return {
                            ...clip,
                            tags: [...clip.tags.filter(t => t !== tag)]
                        }
                    }
                    else {
                        return clip;
                    }
                })])
            }
        });
    }

    const tagOptions = tags.map(tag => {
        return { name: tag.display, id: tag.id }
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <PageWrapper>
            <ChannelsWrapper>
                <Select label='Channel:' value={selectedChannel} onChange={e => setSlectedChannel(parseInt(e.target.value))}>
                    <option value={-1}>Choose A Stream</option>
                    {
                        channels.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                </Select>
            </ChannelsWrapper>
            <TopInputsWrapper >
                <ButtonLink disabled={selectedChannel === -1} to={`/twitchclipfilterer/tagger?channel=${selectedChannel}`}>
                    Tag Clips
                </ButtonLink>
                <Button disabled={selectedChannel === -1} onClick={pullClips}>
                    Pull Clips
                </Button>
                <Button disabled={selectedChannel === -1} onClick={() => { navigator.clipboard.writeText(selectedClips.join('\n')); toast.pushToast(<TextToast text='Copied to Clipboard!' />); }}>
                    Copy Selected Links
                </Button>
                <Button disabled={selectedChannel === -1} onClick={() => overlay.pushCurrentOverlay(<TwitchClipTagEditorOverlay tags={tags} setTags={setTags} />)}>
                    Manage Tags
                </Button>
            </TopInputsWrapper>
            <BasicBorderWrapper>
                <span>Filters</span>
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
            </BasicBorderWrapper>
            <ListWrapper>
                <div />
                <h5>Date</h5>
                <h5>Channel</h5>
                <h5>Title</h5>
                <h5>Clipper</h5>
                <h5>Tags</h5>
                <SplitLine />
                {
                    clips.map(clip => {
                        return (
                            <Fragment key={clip.id}>
                                <CheckBoxWrapper type='checkbox' onChange={e => e.target.checked ? setSelectedClips(clips => [...clips, clip.url]) : setSelectedClips(clips => clips.filter(u => u !== clip.url))} />
                                <span>
                                    {clip.date}
                                </span>
                                <ExtLink href={`https://twitch.tv/${clip.channel_name}`}>
                                    {clip.channel_name}
                                </ExtLink>
                                <ClipTitle>
                                    <ExtLink href={clip.url}>
                                        {clip.title}
                                    </ExtLink>
                                </ClipTitle>
                                <span>
                                    {clip.clipper_name}
                                </span>
                                <ClipTags>
                                    {
                                        clip.tags.map(tagId => {
                                            const tag = tags.find(t => t.id === tagId);
                                            if (!tag)
                                                return <></>;
                                            return (
                                                <TagWrapper key={tagId}>
                                                    <span>
                                                        {tag.display}
                                                    </span>
                                                    <DeleteTagButton className='bg-secondary clickable' onClick={() => removeTag(clip.id, tagId)}>
                                                        x
                                                    </DeleteTagButton>
                                                </TagWrapper>
                                            )
                                        })
                                    }
                                </ClipTags>
                                <SplitLine />
                            </Fragment>
                        )
                    })
                }
            </ListWrapper>
            <Button disabled={selectedChannel === -1} onClick={loadMoreClips}>
                Load More
            </Button>
        </PageWrapper >
    );
}