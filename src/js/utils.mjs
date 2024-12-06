function getCYear(selector) {
  qs(selector).textContent = new Date().getFullYear();
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

export function setPageTitle(param) {
  const title = getParams(param);

  qs('title', document.head).textContent += ` ${title}`;
  qs('h2').textContent += ` ${title}`;
}

export async function convertToJSON(res) {
  try {
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err.message);
    throw new Error('Bad Response');
  }
}

export async function convertToText(res) {
  try {
    const text = res.text();
    return text;
  } catch (err) {
    console.error(err.message);
    throw new Error('Bad Response');
  }
}

export function genreIconName(genreName) {
  return genreName.toLowerCase().split(' ').join('-');
}

export function renderListWithTemplate(template, parent, list) {
  const templateList = list.map(template);

  templateList.forEach((element) => parent.appendChild(element));
}

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML('afterbegin', template);

  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const template = await fetch(path).then(convertToText);
  return template;
}

export async function loadHeaderFooter(hCb = () => {}, fCb = () => {}) {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const headerElement = qs('#header');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerElement = qs('#footer');

  renderWithTemplate(headerTemplate, headerElement, '', hCb);
  renderWithTemplate(footerTemplate, footerElement, '', fCb);

  getCYear('#c-year');
}
