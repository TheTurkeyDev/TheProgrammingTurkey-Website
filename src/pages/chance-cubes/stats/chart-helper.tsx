import styled from 'styled-components';

function isValidPart(x: string) {
    return (/^\d+$/).test(x);
};

export function versionCompare(v1: string, v2: string): number {
    if (v1 === 'All') {
        return 1;
    }
    else if (v2 === 'All') {
        return -1;
    }
    else if (v1.includes('-')) {
        const v1parts = v1.split('-');
        const v2parts = v2.split('-');
        const comp = versionCompare(v1parts[0], v2parts[0]);
        return comp === 0 ? versionCompare(v1parts[1], v2parts[1]) : comp;
    }

    const v1parts = v1.split('.');
    const v2parts = v2.split('.');

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    const v1partsNums = v1parts.map(Number);
    const v2partsNums = v2parts.map(Number);

    // eslint-disable-next-line functional/no-let
    for (let i = 0; i < v1partsNums.length; ++i) {
        if (v2partsNums.length === i)
            return 1;

        if (v1partsNums[i] === v2partsNums[i])
            continue;
        else if (v1partsNums[i] > v2partsNums[i])
            return 1;
        else
            return -1;
    }

    return v1partsNums.length !== v2parts.length ? -1 : 0;
}

export const ChartWrapper = styled.div`
    max-width: 700px;
    max-height: 700px;
    margin-inline: auto;
`;