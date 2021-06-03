import { useEffect, useState, useContext } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';

import { TextToast } from '../../toasts/text-toast';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
`;

const ListOverlay = styled.div`
   position: absolute;
   z-index: 1;
   top: 55px;
   right: 16px;
   background: #111111;
   border-radius: 5px;
   width: 400px;
   height: 200px;
   overflow-y: auto;
   overflow-x: hidden;
   padding-left: 8px;
`;

const TopInputsWrapper = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 1fr;
    gap: 16px;
    margin: 8px 0 0 16px;
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
`

const CheckBoxWrapper = styled.input`
    justify-self: center;
    align-self: center;
`

const BasicBorderWrapper = styled.div`
    border: 1px solid #d1d1d1;
    border-radius: 5px;
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

    const [channel, setChannel] = useState(63937599);
    const [clips, setClips] = useState([]);
    const [selectedClips, setSelectedClips] = useState([]);
    const [page, setPage] = useState(0);
    const [tags, setTags] = useState([]);
    const [allowedTags, setAllowedTags] = useState([]);
    const [disallowedTags, setDisallowedTags] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        clipAPI.getTags().then((json) => {
            if (json.success)
                setTags(json.data);
        });
    }, []);

    useEffect(() => {
        setClips([]);
        setPage(0);
        setUpdate(true);
    }, [allowedTags, disallowedTags]);

    useEffect(() => {
        if (!update) {
            return;
        }
        clipAPI.getClips(channel, page, 25, allowedTags.map(ft => ft.id), disallowedTags.map(ft => ft.id)).then((json) => {
            if (json.success)
                setClips(clips => [...clips, ...json.data]);
        });
        setUpdate(false);
    }, [page, allowedTags, disallowedTags, update]);

    const pullClips = () => {
        clipAPI.pullTwitchClips(channel).then((json) => {
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

    const onAllowedSelect = (list, item) => {
        setAllowedTags(ftags => [...ftags, item]);
    }
    const onDisallowedSelect = (list, item) => {
        setDisallowedTags(ftags => [...ftags, item]);
    }

    const onAllowedRemove = (list, item) => {
        setAllowedTags(ftags => [...ftags.filter(t => t.id !== item.id)]);
    }
    const onDisallowedRemove = (list, item) => {
        setDisallowedTags(ftags => [...ftags.filter(t => t.id !== item.id)]);
    }

    const tagOptions = tags.map(tag => {
        return { name: tag, id: tag }
    }).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <PageWrapper>
            <ListOverlay>
                {
                    selectedClips.map(url => <div key={url}>{url}</div>)
                }
            </ListOverlay>
            <TopInputsWrapper >
                <Link to='/twitchclipfilterer/tagger'>
                    Tag Clips
                </Link>
                <button onClick={pullClips}>
                    Pull Clips
                </button>
                <div>
                    <label>Channel:</label>
                    <input type='text' value={channel} onChange={(e) => setChannel(e.target.value)} />
                </div>
            </TopInputsWrapper>
            <BasicBorderWrapper className='row mx-0 my-2 pt-3 pb-2'>
                <div className='col-auto'>
                    <span>Filters</span>
                </div>
                <div className='col-auto p-0'>
                    <label>
                        With Tag:
                    </label>
                </div>
                <MultiSelectWrapper className='col-auto'>
                    <Multiselect className='bg-secondary'
                        options={tagOptions} // Options to display in the dropdown
                        selectedValues={allowedTags} // Preselected value to persist in dropdown
                        onSelect={onAllowedSelect} // Function will trigger on select event
                        onRemove={onAllowedRemove} // Function will trigger on remove event
                        displayValue='name' // Property name to display in the dropdown options
                        style={{ option: { backgroundColor: '#111111' } }}
                    />
                </MultiSelectWrapper>
                <div className='col-auto p-0'>
                    <label>
                        Without Tag:
                    </label>
                </div>
                <MultiSelectWrapper className='col-auto'>
                    <Multiselect className='bg-secondary'
                        options={tagOptions} // Options to display in the dropdown
                        selectedValues={disallowedTags} // Preselected value to persist in dropdown
                        onSelect={onDisallowedSelect} // Function will trigger on select event
                        onRemove={onDisallowedRemove} // Function will trigger on remove event
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
                            <>
                                <CheckBoxWrapper type='checkbox' onChange={e => e.target.checked ? setSelectedClips(clips => [...clips, clip.url]) : setSelectedClips(clips => clips.filter(u => u !== clip.url))} />
                                <span>
                                    {clip.date}
                                </span>
                                <a href={`https://twitch.tv/${clip.channel_name}`}>
                                    {clip.channel_name}
                                </a>
                                <ClipTitle>
                                    <a href={clip.url}>
                                        {clip.title}
                                    </a>
                                </ClipTitle>
                                <span>
                                    {clip.clipper_name}
                                </span>
                                <ClipTags>
                                    {
                                        clip.tags.map(tag => {
                                            return (
                                                <TagWrapper key={tag}>
                                                    <span>
                                                        {tag}
                                                    </span>
                                                    <DeleteTagButton className='bg-secondary clickable' onClick={() => removeTag(clip.id, tag)}>
                                                        x
                                                    </DeleteTagButton>
                                                </TagWrapper>
                                            )
                                        })
                                    }
                                </ClipTags>
                                <SplitLine />
                            </>
                        )
                    })
                }
            </ListWrapper>
            <button onClick={loadMoreClips}>
                Load More
            </button>
        </PageWrapper >
    );
}