import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as clipAPI from '../../network/twitch-clips-network';
import * as networkHelper from '../../network/network-helper';

import { TextToast } from '../../toasts/text-toast';
import { Button, ButtonLink } from '../../styles/common-styles';
import { useURLParams } from '../../hooks/use-url-params';
import styled from 'styled-components';
import { PageLoading } from '../base/page-loading';

const ContentWrapper = styled.div`
    margin: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const LeftButton = styled(Button)`
    justify-self: right;
`;

const RightButton = styled(Button)`
    justify-self: left;
`;

const ClipRow = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 16px;
    align-items: center;
    justify-items: center;
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

export const TwitchClipTagger = () => {

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const { channel } = useURLParams();

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
        if (auth.authState && channel && channel != -1)
            loadData();
    }, [auth.authChecked, channel]);

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

    const loadClipTags = () => {
        if (clips.length > 0) {
            clipAPI.getClipTags(clips[clipIndex].id).then(json => {
                if (json.success)
                    setClipTags(json.data);
            });
        }
    }

    const addNewTag = () => {
        clipAPI.addTagsToClip(clips[clipIndex].id, [newTag]).then(() => loadTags());
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

    const getStyle = (tagId) => {
        return clipTags.find(t => t === tagId) ? ({ borderColor: '#0c940c', borderWidth: '3px' }) : {}
    }

    return (
        <ContentWrapper>
            <ButtonLink to='/twitchclipfilterer/clips'>Back</ButtonLink>
            {clips.length > clipIndex &&
                <ClipRow>
                    <LeftButton disabled={clipIndex === 0} onClick={prevClip}>Prev</LeftButton>
                    <iframe
                        src={`https://clips.twitch.tv/embed?clip=${clips[clipIndex].id}&parent=${networkHelper.getSiteURLBase().replace('https://', '')}`}
                        height='480'
                        width='720'
                        frameBorder='0'
                        scrolling='no'
                        allowFullScreen={true}>
                    </iframe>
                    <RightButton onClick={nextClip}>Next</RightButton>
                </ClipRow>
            }
            {(clips.length === 0 || clips.length === clipIndex) && loading &&
                <PageLoading />
            }
            {(clips.length === 0 || clips.length === clipIndex) && !loading &&
                <span>No more videos!</span>
            }
            <QuickActionsWrapper>
                <Button onClick={() => updateClipTag(1)} style={getStyle(1)}>Good</Button>
                <Button onClick={() => updateClipTag(2)} style={getStyle(2)}>Meh</Button>
                <Button onClick={() => updateClipTag(3)} style={getStyle(3)}>Bad</Button>
                <Button onClick={() => updateClipTag(4)} style={getStyle(4)}>Delete</Button>
            </QuickActionsWrapper>
            <TagsWrapper>
                {
                    tags.filter(tag => tag.id !== 1 && tag.id !== 2 && tag.id !== 3 && tag.id !== 4).map(tag => {
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