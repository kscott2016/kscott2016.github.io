document.getElementById('links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
};

blueimp.Gallery([
  {
    title: 'Fruits',
    href: 'https://example.org/videos/fruits.mp4',
    type: 'video/mp4',
    poster: 'https://example.org/images/fruits.jpg'
  },
  {
    title: 'Banana',
    href: 'https://example.org/images/banana.jpg',
    type: 'image/jpeg',
    thumbnail: 'https://example.org/thumbnails/banana.jpg'
  }
  ]);
