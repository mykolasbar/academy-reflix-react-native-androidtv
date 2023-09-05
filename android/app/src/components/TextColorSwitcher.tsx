import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const TextColorSwitcher = ({style, children}: any) => {
    let theme: any = useContext(ThemeContext)
    let textStyle = {...style, color: theme.getColorTheme() === 'light' ? 'black' : 'white'}

    return (
        <Text style = {textStyle} >
            {children}
        </Text>
    );
};

export default TextColorSwitcher;