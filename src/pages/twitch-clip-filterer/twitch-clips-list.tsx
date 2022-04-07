import { useEffect, useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import * as clipAPI from '../../network/twitch-clips-network';
import styled from 'styled-components';
import { TwitchClipTagEditorModal } from './twitch-clip-tag-editor-modal';
import { Anchor, ContainedButton, InputsWrapper, Label, Option, OutlinedButton, Select, Table, TD, TextToast, TH, useToast } from '@theturkeydev/gobble-lib-react';
import { TwitchClipTag } from '../../types/twitch-clip-filter/twitch-clip-tag';
import { ManagingChannel } from '../../types/twitch-clip-filter/managing-channel';
import { TwitchClip } from '../../types/twitch-clip-filter/twitch-clip';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin: 16px;
`;

const ChannelsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
`;

const TopInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr;
    gap: 16px;
`;

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
    const { pushToast } = useToast();

    const navigate = useNavigate();

    const [selectedChannel, setSlectedChannel] = useState(-1);
    const [channels, setChannels] = useState<readonly ManagingChannel[]>([]);
    const [clips, setClips] = useState<readonly TwitchClip[]>([]);
    const [selectedClips, setSelectedClips] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [tags, setTags] = useState<readonly TwitchClipTag[]>([]);
    const [allowedTags, setAllowedTags] = useState<readonly TwitchClipTag[]>([]);
    const [disallowedTags, setDisallowedTags] = useState<readonly TwitchClipTag[]>([]);
    const [update, setUpdate] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (selectedChannel !== -1) {
            clipAPI.getTags(selectedChannel).then(json => {
                if (json.success)
                    setTags(json.data);
            });
        }
        clipAPI.getManagingChannels().then(json => {
            if (json.success)
                setChannels(json.data);
        });
    }, []);

    useEffect(() => {
        setClips([]);
        setPage(0);
        setUpdate(true);
        if (selectedChannel !== -1) {
            clipAPI.getTags(selectedChannel).then(json => {
                if (json.success)
                    setTags(json.data);
            });
        }
    }, [allowedTags, disallowedTags, selectedChannel]);

    useEffect(() => {
        if (!update || selectedChannel === -1)
            return;

        clipAPI.getClips(selectedChannel, page, 25, allowedTags.map(ft => ft.id), disallowedTags.map(ft => ft.id)).then(json => {
            if (json.success)
                setClips(clips => [...clips, ...json.data]);
        });
        setUpdate(false);
    }, [page, allowedTags, disallowedTags, update, selectedChannel]);

    const pullClips = () => {
        clipAPI.pullTwitchClips(selectedChannel).then(json => {
            pushToast(<TextToast text={json.message} />);
        });
    };

    const loadMoreClips = () => {
        setPage(page => page + 1);
        setUpdate(true);
    };

    const removeTag = (clipId: string, tag: number) => {
        clipAPI.removeTagFromClip(clipId, [tag]).then(json => {
            if (json.success) {
                setClips(clips => [...clips.map(clip => {
                    if (clip.id === clipId) {
                        return {
                            ...clip,
                            tags: [...clip.tags.filter(t => t !== tag)]
                        };
                    }
                    else {
                        return clip;
                    }
                })]);
            }
        });
    };

    const tagOptions = tags.map(tag => {
        return { name: tag.display, id: tag.id };
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <PageWrapper>
            <InputsWrapper>
                <Select label='Channel:' value={selectedChannel} onChange={e => setSlectedChannel(parseInt(e.target.value))}>
                    <Option value={-1}>Choose A Stream</Option>
                    {
                        channels.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                    }
                </Select>
            </InputsWrapper>
            <TopInputsWrapper >
                <OutlinedButton disabled={selectedChannel === -1} onClick={() => navigate(`/twitchclipfilterer/tagger?channel=${selectedChannel}`)}>
                    Tag Clips
                </OutlinedButton>
                <ContainedButton disabled={selectedChannel === -1} onClick={pullClips}>
                    Pull Clips
                </ContainedButton>
                <OutlinedButton disabled={selectedChannel === -1} onClick={() => setSelectedClips(clips.map(c => c.url))}>
                    Select All
                </OutlinedButton>
                <OutlinedButton disabled={selectedChannel === -1} onClick={() => setSelectedClips([])}>
                    Unselect All
                </OutlinedButton>
                <OutlinedButton disabled={selectedChannel === -1} onClick={() => { navigator.clipboard.writeText(selectedClips.join('\n')); pushToast(<TextToast text='Copied to Clipboard!' />); }}>
                    Copy Selected Links
                </OutlinedButton>
                <OutlinedButton disabled={selectedChannel === -1} onClick={() => setShowModal(true)}>
                    Manage Tags
                </OutlinedButton>
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
            <Table>
                <thead>
                    <tr>
                        <TH></TH>
                        <TH>Date</TH>
                        <TH>Channel</TH>
                        <TH>Title</TH>
                        <TH>Clipper</TH>
                        <TH>Tags</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        clips.map(clip => {
                            return (
                                <tr key={clip.id}>
                                    <TD>
                                        <CheckBoxWrapper type='checkbox' checked={selectedClips.includes(clip.url)} onChange={e => e.target.checked ? setSelectedClips(clips => [...clips, clip.url]) : setSelectedClips(clips => clips.filter(u => u !== clip.url))} />
                                    </TD>
                                    <TD>
                                        {clip.date}
                                    </TD>
                                    <TD>
                                        <Anchor href={`https://twitch.tv/${clip.channel_name}`} openInNewTab={true}>
                                            {clip.channel_name}
                                        </Anchor>
                                    </TD>
                                    <TD>
                                        <ClipTitle>
                                            <Anchor href={clip.url} openInNewTab={true}>
                                                {clip.title}
                                            </Anchor>
                                        </ClipTitle>
                                    </TD>
                                    <TD>
                                        {clip.clipper_name}
                                    </TD>
                                    <TD>
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
                                                    );
                                                })
                                            }
                                        </ClipTags>
                                    </TD>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <ContainedButton disabled={selectedChannel === -1} onClick={loadMoreClips}>
                Load More
            </ContainedButton>
            {showModal && <TwitchClipTagEditorModal show={showModal} requestClose={() => setShowModal(false)} tags={tags} setTags={setTags} />}
        </PageWrapper >
    );
};