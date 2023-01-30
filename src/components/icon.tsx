import styled from 'styled-components';

const StyledIcon = styled.i`
    &:hover {
        cursor: pointer;
    }
`;
type IconProps = React.HTMLAttributes<HTMLElement> & {
    readonly name: string
}
export const Icon = ({ name, ...props }: IconProps) => (<StyledIcon className={name} {...props} />);