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
    title: 'Is it Worth It?',
    href: 'https://www.youtube.com/watch?v=93LxMbYWk3s&list=UUfcnp8650oZXuvujfJAoHeQ',
    type: 'text/html',
    youtube: 'VIDEO_ID',
    poster: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
  },
  ]);

  blueimp.Gallery(
    document.getElementById('links2').getElementsByTagName('a'),
    {
      container: '#blueimp-gallery-carousel',
      carousel: true
    }
  );
