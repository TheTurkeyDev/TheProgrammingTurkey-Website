import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';
import * as networkHelper from '../../network/network-helper';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';

export function TwitchClipTagger(props) {

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [channel, setChannel] = useState('63937599');
    const [loading, setLoading] = useState(true);
    const [clipIndex, setClipIndex] = useState(0);
    const [clips, setClips] = useState([]);
    const [clipTags, setClipTags] = useState([]);
    const [tags, setTags] = useState([]);

    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        async function loadData() {
            loadClips();
            loadTags();
        }
        if (auth.authState)
            loadData();
    }, [auth.authChecked]);

    useEffect(() => {
        loadClipTags();
    }, [clips, clipIndex]);

    const loadClips = () => {
        setLoading(true);
        clipAPI.getUntaggedClips(channel).then(json => {
            if (json.success) {
                setClips(clips => [...clips, ...json.data]);
                toast.pushToast(<TextToast text='Clips loaded!' />);
            }
            else {
                toast.pushToast(<TextToast text='Failed to load clips!' />);
            }
            setLoading(false);
        });
    }

    const loadTags = () => {
        clipAPI.getTags().then(json => {
            if (json.success)
                setTags(json.data);
        });
    }

    const updateClipTag = (tag) => {
        if (clipTags.includes(tag)) {
            clipAPI.removeTagFromClip(clips[clipIndex].id, [tag]).then(json => {
                if (json.success)
                    setClipTags(tags => tags.filter(t => t !== tag));
            });
        }
        else {
            clipAPI.addTagsToClip(clips[clipIndex].id, [tag]).then(json => {
                if (json.success)
                    setClipTags(tags => [...tags, tag]);
            });
        }
    }

    const loadClipTags = () => {
        if (clips.length > 0) {
            clipAPI.getClipTags(clips[clipIndex].id).then(json => {
                if (json.success)
                    setClipTags(json.data);
            });
        }
    }

    const addNewTag = () => {
        clipAPI.addTagsToClip(clips[clipIndex].id, [newTag]).then(() => {
            loadTags();
        });
        setNewTag('');
    }

    const nextClip = () => {
        if (clipIndex === clips.length - 1) {
            loadClips();
        }
        setClipIndex(index => index + 1);
    }

    const prevClip = () => {
        if (clipIndex > 0) {
            setClipIndex(index => index - 1);
        }
    }

    const getStyle = (tag) => {
        return clipTags.includes(tag) ? ({ backgroundColor: '#0c940c' }) : {}
    }

    if (clips.length > 0)
        console.log(clips[clipIndex].id);

    return (
        <AuthPageWrapper history={props.history} perm='twitchclipfilter' parent='/twitchclipfilterer/clips'>
            <div className='fluid-container pl-3'>
                <div className='row'>
                    <div className='col'>
                        <label>
                            Channel
                        </label>
                        <input type='text' value={channel} onChange={(e) => setChannel(e.target.value)} />
                    </div>
                </div>
                <div className='row'>
                    {clips.length > clipIndex &&
                        <div className='col-auto mx-auto'>
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${clips[clipIndex].id}&parent=${networkHelper.getSiteURLBase().replace('https://', '')}`}
                                height='720'
                                width='1280'
                                frameBorder='0'
                                scrolling='no'
                                allowFullScreen={true}>
                            </iframe>
                        </div>
                    }
                    {(clips.length === 0 || clips.length === clipIndex) && loading &&
                        <div className='col-auto mx-auto'>
                            <div className='spinner'></div>
                        </div>
                    }
                    {(clips.length === 0 || clips.length === clipIndex) && !loading &&
                        <div className='col-auto mx-auto'>
                            <span>No more videos!</span>
                        </div>
                    }
                </div>
                <div className='row mt-1'>
                    <div className='col-auto ml-auto' />
                    <div className='col-auto'>
                        <button disabled={clipIndex === 0} onClick={prevClip}>Prev</button>
                    </div>
                    <div className='col-auto mr-2'>
                        <button onClick={() => updateClipTag('good')} style={getStyle('good')}>Good</button>
                    </div>
                    <div className='col-auto mr-2'>
                        <button onClick={() => updateClipTag('meh')} style={getStyle('meh')}>Meh</button>
                    </div>
                    <div className='col-auto mr-2'>
                        <button onClick={() => updateClipTag('bad')} style={getStyle('bad')}>Bad</button>
                    </div>
                    <div className='col-auto mr-2'>
                        <button onClick={() => updateClipTag('deleted')} style={getStyle('deleted')}>Delete</button>
                    </div>
                    <div className='col-auto'>
                        <button onClick={nextClip}>Next</button>
                    </div>
                    <div className='col-auto mr-auto' />
                </div>
                <div className='row mt-2 mx-0 px-2'>
                    {
                        tags.filter(tag => tag !== 'good' && tag !== 'bad' && tag !== 'meh').map(tag => {
                            return (
                                <div key={tag} className='col-auto mr-1 mb-2'>
                                    <button onClick={() => updateClipTag(tag)} style={getStyle(tag)}>{tag}</button>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='row mt-2'>
                    <div className='col-auto ml-auto' />
                    <div className='col-auto'>
                        <label>New Tag</label>
                    </div>
                    <div className='col-auto'>
                        <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                    </div>
                    <div className='col-auto'>
                        <button onClick={addNewTag}> Add</button>
                    </div>
                    <div className='col-auto mr-auto' />
                </div>
            </div>
        </AuthPageWrapper >
    );
}