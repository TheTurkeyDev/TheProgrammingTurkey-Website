import { Body1, OutlinedButton } from 'gobble-lib-react';

type NBTInputProps = {
    readonly label: string
}

export const NBTInput = ({ label }: NBTInputProps) => {
    return (
        <>
            <Body1>{label}</Body1>
            <OutlinedButton>Edit NBT</OutlinedButton>
        </>
    );
};