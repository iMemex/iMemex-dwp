import getURLParameter from '../helperFunctions/urlParameter';

function menuAnimation(inputId) {
  // reset upload page, receive etc.
  document.getElementById('show-menu').checked = false;
  const ids = ['receivePage', 'filePage', 'index'];
  for (let i = 0; i < ids.length; i += 1) {
    if (ids[i] === inputId) {
      document.getElementById(ids[i]).style.transition = 'visibility 0.2s,transform 0.2s, opacity 0.2s cubic-bezier(0.0, 0.0, 0.2, 1)';
      document.getElementById(ids[i]).style.visibility = 'visible';
      document.getElementById(ids[i]).style.height = '100%';
      document.getElementById(ids[i]).style.width = '100%';
      document.getElementById(ids[i]).style.transform = 'scale(1)';
      document.getElementById(ids[i]).style.opacity = '1';
    } else {
      document.getElementById(ids[i]).style.transition = 'none';
      document.getElementById(ids[i]).style.visibility = 'hidden';
      document.getElementById(ids[i]).style.height = '0%';
      document.getElementById(ids[i]).style.width = '0%';
      document.getElementById(ids[i]).style.transform = 'scale(0.9)';
      document.getElementById(ids[i]).style.opacity = '0%';
    }
  }
}

function showCookieAlert() {
  if (document.getElementById('dialog-ovelay') !== null) {
    document.getElementById('dialog-ovelay').style.display = 'block';
  }
}

function isIE() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE '); // IE 10 or older
  const trident = ua.indexOf('Trident/'); // IE 11
  return (msie > 0 || trident > 0);
}

function searchMenu(inputId) {
  const ids = ['all', 'images', 'videos', 'music'];
  for (let i = 0; i < ids.length; i += 1) {
    if (ids[i] === inputId) {
      // global object used in the search.js
      window.searchKind = ids[i];
      const event = document.createEvent('Event');
      event.initEvent('input', true, true);
      document.getElementById('firstField').dispatchEvent(event);
      if (!isIE()) {
        window.setTimeout(() => {
          document.getElementById('firstField').focus();
        }, 100);
      }
      document.getElementById(ids[i]).style.textDecoration = 'underline';
    } else {
      document.getElementById(ids[i]).style.textDecoration = 'none';
    }
  }
}

function indexInit() {
  document.getElementById('nextAtEnd').style.display = 'none';
  document.getElementById('fileLink').textContent = 'File Link > ';
  document.getElementById('passwordDiv').style.display = 'block';
  document.getElementById('passwordStep').textContent = 'Password > ';
  document.getElementById('passwordStep').style.display = 'inline-block';
  document.getElementById('fileLinkHeadline').textContent = 'Step 1: Share File Link';
  document.getElementById('secondStepHeadline').textContent = 'Step 2: Share Password';
  document.getElementById('doneHeadline').textContent = 'Step 3: Done';
  document.getElementById('fileAvailable').innerHTML = 'Your file is available for 3 days.<br> You can find your sharing history <a onclick="openHistory()" style="color: #6d91c7;cursor: pointer;">here</a>.';
  document.getElementById('file-upload-form').style.display = 'block';
  document.getElementById('headline').style.display = 'block';
  document.getElementById('afterUpload').style.display = 'none';
  document.getElementById('start').style.display = 'block';
  document.getElementById('response').style.display = 'none';
  document.getElementById('file-image').style.display = 'none';
  document.getElementById('file-upload').value = '';
  document.getElementById('stepsDiv').style.display = 'block';
  document.getElementById('fileTab').classList.add('tabSteps');
  document.getElementById('fileTab').style.display = 'block';
  document.getElementById('passwordTab').classList.add('tabSteps');
  document.getElementById('passwordStep').classList.add('step');
  document.getElementById('lastTab').style.display = 'none';
  document.getElementById('newUpload').style.display = 'none';
  document.getElementById('askForTags').style.display = 'none';
}

function searchInit() {
  searchMenu('all');
  document.getElementById('searchBox').style.display = 'block';
  document.getElementById('receiveTextBox').style.display = 'none';
  document.getElementById('messagesSearch').textContent = '';
  document.getElementById('markUnavailable').style.display = 'none';
  document.getElementById('messagesReceivePage').textContent = '';
  document.getElementById('loadProgressSearch').style.display = 'none';
  document.getElementById('firstField').value = '';
  window.history.replaceState(null, null, window.location.pathname);
}


function linkInit() {
  document
    .getElementById('passwordField')
    .addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('load').click();
      }
    });
  document.getElementById('searchBox').style.display = 'none';
  document.getElementById('receiveTextBox').style.display = 'block';
  document.getElementById('loadProgressReceive').style.display = 'none';
}

function aboutInit() {
  document.getElementById('defaultOpen').click();
}

function currentPage(inputId) {
  const ids = ['toIndex', 'toReceive', 'toFile'];
  for (let i = 0; i < ids.length; i += 1) {
    if (ids[i] === inputId) {
      document.getElementById(ids[i]).classList.add('currentPage');
      if (ids[i] === 'toReceive') {
        searchInit();
      } else if (ids[i] === 'toIndex') {
        indexInit();
      }
    } else {
      document.getElementById(ids[i]).classList.remove('currentPage');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  indexInit();
  const urlParameter = getURLParameter('par');
  const fileIdPar = getURLParameter('id');
  const passwordPar = getURLParameter('password');
  const namePar = getURLParameter('name');
  if (typeof fileIdPar !== 'undefined') {
    menuAnimation('receivePage');
    currentPage('');
    linkInit();
    document.getElementById('firstField').value = fileIdPar;
    if (typeof namePar !== 'undefined') {
      const [, fileNamePart, fileTypePart] = namePar.match(/(.*)\.(.*)/);
      window.searchSelection = { fileName: fileNamePart, fileType: fileTypePart };
    }
    if (typeof passwordPar !== 'undefined') {
      document.getElementById('passwordField').value = passwordPar;
      document.getElementById('passwordField').style.display = 'none';
    } else {
      document.getElementById('passwordField').style.display = 'block';
      if (!isIE()) { document.getElementById('passwordField').focus(); }
    }
  } else {
    document.getElementById('toIndex').classList.add('currentPage');
  }
});

window.openHistory = function openHistory() {
  menuAnimation('filePage');
  currentPage('toFile');
};

document.getElementById('toIndex').addEventListener('click', () => {
  window.history.replaceState(null, null, window.location.pathname);
  showCookieAlert();
  menuAnimation('index');
  currentPage('toIndex');
});

document.getElementById('newUpload').addEventListener('click', () => {
  menuAnimation('index');
  currentPage('toIndex');
});

document.getElementById('toReceive').addEventListener('click', () => {
  window.history.replaceState(null, null, window.location.pathname);
  showCookieAlert();
  menuAnimation('receivePage');
  currentPage('toReceive');
});
document.getElementById('toFile').addEventListener('click', () => {
  window.history.replaceState(null, null, window.location.pathname);
  showCookieAlert();
  window.openHistory();
});

document.getElementById('all').addEventListener('click', () => {
  searchMenu('all');
});

document.getElementById('images').addEventListener('click', () => {
  searchMenu('images');
});

document.getElementById('videos').addEventListener('click', () => {
  searchMenu('videos');
});

document.getElementById('music').addEventListener('click', () => {
  searchMenu('music');
});
