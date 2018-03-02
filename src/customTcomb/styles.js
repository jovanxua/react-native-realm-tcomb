import { Platform } from "react-native";

export const LABEL_COLOR = "#5b5b5b";
export const INPUT_COLOR = "#191919";
export const ERROR_COLOR = "#a94442";
export const HELP_COLOR = "#999999";
/* export const BORDER_COLOR = "#8E929A"; */
export const BORDER_COLOR = "#bababa";
export const BORDER_WIDTH = 1;
export const DISABLED_COLOR = "#777777";
export const DISABLED_BACKGROUND_COLOR = "#eeeeee";
export const FONT_SIZE = 15;
export const FONT_WEIGHT = "400";
export const FONT_FAMILY = "Helvetica-Light"
export const BACKGROUNDCOLOR = '#fff'

const stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      paddingLeft: 2,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textboxView: {
    normal: {},
    error: {},
    notEditable: {}
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: BORDER_WIDTH,
      marginBottom: 5,
      backgroundColor: BACKGROUNDCOLOR
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: BORDER_WIDTH,
      marginBottom: 5,
      backgroundColor: BACKGROUNDCOLOR
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: BORDER_WIDTH,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },

  specialPickerWrapper: {
    normal: {
      height: 36,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: BORDER_WIDTH,
      backgroundColor: BACKGROUNDCOLOR
    },
    // the style applied when a validation error occours
    error: {
      height: 36,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: BORDER_WIDTH,
      backgroundColor: BACKGROUNDCOLOR
    },
  },

  pickerContainer: {
    normal: {
    },
    error: {
    },
    open: {
      // Alter styles when select container is open
    }
  },
  
  select: {
    normal: Platform.select({
      android: {
        flex: 1,
        color: INPUT_COLOR
      },
      ios: {}
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        flex: 1,
        color: ERROR_COLOR
      },
      ios: {}
    })
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    error: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    active: {
      borderWidth: BORDER_WIDTH,
      borderColor: BORDER_COLOR,
      backgroundColor: BACKGROUNDCOLOR
    }
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE
    },
    error: {
      fontSize: FONT_SIZE
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  dateTouchable: {
    normal: {},
    error: {}
  },
  dateValue: {
    normal: {
      height: 36,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      paddingLeft: 10,
      marginBottom: 5,
      borderWidth: BORDER_WIDTH,
      borderColor: BORDER_COLOR,
      borderRadius: 4,
      backgroundColor: BACKGROUNDCOLOR
    },
    error: {
      height: 36,
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5,
      borderWidth: BORDER_WIDTH,
      borderColor: ERROR_COLOR,
      borderRadius: 4,
      backgroundColor: BACKGROUNDCOLOR
    }
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: BORDER_WIDTH,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

export default stylesheet;