const primaryStyle1 = {
  background: 'linear-gradient(#DEFFF4, #10B981)'
}

const primaryStyle2 = {
  background: 'linear-gradient(#76DEFF, #00C2FF)'
}

const hoverStyle1 = {
  background: 'linear-gradient(#10B981, #DEFFF4)'
}

const hoverStyle2 = {
  background: 'linear-gradient(#00C2FF, #76DEFF)'
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
