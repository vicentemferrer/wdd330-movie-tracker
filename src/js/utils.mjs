export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
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
