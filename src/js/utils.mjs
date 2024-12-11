export function getCYear(selector) {
  qs(selector).textContent = new Date().getFullYear();
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function simplifyMovie({ id, title, poster_path }) {
  return { id, title, poster_path };
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

export function setPageTitle(title) {
  qs('title', document.head).textContent = 'MovieTracker | ' + title.trim();
  qs('h2').textContent += title;
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

export function renderWithTemplate(template, parent, position = 'afterbegin', callback, data) {
  parent.insertAdjacentHTML(position, template);

  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const template = await fetch(path).then(convertToText);
  return template;
}

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
    img.src = url;
  });
}

export function checkVoidArr(arr) {
  return arr.length === 0;
}
