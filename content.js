// content.js

chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  var bookmarks = flattenBookmarkTree(bookmarkTreeNodes);

  bookmarks.forEach(function (bookmark) {
    var card = createCard(bookmark);
    document.body.appendChild(card);
  });
});


function flattenBookmarkTree(bookmarkTreeNodes) {
  var bookmarks = [];

  function traverseNodes(nodes) {
    nodes.forEach(function (node) {
      if (node.url) {
        bookmarks.push(node);
      } else if (node.children) {
        traverseNodes(node.children);
      }
    });
  }

  traverseNodes(bookmarkTreeNodes);
  return bookmarks;
}

function createCard(bookmark) {
  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = "<a style='text-decoration:none; color:blue' href='" + bookmark.url + "'>" + bookmark.title + '</a>';
  return card;
}
