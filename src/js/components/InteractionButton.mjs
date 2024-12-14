export default function InteractionButton({
  btnType = 'button',
  condition,
  interactionType,
  priSVG,
  secSVG = '',
  altSVG,
  titles = ['Remove from', 'Add to'],
  classes = ['added']
}) {
  const btn = document.createElement('button');
  const title = condition ? `${titles[0]} ${interactionType}` : `${titles[1]} ${interactionType}`;
  const btnClasses = condition ? classes.join(' ') : '';
  const id =
    'btn' +
    interactionType.split('')[0].toUpperCase() +
    interactionType.split('').slice(1).join('');

  const firstSVG = condition ? altSVG : priSVG;

  btn.setAttribute('type', btnType);
  btn.setAttribute('title', title);
  btn.setAttribute('class', 'interaction ' + btnClasses + ' ' + id);

  btn.innerHTML = firstSVG + secSVG;

  return btn;
}
