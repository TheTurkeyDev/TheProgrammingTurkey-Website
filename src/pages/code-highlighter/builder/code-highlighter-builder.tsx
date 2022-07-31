import { ButtonRow, ContainedButton, Headline2, OutlinedButton } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { AddDirectiveModal } from './code-highlighter-add-directive-modal';
import { ImportFileModal } from './code-highlighter-import-file-modal';
import { Directive } from './directive';
import { DirectiveType } from './directives-type';
import { HighlightDirective, HighlightDirectiveType } from './highlight-directive';
import { TitleDirective, TitleDirectiveType } from './title-directive';

const DirectivesList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 8px;
    max-width: 800px;
    margin-inline: auto;
`;

export type CodeMap = {
    readonly name: string
    readonly code: string
}

type RenderResp = {
    readonly id: string,
    readonly format: string
}

export const CodeHighlighterBuilder = () => {
    const navigate = useNavigate();
    const [directives, setDirectives] = useState<readonly Directive[]>([]);
    const [codeFiles, setCodeFiles] = useState<readonly CodeMap[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFileInportModal, setShowFileInportModal] = useState(false);

    const { query } = useQuery<RenderResp>(`${getDevAPIBase()}/render/generate`, {
        requestData: postParams
    });

    const addCode = (name: string, code: string) => {
        setCodeFiles(old => [...old, { name, code }]);
        setShowFileInportModal(false);
    };

    const genJson = () => {
        query(JSON.stringify({
            git: 'git@github.com:TheTurkeyDev/YouTube-Video-Gen.git',
            compositionId: 'CodeHighlight',
            entry: './temp/src/index.tsx',
            directives
        })).then(() => navigate('/codehighlighter'));
    };

    const addNewDirective = (type: DirectiveType) => {
        switch (type) {
            case DirectiveType.TITLE:
                return {
                    type: DirectiveType.TITLE,
                    duration: 0,
                    title: '',
                    startFrame: 0
                } as TitleDirectiveType;
            case DirectiveType.HIGHLIGHT:
                return {
                    type: DirectiveType.HIGHLIGHT,
                    duration: 180,
                    code: [],
                    lines: [{ start: 0, end: 0 }],
                    startFrame: 0,
                    showTime: 2,
                    animTime: 1,
                    fontSize: 24,
                    boxWidth: 5,
                    boxColor: 'green',
                    indentor: '\t',
                    language: 'Java',
                } as HighlightDirectiveType;
        }
    };

    const addDirective = (d: Directive) => {
        setDirectives(old => [...old, {
            ...d,
            startFrame: old.reduce((prev, curr) => prev + curr.duration, 0)
        }]);
    };
    const removeDirective = (index: number) => setDirectives(old => [...old.filter((_, i) => i !== index)]);
    const moveDirective = (index: number, up: boolean) => {
        if (up && index > 0 && directives.length > 1)
            setDirectives(old => [...old.slice(0, index - 1), ...old.slice(index, index + 1), ...old.slice(index - 1, index), ...old.slice(index + 1)]);
        else if (!up && index < directives.length - 1 && directives.length > 1)
            setDirectives(old => [...old.slice(0, index), ...old.slice(index + 1, index + 2), ...old.slice(index, index + 1), ...old.slice(index + 2)]);
    };
    const updateDirective = (index: number, d: Directive) => setDirectives(old => [...old.slice(0, index), d, ...old.slice(index + 1)]);

    const getDirectiveComponent = (directive: Directive, i: number) => {
        switch (directive.type) {
            case DirectiveType.TITLE:
                return <TitleDirective
                    key={i}
                    td={directive as TitleDirectiveType}
                    onDelete={() => removeDirective(i)}
                    onMove={(up) => moveDirective(i, up)}
                    update={(td) => updateDirective(i, td)}
                />;
            case DirectiveType.HIGHLIGHT:
            default:
                return <HighlightDirective
                    key={i}
                    hd={directive as HighlightDirectiveType}
                    codeFiles={codeFiles}
                    onDelete={() => removeDirective(i)}
                    onMove={(up) => moveDirective(i, up)}
                    update={(hd) => updateDirective(i, hd)}
                />;
        }
    };

    return (
        <DirectivesList>
            <Headline2>Code Highlighter Builder</Headline2>
            {directives.map((d, i) => getDirectiveComponent(d, i))}
            <ButtonRow>
                <OutlinedButton onClick={() => setShowAddModal(true)}>Add Directive</OutlinedButton>
                <OutlinedButton onClick={() => setShowFileInportModal(true)}>Add File</OutlinedButton>
                <ContainedButton onClick={() => genJson()}>Render</ContainedButton>
            </ButtonRow>
            <AddDirectiveModal show={showAddModal} requestClose={() => setShowAddModal(false)} addNewDirective={type => { addDirective(addNewDirective(type)); setShowAddModal(false); }} />
            <ImportFileModal show={showFileInportModal} requestClose={() => setShowFileInportModal(false)} importCode={(name, code) => addCode(name, code)} />
        </DirectivesList>
    );
};