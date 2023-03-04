const primaryStyle1 = {
  background: 'linear-gradient(#DEFFF4, #10B981)'
}

const primaryStyle2 = {
  background: 'linear-gradient(#76DEFF, #00C2FF)'
}

const primaryStyle3 = {
  background: 'linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%)'
}

const primaryStyle4 = {
  background: 'linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%)'
}

const hoverStyle1 = {
  background: 'linear-gradient(#10B981, #DEFFF4)'
}

const hoverStyle2 = {
  background: 'linear-gradient(#00C2FF, #76DEFF)'
}

const hoverStyle3 = {
  background: 'linear-gradient(180deg, #9A3FF4 0%, #D5B5FF 122.97%)'
}

const hoverStyle4 = {
  background: 'linear-gradient(180deg, #E5E7EB 0%, #9CA3AF 122.97%)'
}

const disableStyle = {
  background: 'linear-gradient(#E5E7EB, #ACACAC)'
}

export const depositButtonStyle = {
  ...primaryStyle1,
  color: 'white',
  _hover: {
    ...hoverStyle1
  },
  _disabled: {
    ...disableStyle,
    _hover: {
      ...disableStyle
    }
  }
}

export const withdrawButtonStyle = {
  ...primaryStyle2,
  color: 'white',
  _hover: {
    ...hoverStyle2
  },
  _disabled: {
    ...disableStyle,
    _hover: {
      ...disableStyle
    }
  }
}

export const primaryButtonStyle = {
  ...primaryStyle3,
  color: 'white',
  _hover: {
    ...hoverStyle3
  },
  _disabled: {
    ...disableStyle,
    _hover: {
      ...disableStyle
    }
  }
}

export const secondaryButtonStyle = {
  ...primaryStyle4,
  color: 'white',
  _hover: {
    ...hoverStyle4
  },
  _disabled: {
    ...disableStyle,
    _hover: {
      ...disableStyle
    }
  }
}
