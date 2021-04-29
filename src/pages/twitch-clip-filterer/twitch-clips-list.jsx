import { useEffect, useState, useContext } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';

import { TextToast } from '../../toasts/text-toast';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`;

const TagWrapper = styled.div`
    position: relative;
    width: min-content;
    padding-right: 1.78rem;
    border: 1px solid #00ff00;
    border-radius: 7px;
`;

export const TwitchClipsList = () => {
    const toast = useContext(ToastContext);

    const [channel, setChannel] = useState(63937599);
    const [clips, setClips] = useState([]);
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
        <div className='fluid-container pl-3 pr-3'>
            <div className='row m-0 mt-2'>
                <div className='col'>
                    <Link to='/twitchclipfilterer/tagger'>
                        Tag Clips
                    </Link>
                </div>
                <div className='col'>
                    <button onClick={pullClips}>
                        Pull Clips
                    </button>
                </div>
                <div className='col'>
                    <label className='mr-1'>
                        Channel
                    </label>
                    <input type='text' value={channel} onChange={(e) => setChannel(e.target.value)} />
                </div>
            </div>
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
            <div className='row m-0'>
                <BasicBorderWrapper className='fluid-container w-100'>
                    <div className='row m-0 py-1'>
                        <div className='col-1 m-0'>
                            <h5>
                                Date
                            </h5>
                        </div>
                        <div className='col-1 m-0'>
                            <h5>
                                Channel
                            </h5>
                        </div>
                        <div className='col-3 m-0'>
                            <h5>
                                Title
                            </h5>
                        </div>
                        <div className='col-2 m-0'>
                            <h5>
                                Clipper
                            </h5>
                        </div>
                        <div className='col m-0'>
                            <h5>
                                Tags
                            </h5>
                        </div>
                    </div>
                    {
                        clips.map(clip => {
                            return (
                                <BasicBorderWrapper key={clip.id} className='row m-0 py-1'>
                                    <div className='col-1 m-0'>
                                        {clip.date}
                                    </div>
                                    <div className='col-1 m-0'>
                                        <a href={`https://twitch.tv/${clip.channel_name}`}>
                                            {clip.channel_name}
                                        </a>
                                    </div>
                                    <ClipTitle className='col-3 m-0'>
                                        <a href={clip.url}>
                                            {clip.title}
                                        </a>
                                    </ClipTitle>
                                    <div className='col-2 m-0'>
                                        {clip.clipper_name}
                                    </div>
                                    <div className='col m-0'>
                                        <div className='fluid-container w-100'>
                                            <div className='row m-0 py-1'>
                                                {
                                                    clip.tags.map(tag => {
                                                        return (
                                                            <TagWrapper key={tag} className='mr-2 mt-1 pl-2'>
                                                                <span>
                                                                    {tag}
                                                                </span>
                                                                <DeleteTagButton className='text-center bg-secondary clickable' onClick={() => removeTag(clip.id, tag)}>
                                                                    x
                                                                </DeleteTagButton>
                                                            </TagWrapper>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </BasicBorderWrapper>
                            )
                        })
                    }
                </BasicBorderWrapper>
            </div>
            <div className='row m-0 my-2'>
                <div className='col'>
                    <button onClick={loadMoreClips}>
                        Load More
                    </button>
                </div>
            </div>
        </div>
    );
}