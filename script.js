import data from './data.json' assert { type: "json" };

const arrToTree = (arr) => {
  return [...arr].reduce((a, b) => {
    b.children = arr.filter(item => item.head === b.id);
    a.push(b);
    return a;
  }, [])
    .filter(item => item.head === null);
}

const createTreeDOM = (data, sortFn) => {
  if (data.length === 0) return;

  const ul = document.createElement('ul');

  const sorted = [...data].sort((a, b) => sortFn(a.sorthead, b.sorthead));

  for (let i = 0; i < sorted.length; i++) {
    const li = document.createElement('li');
    li.textContent = sorted[i].name + ` (price: ${sorted[i].price})`;

    const { children } = sorted[i];

    if (children.length > 0) {
      li.append(createTreeDOM(children, sortFn));
    }

    ul.append(li);
  }

  return ul;
}

const sortByNumber = (a, b) => {
  return a - b;
}

const tree = arrToTree(data.services);
const treeDOM = createTreeDOM(tree, sortByNumber);
const container = document.querySelector('.container');

container.append(treeDOM);
