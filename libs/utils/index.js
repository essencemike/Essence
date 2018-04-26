export function createPropType(validate) {
  function checkType(isRequired, props, propName, componentName = '<<anonymous>>') {
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(`Required ${propName} was not specified in ${componentName}.`);
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
