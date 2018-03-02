import React, { Component } from 'react';
import {
  View,
  Picker,
  Text
} from 'react-native';

//Styles
import stylesheet from './styles';

//Form Employee Basic Information
export const CustomSelectPickerTemplate = (locals) => {
    if (locals.hidden) {
        return null;
    }
    
    /* let stylesheet = locals.stylesheet; */
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let specialPickerWrapperStyle = stylesheet.specialPickerWrapper.normal;

    let selectStyle = Object.assign(
        {},
        stylesheet.select.normal,
        stylesheet.pickerContainer.normal
    );
    let helpBlockStyle = stylesheet.helpBlock.normal;
    let errorBlockStyle = stylesheet.errorBlock;
    
    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        selectStyle = stylesheet.select.error;
        helpBlockStyle = stylesheet.helpBlock.error;
        specialPickerWrapperStyle = stylesheet.specialPickerWrapper.error;
    }
    
    let label = locals.label ? (
        <Text style={controlLabelStyle}>{locals.label}</Text>
    ) : null;
    let help = locals.help ? (
        <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;
    let error =
        locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
            {locals.error}
        </Text>
        ) : null;
    
    let options = locals.options.map(({ value, text }) => (
        <Picker.Item key={value} value={value} label={text} />
    ));
    
    return (
        <View style={formGroupStyle}>
        {label}
            <View style={specialPickerWrapperStyle}>
                <Picker
                    accessibilityLabel={locals.label}
                    ref="input"
                    style={selectStyle}
                    selectedValue={locals.value}
                    onValueChange={locals.onChange}
                    help={locals.help}
                    enabled={locals.enabled}
                    mode={locals.mode}
                    prompt={locals.prompt}
                    itemStyle={locals.itemStyle}
                >
                    {options}
                </Picker>
            </View>
        {help}
        {error}
        </View>
    );
}