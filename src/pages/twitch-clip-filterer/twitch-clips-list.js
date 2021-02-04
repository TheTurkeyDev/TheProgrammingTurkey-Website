import React, { useEffect, useState, useContext } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';
import { Link } from 'react-router-dom';

export function TwitchClipsList(props) {
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [channel, setChannel] = useState(63937599);
    const [clips, setClips] = useState([]);
    const [page, setPage] = useState(0);
    const [tags, setTags] = useState([]);
    const [filterTags, setFilterTags] = useState([]);
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
    }, [filterTags]);

    useEffect(() => {
        if (!update) {
            return;
        }
        clipAPI.getClips(channel, page, 25, filterTags.map(ft => ft.id)).then((json) => {
            if (json.success)
                setClips(clips => [...clips, ...json.data]);
        });
        setUpdate(false);
    }, [page, filterTags, update]);

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

    const onSelect = (list, item) => {
        setFilterTags(ftags => [...ftags, item]);
    }

    const onRemove = (list, item) => {
        setFilterTags(ftags => [...ftags.filter(t => t.id !== item.id)]);
    }

    const tagOptions = tags.map(tag => {
        return { "name": tag, "id": tag }
    });
    return (
        <AuthPageWrapper history={props.history} perm="twitchclipfilter" parent="/user/profile">
            <div className="fluid-container pl-3 pr-3">
                <div className="row m-0 mt-2">
                    <div className="col">
                        <Link to="/twitchclipfilterer/tagger">
                            Tag Clips
                        </Link>
                    </div>
                    <div className="col">
                        <button onClick={pullClips}>
                            Pull Clips
                        </button>
                    </div>
                    <div className="col">
                        <label className="mr-1">
                            Channel
                        </label>
                        <input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} />
                    </div>
                </div>
                <div className="row mx-0 my-2 pt-3 pb-2" style={{ border: "1px solid #d1d1d1", borderRadius: "5px" }}>
                    <div className="col-auto">
                        <span>Filters</span>
                    </div>
                    <div className="col-auto p-0">
                        <label>
                            Tag:
                        </label>
                    </div>
                    <div className="col-auto" style={{ maxWidth: "750px" }}>
                        <Multiselect className="bg-secondary"
                            options={tagOptions} // Options to display in the dropdown
                            selectedValues={filterTags} // Preselected value to persist in dropdown
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            style={{ option: { backgroundColor: "#111111" } }}
                        />
                    </div>
                </div>
                <div className="row m-0">
                    <div className="fluid-container w-100" style={{ border: "1px solid #d1d1d1", borderRadius: "5px" }}>
                        <div className="row m-0 py-1">
                            <div className="col-1 m-0">
                                <h5>
                                    Date
                                </h5>
                            </div>
                            <div className="col-1 m-0">
                                <h5>
                                    Channel
                                </h5>
                            </div>
                            <div className="col-3 m-0">
                                <h5>
                                    Title
                                </h5>
                            </div>
                            <div className="col-2 m-0">
                                <h5>
                                    Clipper
                                </h5>
                            </div>
                            <div className="col m-0">
                                <h5>
                                    Tags
                                </h5>
                            </div>
                        </div>
                        {
                            clips.map(clip => {
                                return (
                                    <div key={clip.id} className="row m-0 py-1" style={{ borderTop: "1px solid #d1d1d1" }}>
                                        <div className="col-1 m-0">
                                            {clip.date}
                                        </div>
                                        <div className="col-1 m-0">
                                            <a href={`https://twitch.tv/${clip.channel_name}`}>
                                                {clip.channel_name}
                                            </a>
                                        </div>
                                        <div className="col-3 m-0" style={{ overflowX: "hidden" }}>
                                            <a href={clip.url}>
                                                {clip.title}
                                            </a>
                                        </div>
                                        <div className="col-2 m-0">
                                            {clip.clipper_name}
                                        </div>
                                        <div className="col m-0">
                                            <div className="fluid-container w-100">
                                                <div className="row m-0 py-1">
                                                    {
                                                        clip.tags.map(tag => {
                                                            return (
                                                                <div key={tag} className="mr-2 mt-1 pl-2" style={{ position: "relative", width: "min-content", paddingRight: "1.78rem", border: "1px solid #00ff00", borderRadius: "7px" }}>
                                                                    <span>
                                                                        {tag}
                                                                    </span>
                                                                    <div className="text-center bg-secondary clickable" onClick={() => removeTag(clip.id, tag)} style={{ position: "absolute", top: "2px", right: "2px", lineHeight: "15px", height: "20px", width: "20px", border: "1px solid #ffffff", borderRadius: "10px" }}>
                                                                        x
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row m-0 my-2">
                    <div className="col">
                        <button onClick={loadMoreClips}>
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </AuthPageWrapper >
    );
}