import styled from 'styled-components';
import { CenterContent } from '../styles/common-styles';

const SectionWrapper = styled.span`
    font-size: 1.25rem;
    text-decoration: underline;
`;

export const Info = () => {
    return (
        <CenterContent>
            <h2>Contact Me!</h2>
            <div>
                <span>Email:</span>
            </div>
            <div>
                <span>turkey@theturkey.dev</span>
            </div>
            <h2 className='mt-3'>Programming languages</h2>
            <SectionWrapper>
                Familiar with
            </SectionWrapper>
            <div>Java</div>
            <div className='mt-2'>
                <SectionWrapper>
                    Worked with a decent amount
                </SectionWrapper>
                <div>Python</div>
                <div>JavaScript (React)</div>
                <div>C#</div>
                <div>HTML / css</div>
                <div>C / Arduino</div>
                <div>SQL</div>
            </div>
            <div className='mt-2'>
                <SectionWrapper>
                    Worked with a few times, but would need refreshers
                </SectionWrapper>
                <div>PHP</div>
                <div>MatLab</div>
            </div>
        </CenterContent>
    );
}
