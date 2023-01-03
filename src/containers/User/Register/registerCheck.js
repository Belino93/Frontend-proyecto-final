export const registerValidator = (eventTargetName, eventTargetValue, password) => {
  switch (eventTargetName) {
    case 'name':
      if (!eventTargetValue.match(/^[A-Z]+$/i)) {
        return "Invalid name";
      }
      break;
    case 'surname':
      if (!eventTargetValue.match(/^[A-Z]+$/i)) {
        return "Invalid surname";
      }
      break;
    case 'email':
      if (
        !eventTargetValue.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        return "Invalid email";
      }
      break;
    case 'password':
      if (eventTargetValue.length < 8) {
        return "Password must be at least 8 characters long";
      }
      // Validate it has one lower case letter
      if (!eventTargetValue.match(/[a-z]/)) {
        return "Password must have at least one lower case letter";
      }
      // Validate ir has one upper case letter
      if (!eventTargetValue.match(/[A-Z]/)) {
        return "Password must have at least one upper case letter";
      }
      // Validate it has one number
      if (!eventTargetValue.match(/[0-9]/)) {
        return "Password must have at least one number";
      }
      break;
    case 'password2':
      if (eventTargetValue !== password) {
        return "Fields dont match";
      }
      break;

    default:
      break;
  }
};
