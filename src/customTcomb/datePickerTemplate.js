import React from "react";
import {
  View,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableNativeFeedback
} from "react-native";

//Custom Form Styles
import stylesheet from './styles';

export const CustomDatePickerTemplate = (locals) => {
  if (locals.hidden) {
    return null;
  }

  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let datepickerStyle = stylesheet.datepicker.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  let errorBlockStyle = stylesheet.errorBlock;
  let dateValueStyle = stylesheet.dateValue.normal;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    datepickerStyle = stylesheet.datepicker.error;
    helpBlockStyle = stylesheet.helpBlock.error;
    dateValueStyle = stylesheet.dateValue.error;
  }

  // Setup the picker mode
  let datePickerMode = locals.mode;
  if (
    datePickerMode !== "date" &&
    datePickerMode !== "time" &&
    datePickerMode !== "datetime"
  ) {
    throw new Error(`Unrecognized date picker format ${datePickerMode}`);
  }

  /**
   * Check config locals for Android datepicker.
   * `locals.config.background: `TouchableNativeFeedback` background prop
   * `locals.config.format`: Date format function
   * `locals.config.dialogMode`: 'calendar', 'spinner', 'default'
   * `locals.config.dateFormat`: Date only format
   * `locals.config.timeFormat`: Time only format
   */
  let formattedValue = locals.value;
  let background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
  let dialogMode = "default";
  let formattedDateValue = locals.value/* .toDateString(); */
  let formattedTimeValue = locals.value/* .toTimeString(); */
  if (locals.config) {
    if (locals.config.format) {
      if(locals.value){
        formattedValue = locals.config.format(locals.value);
      }
    }
    if (locals.config.background) {
      background = locals.config.background;
    }
    if (locals.config.dialogMode) {
      dialogMode = locals.config.dialogMode;
    }
    if (locals.config.dateFormat) {
      formattedDateValue = locals.config.dateFormat(locals.value);
    }
    if (locals.config.timeFormat) {
      formattedTimeValue = locals.config.timeFormat(locals.value);
    }
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
  let value = <Text style={dateValueStyle}>{formattedValue  || ''}</Text>;

  return (
    <View style={formGroupStyle}>
      {datePickerMode === "datetime" ? (
        <View>
          {label}
          <TouchableNativeFeedback
            accessible={true}
            disabled={locals.disabled}
            ref="input"
            background={background}
            onPress={function() {
              let config = {
                date: locals.value || new Date(),
                mode: dialogMode
              };
              if (locals.minimumDate) {
                config.minDate = locals.minimumDate;
              }
              if (locals.maximumDate) {
                config.maxDate = locals.maximumDate;
              }
              DatePickerAndroid.open(config).then(function(date) {
                if (date.action !== DatePickerAndroid.dismissedAction) {
                  let newDate = new Date(locals.value);
                  newDate.setFullYear(date.year, date.month, date.day);
                  locals.onChange(newDate);
                }
              });
              if (typeof locals.onPress === "function") {
                locals.onPress();
              }
            }}
          >
            <View>
              <Text style={dateValueStyle}>{formattedDateValue}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            accessible={true}
            disabled={locals.disabled}
            ref="input"
            background={background}
            onPress={function() {
              const now = new Date();
              const isDate = locals.value && locals.value instanceof Date;
              let setTime = {
                hour: isDate ? locals.value.getHours() : now.getHours(),
                minute: isDate ? locals.value.getMinutes() : now.getMinutes()
              };
              TimePickerAndroid.open({
                is24Hour: true,
                hour: setTime.hour,
                minute: setTime.minute
              }).then(function(time) {
                if (time.action !== TimePickerAndroid.dismissedAction) {
                  const newTime = new Date(locals.value);
                  newTime.setHours(time.hour);
                  newTime.setMinutes(time.minute);
                  locals.onChange(newTime);
                }
              });
              if (typeof locals.onPress === "function") {
                locals.onPress();
              }
            }}
          >
            <View>
              <Text style={dateValueStyle}>{formattedTimeValue}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : (
        <TouchableNativeFeedback
          accessible={true}
          disabled={locals.disabled}
          ref="input"
          background={background}
          onPress={function() {
            if (datePickerMode === "time") {
              const now = new Date();
              const isDate = locals.value && locals.value instanceof Date;
              let setTime = {
                hour: isDate ? locals.value.getHours() : now.getHours(),
                minute: isDate ? locals.value.getMinutes() : now.getMinutes()
              };
              TimePickerAndroid.open({
                is24Hour: true,
                hour: setTime.hour,
                minute: setTime.minute
              }).then(function(time) {
                if (time.action !== TimePickerAndroid.dismissedAction) {
                  const newTime = new Date();
                  newTime.setHours(time.hour);
                  newTime.setMinutes(time.minute);
                  locals.onChange(newTime);
                }
              });
            } else if (datePickerMode === "date") {
              let config = {
                date: locals.value || new Date(),
                mode: dialogMode
              };
              if (locals.minimumDate) {
                config.minDate = locals.minimumDate;
              }
              if (locals.maximumDate) {
                config.maxDate = locals.maximumDate;
              }
              DatePickerAndroid.open(config).then(function(date) {
                if (date.action !== DatePickerAndroid.dismissedAction) {
                  let newDate = new Date(date.year, date.month, date.day);
                  locals.onChange(newDate);
                }
              });
            }
            if (typeof locals.onPress === "function") {
              locals.onPress();
            }
          }}
        >
          <View>
            {label}
            {value}
          </View>
        </TouchableNativeFeedback>
      )}
      {help}
      {error}
    </View>
  );
}