import React, { useEffect, useState, useRef, useContext } from 'react';

import { useInterval } from '../../util/use-interval';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as authAPI from "../../network/auth-network";
import * as networkHelper from '../../network/network-helper';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';

export function TwitchClipFilterer(props) {

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [channel, setChannel] = useState("63937599");
    const [loading, setLoading] = useState(true);
    const [clips, setClips] = useState([]);
    const [tags, setTags] = useState([]);

    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        async function loadData() {
            loadClips();
            loadTags();
        }
        if (auth.authState)
            loadData();
    }, [auth.authChecked]);

    const loadClips = () => {
        setLoading(true);
        authAPI.getUntaggedClips(channel, "2020-01-05 00:00:01", "2020-12-31 23:59:59").then(json => {
            if (json.success) {
                setClips(json.data);
                toast.pushToast(<TextToast text="Clips loaded!" />);
            }
            else {
                toast.pushToast(<TextToast text="Failed to load clips!" />);
            }
            setLoading(false);
        });
    }

    const loadTags = () => {
        authAPI.getTags().then(json => {
            if (json.success)
                setTags(json.data);
        });
    }

    const pullClips = () => {
        authAPI.pullTwitchClips(channel, "2020-01-05 00:00:01", "2020-12-31 23:59:59").then((json) => {
            toast.pushToast(<TextToast text={json.message} />);
        });
    }

    const addTagToClip = async (tag) => {
        await authAPI.addTagsToClip(clips[0].id, [tag]).then(json => {
            console.log(json.message);
        });
    }

    const addNewTag = () => {
        addTagToClip(newTag).then(() => {
            loadTags();
        });
        setNewTag("");
    }

    const nextClip = () => {
        if (clips.length == 1) {
            loadClips();
        }
        else {
            setClips(clips => {
                let temp = [...clips];
                temp.shift();
                return [...temp];
            });
        }
    }

    return (
        <AuthPageWrapper history={props.history} perm="twitchclipfilter">
            <div className="fluid-container pl-3">
                <div className="row">
                    <div className="col">
                        <button onClick={pullClips}>
                            Pull Clips
                        </button>
                    </div>
                    <div className="col">
                        <label>
                            Channel
                        </label>
                        <input type="text" value={channel} onChange={(e) => setChannel(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    {clips.length > 0 &&
                        <div className="col-auto mx-auto">
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${clips[0].id}&parent=${networkHelper.getSiteURLBase().replace("https://", "")}`}
                                height="720"
                                width="1280"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen="true">
                            </iframe>
                        </div>
                    }
                    {clips.length === 0 && loading &&
                        <div className="col-auto mx-auto">
                            <div className="spinner"></div>
                        </div>
                    }
                    {clips.length === 0 && !loading &&
                        <div className="col-auto mx-auto">
                            <span>No more videos!</span>
                        </div>
                    }
                </div>
                <div className="row mt-1">
                    <div className="col-auto ml-auto" />
                    <div className="col-auto mr-2">
                        <button onClick={() => addTagToClip("good")}>Good</button>
                    </div>
                    <div className="col-auto mr-2">
                        <button onClick={() => addTagToClip("meh")}>Meh</button>
                    </div>
                    <div className="col-auto mr-2">
                        <button onClick={() => addTagToClip("bad")}>Bad</button>
                    </div>
                    <div className="col-auto mr-2">
                        <button onClick={() => addTagToClip("deleted")}>Delete</button>
                    </div>
                    <div className="col-auto">
                        <button onClick={nextClip}>Next</button>
                    </div>
                    <div className="col-auto mr-auto" />
                </div>
                <div className="row mt-2 mx-0 px-2">
                    {
                        tags.filter(tag => tag !== "good" && tag !== "bad" && tag !== "meh").map(tag => {
                            return (
                                <div className="col-auto mr-1">
                                    <button onClick={() => addTagToClip(tag)}>{tag}</button>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="row mt-2">
                    <div className="col-auto ml-auto" />
                    <div className="col-auto">
                        <label>New Tag</label>
                    </div>
                    <div className="col-auto">
                        <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <button onClick={addNewTag}> Add</button>
                    </div>
                    <div className="col-auto mr-auto" />
                </div>
            </div>
        </AuthPageWrapper >
    );
}