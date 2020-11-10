// Delay function 
const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

module.exports = {
  delay,
}