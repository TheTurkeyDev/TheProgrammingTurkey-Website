import { Body1, ButtonText } from 'gobble-lib-react';
import { CodeHighlightRender } from './code-highlight-render-data';

type CodeHighlightVideoProps = {
    readonly video: CodeHighlightRender
}

export const CodeHighlightVideo = ({ video }: CodeHighlightVideoProps) => {

    return (
        <>
            <Body1>{video.display}</Body1>
            <Body1>{video.creator}</Body1>
            <Body1>{video.type}</Body1>
            <Body1>{video.createdAt}</Body1>
            <a href={video.url} download>
                <i className='fas fa-download clickable' />
            </a>
        </>
    );

};