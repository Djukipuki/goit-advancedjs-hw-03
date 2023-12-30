const show = (element) => {
  element.classList.remove('visually-hidden');
}

const hide = (element) => {
  element.classList.add('visually-hidden');
}

export default {
  show,
  hide,
};
